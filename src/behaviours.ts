import { Particle } from "./particle";
import { Vector2 } from "./vector2";

export function force (force: Vector2) {
  return (particle: Particle) => {
    particle.applyForce(force)
  }
}

export function scaleOverTime (startScale: number, endScale: number, duration?: number) {
  return (particle: Particle) => {
    const scale = startScale + (endScale - startScale) * (particle.age / (duration ?? particle.lifeTime))
    particle.scale = scale < 0 ? 0 : scale
  }
}

export function followTarget ({
  getTargetPosition,
  acceleration
}: {
  getTargetPosition: () => Vector2,
  acceleration: number
}) {
  return (particle: Particle) => {
    particle.acceleration.set(getTargetPosition().clone().subtract(particle.position).normalize().scale(acceleration))
  }
}

export function limitVelocity (limit: number) {
  return (particle: Particle) => {
    if (particle.velocity.getLength() > limit) {
      particle.velocity = particle.velocity.normalize().scale(limit)
    }
  }
}