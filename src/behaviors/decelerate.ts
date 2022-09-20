import { Particle } from "../particle";
import { ParticleBehavior } from "./behavior";

export class DecelerateBehavior extends ParticleBehavior {
  constructor(public _scale: number = 0.99) {
    super();
  }

  public applyBehavior(particle: Particle): void {
    particle.velocity = particle.velocity.clone().scale(this._scale);
  }
}