import { Particle } from "../particle"
import { Vector2 } from "../vector2"
import { ParticleInitializer } from "./initializer"

export class VelocityInitializer extends ParticleInitializer {
  constructor(private _velocity: Vector2 | [Vector2, Vector2]) {
    super()
  }

  public initialize(particle: Particle): void {
    if (Array.isArray(this._velocity)) {
      particle.velocity = Vector2.RandomBetween(this._velocity[0], this._velocity[1])
    } else {
      particle.velocity = this._velocity
    }
  }
}