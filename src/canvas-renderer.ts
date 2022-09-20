import { Particle } from "./particle"
import { ParticleSystemRenderer } from "./types"
import { convertToRadians } from "./utils"

const tintedTexturesCache = new Map<string, HTMLCanvasElement>()

function createTintedTextureCacheKey (image: HTMLImageElement, color: string) {
  return `${image.src}-${color}`
}

function tintImage (image: HTMLImageElement, color: string) {
  const cacheKey = createTintedTextureCacheKey(image, color)

  if(tintedTexturesCache.has(cacheKey)) {
    return tintedTexturesCache.get(cacheKey)!
  }

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')!

  canvas.width = image.width
  canvas.height = image.height

  context.drawImage(image, 0, 0)
  context.globalCompositeOperation = 'source-in'
  context.fillStyle = color
  context.fillRect(0, 0, canvas.width, canvas.height)

  tintedTexturesCache.set(cacheKey, canvas)

  return canvas
}

export function createCanvasRenderer (context: CanvasRenderingContext2D): ParticleSystemRenderer {
  return {
    renderParticle(particle: Particle) {
      const { color, scale, size, position, texture, alpha, rotation, compositeOperation } = particle

      context.save()

      context.globalAlpha = alpha

      if(compositeOperation) {
        context.globalCompositeOperation = compositeOperation
      }

      const scaledSize = size * scale

      const halfScaledSize = scaledSize / 2

      if(texture) {
        let textureOrTintedTexture: HTMLImageElement | HTMLCanvasElement = texture

        if(color) {
          textureOrTintedTexture = tintImage(texture, color)
        }

        context.translate(position.x, position.y)
        context.rotate(convertToRadians(rotation))
        context.translate(-position.x, -position.y)

        context.drawImage(
          textureOrTintedTexture, 
          position.x - halfScaledSize, 
          position.y - halfScaledSize, 
          scaledSize, 
          scaledSize
        )
      } else {
        context.beginPath()
        context.arc(position.x, position.y, scaledSize, 0, 2 * Math.PI)
        context.closePath()

        context.fillStyle = color ?? 'rgba(255, 255, 255, 1)'
        context.fill()
      }
      
      context.restore()
    }
  }
}