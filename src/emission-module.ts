import mitt from "mitt"
import { getRandomIntegerBetweenRange } from "./utils"

const SECOND_IN_MILLISECONDS = 1000

export type EmissionBurst = {
  time: number
  min: number
  max: number
}

export type EmissionModuleEvents = {
  emit: number
  'last-burst': void
}
export class EmissionModule {
  public rateOverTime: number = 10
  public bursts: EmissionBurst[] = []
  public isEnabled: boolean = true

  private _burstTimestamp: number = 0
  private _previousBurstIndex: number = -1
  private _timeSinceLastEmission: number = 0

  public events = mitt<EmissionModuleEvents>()

  public get isUsingBursts () {
    return this.bursts.length > 0
  }

  private _handleBursts (deltaTime: number) {
    this._burstTimestamp += deltaTime

    const currentBurstIndex = this.bursts.findIndex((burst, burstIndex) => {
      return this._burstTimestamp > burst.time && burstIndex > this._previousBurstIndex
    })

    if(currentBurstIndex === -1 || this._previousBurstIndex === currentBurstIndex) {
      return;
    }

    const currentBurst = this.bursts[currentBurstIndex]
    
    if(this._burstTimestamp > currentBurst.time) {
      const particlesCountToEmit = getRandomIntegerBetweenRange(currentBurst.min, currentBurst.max)
      this.events.emit('emit', particlesCountToEmit)

      const isLastBurst = currentBurstIndex === this.bursts.length - 1

      if(isLastBurst) {
        this._burstTimestamp = 0
        this._previousBurstIndex = -1
        this.events.emit('last-burst')
      } else {
        this._previousBurstIndex = currentBurstIndex
      }
    }
  }

  private _handleRateOverTime (deltaTime: number) {
    const particlesCountToEmit = Math.floor(this._timeSinceLastEmission / (SECOND_IN_MILLISECONDS / this.rateOverTime))

    if(particlesCountToEmit > 0) {
      this.events.emit('emit', particlesCountToEmit)
      this._timeSinceLastEmission = 0
    }

    this._timeSinceLastEmission = this._timeSinceLastEmission + deltaTime
  }

  public tick (deltaTime: number) {
    if(!this.isEnabled) {
      return;
    }

    if(this.bursts.length > 0) {
      this._handleBursts(deltaTime)
    } else {
      this._handleRateOverTime(deltaTime)
    }
  }
}

export function createEmissionModule () {
  return new EmissionModule()
}