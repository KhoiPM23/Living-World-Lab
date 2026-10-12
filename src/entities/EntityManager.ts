// Entity manager for handling all game entities

import { Cell } from './Cell';
import { Resource } from './Resource';
import { Obstacle } from './Obstacle';
import { BehaviorType } from '../ai/AIBehavior';
import { PixiApp } from '../rendering/PixiApp';
import { BiomeGenerator } from '../environment/BiomeGenerator';
import { Config } from '../core/Config';
import { Genome } from '../genetics/Genome';
import { ReproductionSystem } from '../genetics/ReproductionSystem';
import { TraitSystem } from '../genetics/TraitSystem';
import { PopulationManager, type AISpeciesSetup } from '../ai/PopulationManager';
import { CombatSystem } from './CombatSystem';
import { PlayerSpeciesManager } from '../core/PlayerSpeciesManager';
import { SoundManager } from '../audio/SoundManager';
import type { Traits } from '../types/entities';
import { logger } from '../utils/Logger';

export class EntityManager {
  private cells: Map<string, Cell> = new Map();
  private resources: Map<string, Resource> = new Map();
  private obstacles: Map<string, Obstacle> = new Map();
  private renderer: PixiApp;
  private biomeGenerator: BiomeGenerator;
  private soundManager: SoundManager | null = null;
  public playerCell: Cell | null = null; // Keep for backward compatibility, but deprecated
  public playerSpecies: PlayerSpeciesManager | null = null;
  public glucoseCollected = 0;
  public reproductionSystem: ReproductionSystem;
  public populationManager: PopulationManager;
  public combatSystem: CombatSystem;

  // Combo system for dopamine boost!
  private recentCollections: number[] = []; // Timestamps of recent resource collections
  private comboCount: number = 0;
  private readonly COMBO_TIME_WINDOW = 5; // seconds
  private readonly COMBO_THRESHOLD = 3; // 3+ collections for a combo
  private readonly COMBO_DNA_MULTIPLIER = 2; // 2x DNA bonus for combos

  constructor(renderer: PixiApp, biomeGenerator: BiomeGenerator, aiSpeciesSetup?: AISpeciesSetup[]) {
    this.renderer = renderer;
    this.reproductionSystem = new ReproductionSystem();
    this.populationManager = new PopulationManager(renderer, Config.LAKE_WIDTH, Config.LAKE_HEIGHT);
    this.combatSystem = new CombatSystem();
    this.biomeGenerator = biomeGenerator;

    // Connect particle system to combat system
    this.combatSystem.setParticleSystem(renderer.particleSystem);

    // Initialize AI species
    if (aiSpeciesSetup && aiSpeciesSetup.length > 0) {
      this.populationManager.initializeCustomSpecies(aiSpeciesSetup);
    } else {
      this.populationManager.initializeDefaultSpecies();
    }
  }

  setSoundManager(soundManager: SoundManager): void {
    this.soundManager = soundManager;
  }

  // Create player species from genome
  createPlayerSpecies(genome?: Genome): PlayerSpeciesManager {
    const playerGenome = genome || Genome.createDefault();
    this.playerSpecies = new PlayerSpeciesManager(this.renderer, this.biomeGenerator, playerGenome);
    this.playerSpecies.initialize();
    return this.playerSpecies;
  }

  // Create player cell from genome (deprecated - kept for compatibility)
  createPlayerCell(genome?: Genome): Cell {
    const playerGenome = genome || Genome.createDefault();

    const sprite = this.renderer.createCircle(
      Config.PLAYER_START_X,
      Config.PLAYER_START_Y,
      Config.PLAYER_RADIUS,
      playerGenome.traits.color
    );

    this.renderer.addToWorld(sprite);

    const cell = new Cell(
      'player',
      Config.PLAYER_START_X,
      Config.PLAYER_START_Y,
      playerGenome,
      sprite,
      true
    );

    this.cells.set(cell.id, cell);
    this.playerCell = cell;

    return cell;
  }

