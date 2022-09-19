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

export function initializeTexture (texture: HTMLImageElement | string) {
  return (particle: Particle) => {
    if(typeof texture === 'string') {
      const image = new Image()
      image.src = texture
      particle.texture = image
    } else {
      particle.texture = texture
    }
  }
}

export function initializeSize (minSize: number, maxSize: number) {
  return (particle: Particle) => {
    const size = randomInRange(minSize, maxSize)

    particle.width = size
    particle.height = size
  }
}

export function initializeGlobalCompositeOperation (globalCompositeOperation: GlobalCompositeOperation) {
  return (particle: Particle) => {
    particle.globalCompositeOperation = globalCompositeOperation
  }
}