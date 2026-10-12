export interface ScenarioConfig {
  id: string;
  name: string;
  tagline: string;
  description: string;
  seed: number;
  species: {
    herbivores: number;
    carnivores: number;
    omnivores: number;
  };
  glucoseCount: number;
  obstaclesCount: number;
  glucoseRespawnTime: number;
  atpDrainMultiplier: number;
}

export const PRESET_SCENARIOS: ScenarioConfig[] = [
  {
    id: 'thriving_garden',
    name: 'Thriving Garden',
    tagline: 'Balanced & Abundant Resources',
    description: 'An idyllic, nutrient-rich lake with abundant glucose and gentle competition. Ideal for observing stable multi-species coexistence.',
    seed: 1337,
    species: {
      herbivores: 18,
      carnivores: 6,
      omnivores: 8,
    },
    glucoseCount: 220,
    obstaclesCount: 4,
    glucoseRespawnTime: 5,
    atpDrainMultiplier: 1.0,
  },
  {
    id: 'scarcity_crisis',
    name: 'Resource Scarcity Crisis',
    tagline: 'Harsh Drought & Severe Competition',
    description: 'A nutrient-depleted, unforgiving wasteland. Food is extremely rare with slow replenishment and elevated metabolic costs. Only the fittest traits survive.',
    seed: 2026,
    species: {
      herbivores: 8,
      carnivores: 4,
      omnivores: 3,
    },
    glucoseCount: 35,
    obstaclesCount: 8,
    glucoseRespawnTime: 12,
    atpDrainMultiplier: 1.4,
  },
  {
    id: 'predator_outbreak',
    name: 'Apex Predator Outbreak',
    tagline: 'High Predator Density',
    description: 'A dense population of aggressive pack-hunting carnivores exerts extreme selective pressure on herbivores, creating rapid population oscillations.',
    seed: 9999,
    species: {
      herbivores: 14,
      carnivores: 16,
      omnivores: 4,
    },
    glucoseCount: 140,
    obstaclesCount: 6,
    glucoseRespawnTime: 6,
    atpDrainMultiplier: 1.1,
  },
];
