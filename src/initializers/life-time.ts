import { Particle } from "../particle";
import { getRandomIntegerBetweenRange } from "../utils";
import { ParticleInitializer } from "./initializer";

export class LifeTimeInitializer extends ParticleInitializer {
  constructor(public min: number, public max: number) {
    super()
  }

  initialize(particle: Particle): void {
    particle.lifeTime = getRandomIntegerBetweenRange(this.min, this.max)
  }
}