import { Graphics } from 'pixi.js';
import type { Vector2D } from '../types/entities';

/**
 * Obstacle entity representing static environmental barriers (e.g. rocks) in the lake
 */
export class Obstacle {
  public id: string;
  public position: Vector2D;
  public radius: number;
  public sprite: Graphics;

  constructor(id: string, x: number, y: number, radius = 35, sprite: Graphics) {
    this.id = id;
    this.position = { x, y };
    this.radius = radius;
    this.sprite = sprite;

    this.sprite.x = x;
    this.sprite.y = y;
  }

  /**
   * Checks collision with a circular entity at given position and radius
   */
  public checkCollision(
    point: Vector2D,
    bodyRadius: number
  ): { collided: boolean; normal: Vector2D; overlap: number } {
    const dx = point.x - this.position.x;
    const dy = point.y - this.position.y;
    const distSq = dx * dx + dy * dy;
    const minDist = this.radius + bodyRadius;

    if (distSq >= minDist * minDist) {
      return {
        collided: false,
        normal: { x: 0, y: 0 },
        overlap: 0,
      };
    }

    const dist = Math.sqrt(distSq);
    if (dist === 0) {
      // Degenerate case: point exactly at center
      return {
        collided: true,
        normal: { x: 1, y: 0 },
        overlap: minDist,
      };
    }

    const normal = {
      x: dx / dist,
      y: dy / dist,
    };

    return {
      collided: true,
      normal,
      overlap: minDist - dist,
    };
  }

  public dispose(): void {
    if (this.sprite && !this.sprite.destroyed) {
      this.sprite.destroy();
    }
  }
}
