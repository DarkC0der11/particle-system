import { Particle } from "./particle";
import { Vector2 } from "./vector2";

export function force (force: Vector2) {
  return (particle: Particle) => {
    particle.applyForce(force)
  }
}

export function createDecelerationBehavior (amount: number) {
  return (particle: Particle) => {
    particle.velocity = particle.velocity.scale(amount)
  }
}

export function scaleOverTime (startScale: number, endScale: number, duration?: number) {
  return (particle: Particle) => {
    const scale = startScale + (endScale - startScale) * (particle.age / (duration ?? particle.lifeTime))
    particle.scale = scale < 0 ? 0 : scale
  }
}

export function followTarget ({
  target,
  acceleration
}: {
  target: () => Vector2,
  acceleration: number
}) {
  return (particle: Particle) => {
    particle.acceleration.set(target().clone().subtract(particle.position).normalize().scale(acceleration))
  }
}

export function limitVelocity (limit: number) {
  return (particle: Particle) => {
    if (particle.velocity.getLength() > limit) {
      particle.velocity = particle.velocity.normalize().scale(limit)
    }
  }
}

export function forceAtPosition ({force, position}: {force: Vector2, position: () => Vector2}) {
  return (particle: Particle) => {
    const direction = particle.position.clone().subtract(position()).normalize()
    particle.applyForce(direction.multiply(force))
  }
}  

export function opacityOverTime (startOpacity: number, endOpacity: number, duration?: number) {
  return (particle: Particle) => {
    const opacity = startOpacity + (endOpacity - startOpacity) * (particle.age / (duration ?? particle.lifeTime))
    particle.opacity = opacity < 0 ? 0 : opacity
  }
}