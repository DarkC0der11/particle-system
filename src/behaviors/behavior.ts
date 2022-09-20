import { Particle } from "../particle";

export class ParticleBehavior {
  public initialize (particle: Particle) {}
  public reset (particle: Particle) {}
  public applyBehavior(particle: Particle, deltaTime: number) {
    throw new Error("Method not implemented.");
  };
}