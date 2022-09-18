import { Particle } from "./particle"
import { ParticleSystemRenderer } from "./types"

export function createCanvasRenderer (context: CanvasRenderingContext2D): ParticleSystemRenderer {
  return {
    renderParticle(particle: Particle) {
      context.beginPath()
      context.arc(particle.position.x, particle.position.y, 20 * particle.scale, 0, 2 * Math.PI)
      context.fillStyle = particle.color
      context.fill()
      context.closePath()
    }
  }
}