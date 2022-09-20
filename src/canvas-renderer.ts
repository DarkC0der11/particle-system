import { Particle } from "./particle"
import { ParticleSystemRenderer } from "./types"
import { convertToRadians } from "./utils"

function tintImage (image: HTMLImageElement, color: string) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')!

  canvas.width = image.width
  canvas.height = image.height

  context.drawImage(image, 0, 0)
  context.globalCompositeOperation = 'source-in'
  context.fillStyle = color
  context.fillRect(0, 0, canvas.width, canvas.height)

  return canvas
}

function createTintedTextureCacheKey (image: HTMLImageElement, color: string) {
  return `${image.src}-${color}`
}

const tintedTexturesCache = new Map<string, HTMLCanvasElement>()

export function createCanvasRenderer (context: CanvasRenderingContext2D): ParticleSystemRenderer {
  return {
    renderParticle(particle: Particle) {
      const { color, scale, width, height, position, texture, opacity, rotation, globalCompositeOperation } = particle

      context.save()

      context.globalAlpha = opacity
      context.globalCompositeOperation = globalCompositeOperation
      
      if(texture) {
        let textureOrTintedTexture: HTMLImageElement | HTMLCanvasElement = texture

        if(color) {
          const cacheKey = createTintedTextureCacheKey(texture, color)

          if(tintedTexturesCache.has(cacheKey)) {
            textureOrTintedTexture = tintedTexturesCache.get(cacheKey)!
          } else {
            const tintedTexture = tintImage(texture, color)
            tintedTexturesCache.set(cacheKey, tintedTexture)
            textureOrTintedTexture = tintedTexture
          }
        }
        
        const scaledWidth = width * scale
        const scaledHeight = height * scale

        const halfScaledWidth = scaledWidth / 2
        const halfScaledHeight = scaledHeight / 2

        const drawX = position.x - halfScaledWidth
        const drawY = position.y - halfScaledHeight

        // const translateX = position.x + halfScaledWidth
        // const translateY = position.y + halfScaledHeight

        // context.translate(translateX, translateY)
        // context.rotate(convertToRadians(rotation))
        context.drawImage(textureOrTintedTexture, drawX, drawY, scaledWidth, scaledHeight)
      } else {
        context.beginPath()
        context.arc(position.x, position.y, 20 * scale, 0, 2 * Math.PI)
        context.closePath()
        
        context.fillStyle = color ?? 'rgba(255, 255, 255, 1)'
        context.fill()
      }

      context.restore()
    }
  }
}