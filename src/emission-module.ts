import { ParticleSystem } from "./particle-system"
import { getRandomPointAroundCircle, getRandomPointInsideCircle, getRandomPointInsideRectangle } from "./utils"
import { Vector2 } from "./vector2"

const SECOND_IN_MILLISECONDS = 1000

type EmissionModuleConfig = {
  rateOverTime?: number
  shape?: EmissionShape
  radius?: number
  width?: number
  height?: number
}

type EmissionShape = 'point' | 'circle' | 'rectangle' | 'ring'

export class EmissionModule {
  private _timeSinceLastEmission: number = 0

  private _rateOverTime: number
  private _shape: EmissionShape
  private _system!: ParticleSystem
  private _radius
  private _width
  private _height

  constructor (config: EmissionModuleConfig = {}) {
    this._rateOverTime = config.rateOverTime ?? 10
    this._shape = config.shape ?? 'point'
    this._radius = config.radius ?? 75
    this._width = config.width ?? 150
    this._height = config.height ?? 150
  }

  private _getParticlePosition () {
    const systemPosition = this._system.position

    if(this._shape === 'circle') {
      return getRandomPointInsideCircle(systemPosition, this._radius)
    }

    if(this._shape === 'ring') {
      return getRandomPointAroundCircle(systemPosition, this._radius)
    }

    if(this._shape === 'rectangle') {
      return getRandomPointInsideRectangle(systemPosition.clone().subtract(new Vector2(this._width * 0.5, this._height * 0.5)), this._width, this._height)
    }

    return systemPosition
  }

  public register (particleSystem: ParticleSystem) {
    particleSystem.onTick((deltaTime) => {
      const particlesCountToEmit = this._getParticlesCountToEmit()

      if(particlesCountToEmit > 0) {
        for (let i = 0; i < particlesCountToEmit; i++) {
          const position = this._getParticlePosition()
          particleSystem.emitParticle(position)
        }

        this._timeSinceLastEmission = 0
      }

      this._timeSinceLastEmission = this._timeSinceLastEmission + deltaTime
    })

    this._system = particleSystem
  }

  private _getParticlesCountToEmit () {
    return Math.floor(this._timeSinceLastEmission / (SECOND_IN_MILLISECONDS / this._rateOverTime))
  }
}

export function createEmissionModule (config: EmissionModuleConfig = {}) {
  return new EmissionModule(config)
}