import { Vector2 } from "./vector2"

export class ParticleTrail {
  public age: number = 0

  constructor(public position: Vector2, public lifeTime: number = 500) {}

  public get isDead () {
    return this.age > this.lifeTime
  }

  tick(deltaTime: number) {
    this.age += deltaTime
  }
}