  // Spawn resources (glucose) - Week 3: with golden resource chance
  spawnResources(): void {
    const halfWidth = Config.LAKE_WIDTH / 2;
    const halfHeight = Config.LAKE_HEIGHT / 2;

    for (let i = 0; i < Config.GLUCOSE_COUNT; i++) {
      const x = Math.random() * Config.LAKE_WIDTH - halfWidth;
      const y = Math.random() * Config.LAKE_HEIGHT - halfHeight;

      // Week 3: 2% chance for golden resource (10x value)
      const isGolden = Math.random() < Config.GOLDEN_RESOURCE_CHANCE;
      const rarity = isGolden ? 'golden' : 'common';
      const color = isGolden ? 0xffd700 : Config.GLUCOSE_COLOR; // Gold color for golden resources

      const sprite = this.renderer.createCircle(x, y, Config.GLUCOSE_RADIUS, color);
      this.renderer.addToWorld(sprite);

      const resource = new Resource(`glucose-${i}`, x, y, 'glucose', sprite, rarity);
      this.resources.set(resource.id, resource);
    }
  }

  // Update all entities
  update(deltaTime: number, autoMode: boolean = false): void {
    // Update player species (new species-level gameplay)
    if (this.playerSpecies) {
      const allCells = this.getAllCells();
      const allResources = Array.from(this.resources.values());
      this.playerSpecies.update(deltaTime, allCells, allResources, autoMode);
    }

    // Update legacy player cell (for backward compatibility)
    if (this.playerCell) {
      this.playerCell.update(deltaTime);
      this.checkResourceCollection(this.playerCell);
    }

    // Update AI population
    const allCells = this.getAllCells();
    const allResources = Array.from(this.resources.values());
    this.populationManager.update(deltaTime, allCells, allResources);

    // Update AI cell physics
    const aiCells = this.populationManager.getAllCells();
    aiCells.forEach(cell => {
      cell.update(deltaTime);
    });

    // Check combat between all cells
    this.combatSystem.checkCombat(allCells);

    // Update resources
    this.resources.forEach(resource => {
      resource.update(deltaTime, Config.GLUCOSE_RESPAWN_TIME);
    });

    // Check obstacle collisions for all cells
    if (this.obstacles.size > 0) {
      allCells.forEach(cell => {
        const cellRadius = 10 + (cell.traits?.size || 5);
        this.obstacles.forEach(obstacle => {
          const col = obstacle.checkCollision(cell.position, cellRadius);
          if (col.collided) {
            cell.position.x += col.normal.x * col.overlap;
            cell.position.y += col.normal.y * col.overlap;
            const dot = cell.velocity.x * col.normal.x + cell.velocity.y * col.normal.y;
            if (dot < 0) {
              cell.velocity.x -= 1.5 * dot * col.normal.x;
              cell.velocity.y -= 1.5 * dot * col.normal.y;
            }
          }
        });
      });
    }
  }

  // Check combo status and award bonuses (dopamine boost!)
  private checkCombo(currentTime: number, player: Cell): { isCombo: boolean; comboSize: number } {
    // Remove old collections outside the time window
    this.recentCollections = this.recentCollections.filter(
      time => (currentTime - time) <= this.COMBO_TIME_WINDOW
    );

    // Add current collection
    this.recentCollections.push(currentTime);

    const comboSize = this.recentCollections.length;
    const isCombo = comboSize >= this.COMBO_THRESHOLD;

    if (isCombo) {
      // Award combo bonus DNA points!
      const baseDNA = Config.DNA_FROM_GLUCOSE;
      const bonusDNA = baseDNA * (this.COMBO_DNA_MULTIPLIER - 1); // Extra DNA from combo
      player.genome.dnaPoints += bonusDNA;

      // Visual feedback
      this.renderer.particleSystem.createComboEffect(
        player.position.x,
        player.position.y,
        comboSize
      );

      this.comboCount++;
    }

    return { isCombo, comboSize };
  }

