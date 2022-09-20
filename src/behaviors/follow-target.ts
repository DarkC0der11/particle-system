import { Particle } from "../particle";
import { Vector2 } from "../vector2";
import { ParticleBehavior } from "./behavior";

export class FollowTargetBehavior extends ParticleBehavior {
  private _targetPosition?: Vector2;

  constructor(private _acceleration: number = 0.1) {
    super();
  }

  public setTargetPosition(position: Vector2): void {
    this._targetPosition = position;
  }

  public clearTargetPosition(): void {
    this._targetPosition = undefined;
  }

  public applyBehavior(particle: Particle): void {
    if(!this._targetPosition) {
      return;
    }

    particle.acceleration = particle.acceleration.add(this._targetPosition.clone().subtract(particle.position).scale(this._acceleration));
  }
}