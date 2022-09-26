import { Vector2 } from "./vector2";

let uuid = 0;

export type ParticleId = number
export class Particle {
  public id: ParticleId = uuid++
  public position: Vector2 = Vector2.Zero
  /**
   * Rotation in degrees
   */
  public rotation: number = 0
  public scale: number = 1
  public velocity: Vector2 = Vector2.Zero
  public angularVelocity: number = 0
  public acceleration: Vector2 = Vector2.Zero
  public age: number = 0
  public lifeTime: number = 1000
  public color: string| undefined
  public texture: HTMLImageElement | undefined;
  public size: number = 48
  public alpha: number = 1

  public compositeOperation?: GlobalCompositeOperation

  public get isDead () {
    return this.age >= this.lifeTime
  }

  public applyForce (force: Vector2) {
    this.acceleration.add(force)
  }


  public tick (deltaTime: number) {
    this.age += deltaTime

    this.rotation += this.angularVelocity * deltaTime

    this.velocity.add(this.acceleration)
    this.position.add(this.velocity.clone().scale(deltaTime))
    this.acceleration.multiply(Vector2.Zero)
  }
}

export function createParticle () {
  return new Particle()
}