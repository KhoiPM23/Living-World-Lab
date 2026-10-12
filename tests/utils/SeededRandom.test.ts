import { describe, it, expect } from 'vitest';
import { SeededRandom } from '../../src/utils/SeededRandom';

describe('SeededRandom (Determinism & Bounds)', () => {
  it('generates identical sequence from identical numeric seed', () => {
    const rng1 = new SeededRandom(42);
    const rng2 = new SeededRandom(42);

    const seq1 = Array.from({ length: 50 }, () => rng1.next());
    const seq2 = Array.from({ length: 50 }, () => rng2.next());

    expect(seq1).toEqual(seq2);
  });

  it('generates identical sequence from identical string seed', () => {
    const rng1 = new SeededRandom('living-world-lab-seed');
    const rng2 = new SeededRandom('living-world-lab-seed');

    const seq1 = Array.from({ length: 20 }, () => rng1.nextFloat(-10, 10));
    const seq2 = Array.from({ length: 20 }, () => rng2.nextFloat(-10, 10));

    expect(seq1).toEqual(seq2);
  });

  it('generates different sequence from different seeds', () => {
    const rng1 = new SeededRandom(100);
    const rng2 = new SeededRandom(200);

    const val1 = rng1.next();
    const val2 = rng2.next();

    expect(val1).not.toBe(val2);
  });

  it('respects nextInt bounds [min, max]', () => {
    const rng = new SeededRandom(999);
    for (let i = 0; i < 100; i++) {
      const val = rng.nextInt(5, 15);
      expect(val).toBeGreaterThanOrEqual(5);
      expect(val).toBeLessThanOrEqual(15);
      expect(Number.isInteger(val)).toBe(true);
    }
  });

  it('resets correctly to original state', () => {
    const rng = new SeededRandom(12345);
    const firstFive = Array.from({ length: 5 }, () => rng.next());

    rng.reset();
    const afterReset = Array.from({ length: 5 }, () => rng.next());

    expect(firstFive).toEqual(afterReset);
  });
});