  // Check if player is close enough to collect resources
  private checkResourceCollection(player: Cell): void {
    const currentTime = Date.now() / 1000; // Convert to seconds

    this.resources.forEach(resource => {
      if (!resource.isCollected) {
        const distance = player.distanceTo(resource.position);

        if (distance < Config.RESOURCE_COLLECTION_RANGE) {
          // Create eating particle effect
          this.renderer.particleSystem.createEatingEffect(
            resource.position.x,
            resource.position.y,
            Config.GLUCOSE_COLOR
          );

          // Collect resource
          resource.collect();

          if (resource.type === 'glucose') {
            player.restoreATP(Config.ATP_FROM_GLUCOSE);
            player.collectCompound('glucose', 5);
            this.glucoseCollected++;

            // Check for combo bonus!
            const combo = this.checkCombo(currentTime, player);
            if (combo.isCombo) {
              // Play combo sound!
              this.soundManager?.playCombo(combo.comboSize);
              if (Config.DEBUG_GAME_LOOP) {
                logger.log(`🔥 COMBO x${combo.comboSize}! Bonus DNA awarded!`);
              }
            } else {
              // Play regular collection sound
              this.soundManager?.play('collect');
            }
          } else if (resource.type === 'aminoAcid') {
            player.collectCompound('aminoAcid', 3);
            this.soundManager?.play('collect');
          } else if (resource.type === 'phosphate') {
            player.collectCompound('phosphate', 2);
            this.soundManager?.play('collect');
          }
        }
      }
    });
  }

  // Handle player reproduction
  reproducePlayer(modifications: Partial<Traits> = {}): Cell | null {
    if (!this.playerCell) return null;

    // Calculate DNA points earned
    const dnaPoints = TraitSystem.calculateDNAPoints(
      this.playerCell.survivalTime,
      this.glucoseCollected
    );
    this.playerCell.genome.dnaPoints += dnaPoints;

    // Perform reproduction
    const offspringGenome = this.reproductionSystem.reproduce(
      this.playerCell.genome,
      modifications
    );

    // Remove old player cell
    this.renderer.removeFromWorld(this.playerCell.sprite);
    this.cells.delete('player');

    // Create new player cell with offspring genome
    const newCell = this.createPlayerCell(offspringGenome);

    // Mark reproduction
    newCell.markReproduction();

    // Reset glucose counter
    this.glucoseCollected = 0;

    return newCell;
  }

  // Get all cells (player species + AI)
  getAllCells(): Cell[] {
    const playerCells = Array.from(this.cells.values());
    const playerSpeciesCells = this.playerSpecies ? this.playerSpecies.getAllCells() : [];
    const aiCells = this.populationManager.getAllCells();
    return [...playerCells, ...playerSpeciesCells, ...aiCells];
  }

  // Get all cells
  getCells(): Cell[] {
    return Array.from(this.cells.values());
  }

  // Get all resources
  getResources(): Resource[] {
    return Array.from(this.resources.values());
  }

  // Get population stats
  getPopulationStats(): { [key: string]: number } {
    const stats = this.populationManager.getStats();
    if (this.playerSpecies) {
      stats['Your Species'] = this.playerSpecies.getStats().population;
    } else {
      stats['Player'] = this.playerCell ? 1 : 0;
    }
    return stats;
  }

  // Obstacle management
  addObstacle(x: number, y: number, radius = 35): Obstacle {
    const id = `obstacle-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    // Create rock sprite (dark grey with slight border)
    const sprite = this.renderer.createCircle(x, y, radius, 0x4a4d52);
    this.renderer.addToWorld(sprite);

    const obstacle = new Obstacle(id, x, y, radius, sprite);
    this.obstacles.set(id, obstacle);
    return obstacle;
  }

  removeObstacle(id: string): boolean {
    const obs = this.obstacles.get(id);
    if (obs) {
      this.renderer.removeFromWorld(obs.sprite);
      obs.dispose();
      this.obstacles.delete(id);
      return true;
    }
    return false;
  }

  clearObstacles(): void {
    this.obstacles.forEach(obs => {
      this.renderer.removeFromWorld(obs.sprite);
      obs.dispose();
    });
    this.obstacles.clear();
  }

  getObstacles(): Obstacle[] {
    return Array.from(this.obstacles.values());
  }

  // God Mode: spawn creature of specific diet type at given coordinates
  spawnCreature(type: 'herbivore' | 'carnivore' | 'omnivore', x: number, y: number): Cell | null {
    let behaviorType: BehaviorType;
    switch (type) {
      case 'carnivore':
        behaviorType = BehaviorType.CARNIVORE;
        break;
      case 'omnivore':
        behaviorType = BehaviorType.OMNIVORE;
        break;
      default:
        behaviorType = BehaviorType.HERBIVORE;
        break;
    }
    return this.populationManager.spawnSpeciesCell(behaviorType, x, y);
  }

  // God Mode: spawn a resource at given coordinates
  spawnResource(x: number, y: number, type: 'glucose' | 'aminoAcid' | 'phosphate' = 'glucose'): Resource {
    const id = `${type}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    let color: number = Config.GLUCOSE_COLOR;
    if (type === 'aminoAcid') color = 0x4fc3f7;
    if (type === 'phosphate') color = 0xab47bc;

    const sprite = this.renderer.createCircle(x, y, Config.GLUCOSE_RADIUS, color);
    this.renderer.addToWorld(sprite);

    const resource = new Resource(id, x, y, type, sprite, 'common');
    this.resources.set(id, resource);
    return resource;
  }

