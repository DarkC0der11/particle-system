import { Particle } from "./particle"
import { getRandomFloatInRange } from "./utils"
import { createVector2, Vector2 } from "./vector2"

export function initializeLifeTime (minLifeTime: number, maxLifeTime: number) {
  return (particle: Particle) => {
    particle.lifeTime = getRandomFloatInRange(minLifeTime, maxLifeTime)
  }
}

export function initializeVelocity (minVelocity: Vector2, maxVelocity: Vector2) {
  return (particle: Particle) => {
    particle.velocity = createVector2(
      getRandomFloatInRange(minVelocity.x, maxVelocity.x), 
      getRandomFloatInRange(minVelocity.y, maxVelocity.y)
    )
  }
}

export function initializeColor (color: () => string) {
  return (particle: Particle) => {
    particle.color = color()
  }
}

export function initializeTexture (texture: HTMLImageElement) {
  return (particle: Particle) => {
    particle.texture = texture
  }
}

export function initializeSize (minSize: number, maxSize: number) {
  return (particle: Particle) => {
    const size = getRandomFloatInRange(minSize, maxSize)

    particle.width = size
    particle.height = size
  }
}

export function initializeGlobalCompositeOperation (globalCompositeOperation: GlobalCompositeOperation) {
  return (particle: Particle) => {
    particle.globalCompositeOperation = globalCompositeOperation
  }
}

export function intitializeRotation (minRotation: number, maxRotation: number) {
  return (particle: Particle) => {
    particle.rotation = getRandomFloatInRange(minRotation, maxRotation)
  }
}