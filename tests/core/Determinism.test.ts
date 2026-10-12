import { describe, it, expect } from 'vitest';
import { SeededRandom } from '../../src/utils/SeededRandom';

describe('Living World Lab Determinism Verification', () => {
  it('generates identical sequence over 1000 simulation ticks with identical seed', () => {
    const seed = 1337;
    const run1 = new SeededRandom(seed);
    const run2 = new SeededRandom(seed);

    // Simulate 1000 ticks of random events (food placement, mutation drift, movement variance)
    const trace1: number[] = [];
    const trace2: number[] = [];

    for (let tick = 0; tick < 1000; tick++) {
      // 1. Food placement coordinate
      const foodX = run1.nextFloat(-1000, 1000);
      const foodY = run1.nextFloat(-750, 750);
      // 2. Mutation jitter
      const mutation = run1.nextFloat(-0.05, 0.05);
      trace1.push(foodX, foodY, mutation);
    }

    for (let tick = 0; tick < 1000; tick++) {
      const foodX = run2.nextFloat(-1000, 1000);
      const foodY = run2.nextFloat(-750, 750);
      const mutation = run2.nextFloat(-0.05, 0.05);
      trace2.push(foodX, foodY, mutation);
    }

    expect(trace1).toEqual(trace2);
    expect(trace1.length).toBe(3000);
  });

  it('deviates immediately when different seeds are supplied', () => {
    const runA = new SeededRandom(1337);
    const runB = new SeededRandom(1338);

    const valA = runA.next();
    const valB = runB.next();

    expect(valA).not.toBe(valB);
  });
});
