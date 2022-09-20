import { ParticleInitializer } from "./initializer"
import {Particle} from '../particle'

export class ColorInitializer extends ParticleInitializer {
  constructor(private _color: string) {
    super()
  }

  initialize(particle: Particle) {
    particle.color = this._color
  }
}