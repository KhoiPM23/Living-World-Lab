/**
 * Seeded PRNG using Mulberry32 algorithm
 * Provides deterministic pseudo-random numbers across runs.
 */
export class SeededRandom {
  private seed: number;
  private state: number;

  constructor(seed: number | string = Date.now()) {
    this.seed = typeof seed === 'string' ? SeededRandom.hashString(seed) : seed;
    this.state = this.seed >>> 0;
  }

  /**
   * Hashes a string into a 32-bit unsigned integer
   */
  public static hashString(str: string): number {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 16777619) >>> 0;
    }
    return h;
  }

  /**
   * Generates a pseudo-random floating point number in [0, 1)
   */
  public next(): number {
    let t = (this.state += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  /**
   * Generates a random integer in [min, max]
   */
  public nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  /**
   * Generates a random float in [min, max)
   */
  public nextFloat(min: number, max: number): number {
    return min + this.next() * (max - min);
  }

  /**
   * Generates a random boolean with given probability of true (default 0.5)
   */
  public nextBool(probability = 0.5): boolean {
    return this.next() < probability;
  }

  /**
   * Reset PRNG to original seed or a new seed
   */
  public reset(newSeed?: number | string): void {
    if (newSeed !== undefined) {
      this.seed = typeof newSeed === 'string' ? SeededRandom.hashString(newSeed) : newSeed;
    }
    this.state = this.seed >>> 0;
  }

  /**
   * Get the current base seed
   */
  public getSeed(): number {
    return this.seed;
  }
}

// Global default seeded instance
export const defaultPRNG = new SeededRandom(1337);
