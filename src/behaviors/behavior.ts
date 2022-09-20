import { Particle } from "../particle";

export class ParticleBehavior {
  public initialize (_particle: Particle) {}
  public reset (_particle: Particle) {}
  public applyBehavior(_particle: Particle, _deltaTime: number) {
    throw new Error("Method not implemented.");
  };
}