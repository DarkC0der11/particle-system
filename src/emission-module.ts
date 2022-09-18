import { ParticleSystem } from "./particle-system"

const SECOND_IN_MILLISECONDS = 1000

type EmissionModuleConfig = {
  rateOverTime?: number
}

export class EmissionModule {
  private _rateOverTime: number
  private _timeSinceLastEmission: number

  constructor (config: EmissionModuleConfig = {}) {
    this._rateOverTime = config.rateOverTime ?? 10
    this._timeSinceLastEmission = 0
  }

  public register (particleSystem: ParticleSystem) {
    particleSystem.onTick((deltaTime) => {
      const particlesCountToEmit = this._getParticlesCountToEmit()

      if (particlesCountToEmit) {
        particleSystem.emitParticles(particlesCountToEmit)
        this._timeSinceLastEmission = 0
      }

      this._timeSinceLastEmission = this._timeSinceLastEmission + deltaTime
    })
  }

  private _getParticlesCountToEmit () {
    return Math.floor(this._timeSinceLastEmission / (SECOND_IN_MILLISECONDS / this._rateOverTime))
  }
}

export function createEmissionModule (config: EmissionModuleConfig = {}) {
  return new EmissionModule(config)
}