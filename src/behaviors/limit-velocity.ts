import { Particle } from "../particle"
import { ParticleBehavior } from "./behavior"

export class LimitVelocityBehavior extends ParticleBehavior {
  constructor(private _maxVelocity: number) {
    super()
  }

  public applyBehavior (particle: Particle) {
    if (particle.velocity.getLength() > this._maxVelocity) {
      particle.velocity = particle.velocity.normalize().scale(this._maxVelocity)
    }
  }
}