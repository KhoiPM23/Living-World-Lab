import { describe, it, expect } from 'vitest';
import { PRESET_SCENARIOS } from '../../src/scenarios/PresetScenarios';

describe('PresetScenarios Configuration', () => {
  it('contains at least 2 distinct scenarios', () => {
    expect(PRESET_SCENARIOS.length).toBeGreaterThanOrEqual(2);
  });

  it('each scenario has a unique id, name, seed, and population values', () => {
    const ids = new Set<string>();
    PRESET_SCENARIOS.forEach(sc => {
      expect(sc.id).toBeTruthy();
      expect(ids.has(sc.id)).toBe(false);
      ids.add(sc.id);

      expect(sc.seed).toBeTypeOf('number');
      expect(sc.glucoseCount).toBeGreaterThan(0);
      expect(sc.obstaclesCount).toBeGreaterThanOrEqual(0);
      expect(sc.species.herbivores).toBeGreaterThan(0);
      expect(sc.species.carnivores).toBeGreaterThan(0);
      expect(sc.species.omnivores).toBeGreaterThan(0);
    });
  });

  it('scenarios have distinct environmental pressure', () => {
    const thriving = PRESET_SCENARIOS.find(s => s.id === 'thriving_garden');
    const scarcity = PRESET_SCENARIOS.find(s => s.id === 'scarcity_crisis');

    expect(thriving).toBeDefined();
    expect(scarcity).toBeDefined();
    // Scarcity has significantly less food and higher ATP drain
    expect(scarcity!.glucoseCount).toBeLessThan(thriving!.glucoseCount);
    expect(scarcity!.atpDrainMultiplier).toBeGreaterThan(thriving!.atpDrainMultiplier);
  });
});
