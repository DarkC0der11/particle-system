import { Particle } from "./particle";

export interface ParticleSystemRenderer {
  renderParticle (particle: Particle): void
}