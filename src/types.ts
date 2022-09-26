import { Particle } from "./particle";
import { ParticleTrail } from "./particle-trail";

export interface ParticleSystemRenderer {
  renderParticle (particle: Particle): void
}