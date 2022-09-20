import {createParticleSystem} from './particle-system'
import {createCanvasRenderer} from './canvas-renderer'
import { createVector2 } from './vector2'
import {createScene2D} from './scene'
import particle1 from './assets/particle-1.png'
import particle2 from './assets/particle-2.png'

import { TextureInitializer, SizeInitializer, CompositeOperationInitializer, ColorInitializer } from './initializers'
import { AlphaOverLifeTime, ForceBehavior, LimitVelocityBehavior, RotationOverLifeTime, ScaleOverLifeTime } from './behaviors'
import { VelocityInitializer } from './initializers/velocity'

main()

async function main () {
  const preloadPromises = [particle1, particle2].map(url => {
    return new Promise<HTMLImageElement>((resolve) => {
      const image = new Image()
      image.addEventListener('load', () => resolve(image))
      image.src = url
    })
  })

  const [particle1Image, particle2Image] = await Promise.all<HTMLImageElement>(preloadPromises)

  const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!
  const context = canvas.getContext('2d')!

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const canvasRenderer = createCanvasRenderer(context)

  const particleSystem1 = createParticleSystem({
    renderer: canvasRenderer,
  })

  particleSystem1.position = createVector2(canvas.width / 2, canvas.height / 2)

  particleSystem1.isLooping = false
  particleSystem1.duration = 3000
  particleSystem1.emission.rateOverTime = 200

  particleSystem1.shape.shapeType = 'point'
  particleSystem1.shape.radius = Math.min(canvas.width, canvas.height) / 2 * 0.8,

  particleSystem1.addInitializer(new ColorInitializer('orange'))
  particleSystem1.addInitializer(new TextureInitializer(particle2Image))
  particleSystem1.addInitializer(new SizeInitializer(20 , 150))
  particleSystem1.addInitializer(new VelocityInitializer([createVector2(-0.2, -0.2), createVector2(0.2, 0.2)]))
  particleSystem1.addInitializer(new CompositeOperationInitializer('lighter'))

  particleSystem1.addBehavior(new LimitVelocityBehavior(3)),
  particleSystem1.addBehavior(new RotationOverLifeTime([-0.3, 0.3]))
  particleSystem1.addBehavior(new ScaleOverLifeTime(1, 0))
  particleSystem1.addBehavior(new AlphaOverLifeTime(1, 0))
  particleSystem1.addBehavior(new ForceBehavior(createVector2(0, 0.01)))
  
  createScene2D(canvas).addParticleSystem(particleSystem1)

  // @ts-ignore -- for test in browser
  window.ps = particleSystem1
}
