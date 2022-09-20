import {createParticleSystem} from './particle-system'
import {createCanvasRenderer} from './canvas-renderer'
import { createVector2 } from './vector2'
import {createScene2D} from './scene'
import particleUrl from './assets/particle-1.png'
import coolParticleUrl from './assets/cool-particle.png'

import { TextureInitializer, SizeInitializer, CompositeOperationInitializer, ColorInitializer } from './initializers'
import { AlphaOverLifeTime, ForceBehavior, LimitVelocityBehavior, RotationOverLifeTime, ScaleOverLifeTime } from './behaviors'
import { VelocityInitializer } from './initializers/velocity'
import { DecelerateBehavior } from './behaviors/decelerate'

main()

async function main () {
  const preloadPromises = [particleUrl, coolParticleUrl].map(url => {
    return new Promise<HTMLImageElement>((resolve) => {
      const image = new Image()
      image.addEventListener('load', () => resolve(image))
      image.src = url
    })
  })

  const [particleImage, coolParticleImage] = await Promise.all<HTMLImageElement>(preloadPromises)

  const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!
  const context = canvas.getContext('2d')!

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const canvasRenderer = createCanvasRenderer(context)

  const particleSystem1 = createParticleSystem({
    renderer: canvasRenderer,
  })

  particleSystem1.isLooping = false

  particleSystem1.position = createVector2(canvas.width / 2, canvas.height / 2)

  particleSystem1.duration = 3000
  particleSystem1.emission.bursts = [
    {time: 1000, min: 20, max: 40},
    {time: 1500, min: 20, max: 40},
    {time: 2000, min: 20, max: 40},
    {time: 2500, min: 20, max: 40},
    {time: 3000, min: 20, max: 40}
  ]

  particleSystem1.shape.shapeType = 'point'
  particleSystem1.shape.radius = Math.min(canvas.width, canvas.height) / 2 * 0.8,

  particleSystem1.addInitializer(new ColorInitializer('orange'))
  particleSystem1.addInitializer(new TextureInitializer(particleImage))
  particleSystem1.addInitializer(new SizeInitializer(50 , 150))
  particleSystem1.addInitializer(new VelocityInitializer([createVector2(-0.01, -0.01), createVector2(0.01, 0.01)]))
  particleSystem1.addInitializer(new CompositeOperationInitializer('lighter'))

  particleSystem1.addBehavior(new LimitVelocityBehavior(1)),
  particleSystem1.addBehavior(new RotationOverLifeTime([-0.3, 0.3]))
  particleSystem1.addBehavior(new ScaleOverLifeTime(1, 0))
  particleSystem1.addBehavior(new DecelerateBehavior(0.98))
  particleSystem1.addBehavior(new AlphaOverLifeTime(1, 0))
  particleSystem1.addBehavior(new ForceBehavior(createVector2(0, 0.01)))
  
  createScene2D(canvas).addParticleSystem(particleSystem1)

  // @ts-ignore
  window.ps = particleSystem1
}
