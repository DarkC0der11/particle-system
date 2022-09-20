import { Particle } from "../particle"
import { ParticleBehavior } from "./behavior"

export class AlphaOverLifeTime extends ParticleBehavior {
  constructor(private _from: number, private _to: number, private _duration?: number) {
    super()
  }

  public applyBehavior (particle: Particle) {
    const progress = particle.age / (this._duration ?? particle.lifeTime)
    particle.alpha = this._from + (this._to - this._from) * progress
  }
}