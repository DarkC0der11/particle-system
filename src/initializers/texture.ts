import { Particle } from "../particle"
import { ParticleInitializer } from "./initializer"

export class TextureInitializer extends ParticleInitializer {
  constructor(private _texture: HTMLImageElement) {
    super()
  }

  initialize(particle: Particle) {
    particle.texture = this._texture
  }
}