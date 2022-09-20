import { ParticleSystem } from "./particle-system"

const SECOND_IN_MILLISECONDS = 1000
export class EmissionModule {
  public rateOverTime: number = 10

  private _timeSinceLastEmission: number = 0

  public register (particleSystem: ParticleSystem) {
    particleSystem.onTick((deltaTime) => {
      const particlesCountToEmit = this._getParticlesCountToEmit()

      if(particlesCountToEmit > 0) {
        particleSystem.emitParticles(particlesCountToEmit)
        this._timeSinceLastEmission = 0
      }

      this._timeSinceLastEmission = this._timeSinceLastEmission + deltaTime
    })
  }

  private _getParticlesCountToEmit () {
    return Math.floor(this._timeSinceLastEmission / (SECOND_IN_MILLISECONDS / this.rateOverTime))
  }
}

export function createEmissionModule () {
  return new EmissionModule()
}