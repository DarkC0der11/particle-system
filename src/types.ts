import { Particle } from "./particle";

export interface IParticleSystemRenderer {
  renderParticle (particle: Particle): void
}