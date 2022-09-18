import { Particle } from "./particle"
import { randomInRange } from "./utils"
import { createVector2, Vector2 } from "./vector2"

export function initializeLifeTime (minLifeTime: number, maxLifeTime: number) {
  return (particle: Particle) => {
    particle.lifeTime = randomInRange(minLifeTime, maxLifeTime)
  }
}

export function initializeVelocity (minVelocity: Vector2, maxVelocity: Vector2) {
  return (particle: Particle) => {
    particle.velocity = createVector2(
      randomInRange(minVelocity.x, maxVelocity.x), 
      randomInRange(minVelocity.y, maxVelocity.y)
    )
  }
}

export function initializeColor (color: string) {
  return (particle: Particle) => {
    particle.color = color
  }
}