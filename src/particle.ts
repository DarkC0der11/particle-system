import { Vector2 } from "./vector2";

let uuid = 0;

export class Particle {
  public id: number = uuid++
  public position: Vector2 = Vector2.Zero
  public velocity: Vector2 = Vector2.Zero
  public acceleration: Vector2 = Vector2.Zero
  public age: number = 0
  public lifeTime: number = 3000
  public scale: number = 1
  public color: string = 'rgba(255, 255, 255, 0.25)'
  public texture: HTMLImageElement | null = null;
  public width: number = 20
  public height: number = 20
  public opacity: number = 1
  public globalCompositeOperation: GlobalCompositeOperation = 'source-over'

  public applyForce (force: Vector2) {
    this.acceleration.add(force)
  }

  public isDead () {
    return this.age >= this.lifeTime 
  }

  public tick () {
    this.velocity.add(this.acceleration)
    this.position.add(this.velocity)
    this.acceleration.multiply(Vector2.Zero)
  }
}

export function createParticle () {
  return new Particle()
}