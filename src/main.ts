import {createParticleSystem} from './particle-system'
import {createCanvasRenderer} from './canvas-renderer'
import { createVector2 } from './vector2'
import {createScene2D} from './scene'
import particle1 from './assets/particle-1.png'
import particle2 from './assets/particle-2.png'

import { TextureInitializer, SizeInitializer, CompositeOperationInitializer, ColorInitializer, LifeTimeInitializer, RandomColorInitializer } from './initializers'
import { AlphaOverLifeTime, ForceBehavior, LimitVelocityBehavior, RotationOverLifeTime, ScaleOverLifeTime } from './behaviors'
import { VelocityInitializer } from './initializers/velocity'
import { getRandomColor } from './utils'

main()

const randomColors = Array.from({ length: 15 }).map(() => getRandomColor())

async function main () {
  const preloadPromises = [particle1, particle2].map(url => {
    return new Promise<HTMLImageElement>((resolve) => {
      const image = new Image()
      image.addEventListener('load', () => resolve(image))
      image.src = url
    })
  })

  const [, particle2Image] = await Promise.all<HTMLImageElement>(preloadPromises)

  const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!
  const context = canvas.getContext('2d')!

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const canvasRenderer = createCanvasRenderer(context)

  const createSubParticleSystem = () => {
    const subParticleSystem = createParticleSystem({
      renderer: canvasRenderer,
    })
    subParticleSystem.duration = 1000
    subParticleSystem.isLooping = false
    subParticleSystem.emission.bursts = [{ time: 0, min: 100, max: 200 }]
    subParticleSystem.addInitializer(new RandomColorInitializer(randomColors))
    subParticleSystem.addInitializer(new TextureInitializer(particle2Image))
    subParticleSystem.addInitializer(new SizeInitializer(20, 20))
    subParticleSystem.addInitializer(new VelocityInitializer([createVector2(-0.2, -0.2), createVector2(0.2, 0.2)]))
    subParticleSystem.addInitializer(new CompositeOperationInitializer('lighter'))
    subParticleSystem.addInitializer(new LifeTimeInitializer(1000, 3000))

    subParticleSystem.addBehavior(new RotationOverLifeTime([-0.3, 0.3]))
    subParticleSystem.addBehavior(new ScaleOverLifeTime(1, 0))
    subParticleSystem.addBehavior(new AlphaOverLifeTime(1, 0))
    subParticleSystem.addBehavior(new ForceBehavior(createVector2(0, 0.001)))
    return subParticleSystem
  }

  const particleSystem1 = createParticleSystem({
    renderer: canvasRenderer,
  })

  particleSystem1.subEmitters.subEmitters = [
    {
      triggerCondition: 'death',
      particleSystemFactory: createSubParticleSystem,
    }
  ]

  particleSystem1.position = createVector2(canvas.width / 2, canvas.height * 0.8)

  particleSystem1.isLooping = true
  particleSystem1.duration = 1000
  particleSystem1.emission.rateOverTime = 5

  particleSystem1.shape.shapeType = 'point'
  particleSystem1.shape.radius = Math.min(canvas.width, canvas.height) / 2 * 0.8,

  particleSystem1.addInitializer(new ColorInitializer('orange'))
  particleSystem1.addInitializer(new TextureInitializer(particle2Image))
  particleSystem1.addInitializer(new SizeInitializer(20 , 20))
  particleSystem1.addInitializer(new VelocityInitializer([createVector2(-0.6, -0.7), createVector2(0.6, -0.6)]))
  particleSystem1.addInitializer(new CompositeOperationInitializer('lighter'))

  particleSystem1.addBehavior(new LimitVelocityBehavior(3)),
  particleSystem1.addBehavior(new ForceBehavior(createVector2(0, 0.005)))
  
  createScene2D(canvas).addParticleSystem(particleSystem1)

  // @ts-ignore -- for test in browser
  window.ps = particleSystem1
}
