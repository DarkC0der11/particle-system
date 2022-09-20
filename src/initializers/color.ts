import { ParticleInitializer } from "./initializer"
import {Particle} from '../particle'

export class ColorInitializer extends ParticleInitializer {
  constructor(private _color: string) {
    super()
  }

  initialize(particle: Particle) {
    particle.color = this._color
  }

  setColor(color: string) {
    this._color = color
  }
}

export class RandomColorInitializer extends ParticleInitializer {
  constructor(private _colors: string[]) {
    super()
  }

  initialize(particle: Particle) {
    particle.color = this._colors[Math.floor(Math.random() * this._colors.length)]
  }
}