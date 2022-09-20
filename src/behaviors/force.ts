import { ParticleBehavior } from "./behavior";
import { Particle, ParticleId } from "../particle";
import { Vector2 } from "../vector2";

export class ForceBehavior extends ParticleBehavior {
  constructor(private _force: Vector2) {
    super()
  }

  applyBehavior(particle: Particle) {
    particle.applyForce(this._force);
  }
}

export class RandomForceBehavior extends ParticleBehavior {
  private _cache = new Map<ParticleId, Vector2>()

  constructor(
    private _minForce: Vector2, 
    private _maxForce: Vector2
  ) {
    super()
  }

  public reset(particle: Particle) {
    this._cache.delete(particle.id)
  }

  public initialize(particle: Particle) {
    this._cache.set(particle.id, Vector2.RandomBetween(this._minForce, this._maxForce))
  }

  public applyBehavior(particle: Particle) {
    particle.applyForce(this._cache.get(particle.id)!);
  }
}