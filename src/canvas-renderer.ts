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

const imageCache = new WeakMap<HTMLImageElement, HTMLImageElement>()

export function createCanvasRenderer (context: CanvasRenderingContext2D): ParticleSystemRenderer {
  return {
    renderParticle(particle: Particle) {
      const { color, scale, width, height, position, texture } = particle

      context.globalAlpha = particle.opacity
      
      if(texture) {
        let image = imageCache.get(texture)

        if(!image) {
          const tintedImageUrl = tintImage(texture, color).toDataURL()
          image = new Image()
          image.src = tintedImageUrl
          imageCache.set(texture, image)
        }

        context.globalCompositeOperation = 'lighter'
        context.drawImage(image, position.x - width * 0.5, position.y - height * 0.5, width, height)
        context.globalCompositeOperation = 'multiply'
      } else {
        context.beginPath()
        context.fillStyle = color
        context.arc(position.x, position.y, 20 * scale, 0, 2 * Math.PI)
        context.closePath()
        context.fill()
      }

      context.globalAlpha = 1
    }
  }
}