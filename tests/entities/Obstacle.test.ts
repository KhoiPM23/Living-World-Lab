import { describe, it, expect } from 'vitest';
import { Obstacle } from '../../src/entities/Obstacle';
import { createMockGraphics } from '../testUtils';

describe('Obstacle Collision & Physics', () => {
  it('creates obstacle with correct position and radius', () => {
    const obs = new Obstacle('rock-1', 100, 200, 40, createMockGraphics());
    expect(obs.id).toBe('rock-1');
    expect(obs.position.x).toBe(100);
    expect(obs.position.y).toBe(200);
    expect(obs.radius).toBe(40);
  });

  it('detects collision when an entity overlaps the obstacle radius', () => {
    const obs = new Obstacle('rock-1', 0, 0, 50, createMockGraphics());
    // Point at (40, 0) with body radius 20 -> dist=40, minDist=70 -> overlap=30
    const res = obs.checkCollision({ x: 40, y: 0 }, 20);

    expect(res.collided).toBe(true);
    expect(res.overlap).toBeCloseTo(30, 2);
    expect(res.normal.x).toBeCloseTo(1, 2);
    expect(res.normal.y).toBeCloseTo(0, 2);
  });

  it('reports no collision when entity is outside radius', () => {
    const obs = new Obstacle('rock-1', 0, 0, 50, createMockGraphics());
    // Point at (100, 0) with radius 20 -> dist=100 > minDist=70
    const res = obs.checkCollision({ x: 100, y: 0 }, 20);

    expect(res.collided).toBe(false);
    expect(res.overlap).toBe(0);
  });

  it('disposes cleanly without errors', () => {
    const mock = createMockGraphics();
    const obs = new Obstacle('rock-1', 0, 0, 30, mock);
    expect(() => obs.dispose()).not.toThrow();
  });
});
