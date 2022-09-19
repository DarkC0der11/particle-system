import { Particle } from "./particle"
import { ParticleSystemRenderer } from "./types"

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

function createImageCacheKey (image: HTMLImageElement, color: string) {
  return `${image.src}-${color}`
}

const imageCache = new Map<string, HTMLImageElement>()

export function createCanvasRenderer (context: CanvasRenderingContext2D): ParticleSystemRenderer {
  return {
    renderParticle(particle: Particle) {
      const { color, scale, width, height, position, texture, opacity, globalCompositeOperation } = particle

      context.globalAlpha = opacity
      context.globalCompositeOperation = globalCompositeOperation
      
      if(texture) {
        const cacheKey = createImageCacheKey(texture, color)

        let image: HTMLImageElement | undefined

        if(imageCache.has(cacheKey)) {
          image = imageCache.get(cacheKey)!
        } 

        if(!image) {
          const tintedImageUrl = tintImage(texture, color).toDataURL()
          image = new Image()
          image.src = tintedImageUrl
          imageCache.set(cacheKey, image)
        }
        
        const scaledWidth = width * scale
        const scaledHeight = height * scale

        const x = position.x - scaledWidth * 0.5
        const y = position.y - scaledHeight * 0.5

        context.drawImage(image, x, y, scaledWidth, scaledHeight)
      } else {
        context.beginPath()
        context.fillStyle = color
        context.arc(position.x, position.y, 20 * scale, 0, 2 * Math.PI)
        context.closePath()
        context.fill()
      }

      context.globalCompositeOperation = 'source-over'
      context.globalAlpha = 1
    }
  }
}