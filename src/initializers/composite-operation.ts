import { Particle } from "../particle";
import { ParticleInitializer } from "./initializer";

export class CompositeOperationInitializer extends ParticleInitializer {
  constructor(private _compositeOperation: GlobalCompositeOperation) {
    super();
  }

  public initialize(particle: Particle): void {
    particle.compositeOperation = this._compositeOperation;
  }
}