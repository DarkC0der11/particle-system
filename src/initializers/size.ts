import { Particle } from "../particle"
import { getRandomFloatInRange } from "../utils"
import { ParticleInitializer } from "./initializer"

export class SizeInitializer extends ParticleInitializer {
  constructor(private _min: number, private _max: number) {
    super()
  }

  initialize(particle: Particle) {
    if(this._min === this._max) {
      particle.size = this._min
    } else {
      particle.size = getRandomFloatInRange(this._min, this._max)
    }
  }
}