import { Particle, ParticleId } from "../particle"
import { getRandomFloatInRange } from "../utils"
import { ParticleBehavior } from "./behavior"

export class RotationOverLifeTime extends ParticleBehavior {
  private _cache?: Map<ParticleId, number>
    
  constructor(private _angularVelocity: number | [number, number]) {
    super()

    if (Array.isArray(this._angularVelocity)) {
      this._cache = new Map()
    }
  }

  public reset(particle: Particle): void {
    this._cache?.delete(particle.id)
  }

  public applyBehavior (particle: Particle) {
    if (Array.isArray(this._angularVelocity)) {
      let angularVelocity = this._cache?.get(particle.id)
      if (angularVelocity === undefined) {
        angularVelocity = getRandomFloatInRange(this._angularVelocity[0], this._angularVelocity[1])
        this._cache?.set(particle.id, angularVelocity)
      }

      particle.angularVelocity = angularVelocity
    } else {
      particle.angularVelocity = this._angularVelocity
    }
  }
}