  // God Mode: remove entity (cell, resource, or obstacle) closest to clicked coordinates
  removeEntityAt(worldX: number, worldY: number, tolerance = 35): { removed: boolean; type?: string; id?: string } {
    // 1. Check obstacles
    for (const [id, obs] of this.obstacles.entries()) {
      const dx = obs.position.x - worldX;
      const dy = obs.position.y - worldY;
      if (dx * dx + dy * dy <= (obs.radius + tolerance) * (obs.radius + tolerance)) {
        this.removeObstacle(id);
        return { removed: true, type: 'obstacle', id };
      }
    }

    // 2. Check cells
    const allCells = this.getAllCells();
    for (const cell of allCells) {
      const dx = cell.position.x - worldX;
      const dy = cell.position.y - worldY;
      const r = 10 + (cell.traits?.size || 5) + tolerance;
      if (dx * dx + dy * dy <= r * r) {
        this.populationManager.removeCell(cell.id);
        return { removed: true, type: 'cell', id: cell.id };
      }
    }

    // 3. Check resources
    for (const [id, res] of this.resources.entries()) {
      const dx = res.position.x - worldX;
      const dy = res.position.y - worldY;
      if (dx * dx + dy * dy <= (Config.GLUCOSE_RADIUS + tolerance) * (Config.GLUCOSE_RADIUS + tolerance)) {
        this.renderer.removeFromWorld(res.sprite);
        res.dispose();
        this.resources.delete(id);
        return { removed: true, type: 'resource', id };
      }
    }

    return { removed: false };
  }

  // Player Mode / Inspector: find nearest cell to coordinates
  findNearestCell(x: number, y: number, maxDistance = 60): Cell | null {
    let nearest: Cell | null = null;
    let minDistSq = maxDistance * maxDistance;

    const allCells = this.getAllCells();
    for (const cell of allCells) {
      const dx = cell.position.x - x;
      const dy = cell.position.y - y;
      const distSq = dx * dx + dy * dy;
      if (distSq < minDistSq) {
        minDistSq = distSq;
        nearest = cell;
      }
    }
    return nearest;
  }

  // Player Mode: feed / boost cell energy
  feedCell(cellId: string, atpAmount = 50): boolean {
    const cell = this.getCellById(cellId);
    if (cell) {
      cell.restoreATP(atpAmount);
      // Spawn eating/energize particle effect
      this.renderer.particleSystem.createEatingEffect(cell.position.x, cell.position.y, 0x00ff88);
      return true;
    }
    return false;
  }

  // Find cell by ID
  getCellById(id: string): Cell | null {
    const allCells = this.getAllCells();
    return allCells.find(c => c.id === id) || null;
  }

  dispose(): void {
    this.cells.forEach(cell => cell.dispose());
    this.resources.forEach(resource => resource.dispose());
    this.obstacles.forEach(obs => obs.dispose());
    this.obstacles.clear();
    this.playerSpecies?.dispose();
    this.populationManager.dispose();
    this.cells.clear();
    this.resources.clear();
  }
}
