import {createParticleSystem} from './particle-system'
import {createCanvasRenderer} from './canvas-renderer'
import { createVector2 } from './vector2'
import {createScene2D} from './scene'
import { createEmissionModule } from './emission-module'
import sparkParticleUrl from './assets/cool-particle.png'
import glowParticleUrl from './assets/particle.png'

import { ForceBehavior, RandomForceBehavior } from './behaviors/force'
import { LimitVelocityBehavior } from './behaviors/limit-velocity'
import { TextureInitializer, SizeInitializer, ColorInitializer, CompositeOperationInitializer } from './initializers'
import { RotationOverLifeTime } from './behaviors'
import { VelocityInitializer } from './initializers/velocity'

main()

async function main () {
  const preloadPromises = [sparkParticleUrl, glowParticleUrl].map(url => {
    return new Promise<HTMLImageElement>((resolve) => {
      const image = new Image()
      image.addEventListener('load', () => resolve(image))
      image.src = url
    })
  })

  const [sparkParticleImage, glowParticleImage] = await Promise.all<HTMLImageElement>(preloadPromises)

  const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!
  const context = canvas.getContext('2d')!

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  let mousePosition = createVector2(0, 0)

  const canvasRenderer = createCanvasRenderer(context)

  const particleSystem1 = createParticleSystem({
    renderer: canvasRenderer,
    emissionModule: createEmissionModule({
      rateOverTime: 1500
    }),
    position: createVector2(canvas.width / 2, canvas.height / 2),
  })

  particleSystem1.addInitializer(new ColorInitializer('orange'))
  particleSystem1.addInitializer(new TextureInitializer(sparkParticleImage))
  particleSystem1.addInitializer(new SizeInitializer(2, 8))
  particleSystem1.addInitializer(new CompositeOperationInitializer('lighter'))
  particleSystem1.addInitializer(new VelocityInitializer([createVector2(0.5, -0.2), createVector2(-0.5, -1.8)]))

  // particleSystem1.addBehavior(new RandomForceBehavior(createVector2(0.01, -0.03), createVector2(-0.01, -0.05)))
  particleSystem1.addBehavior(new ForceBehavior(createVector2(0, 0.03)))
  // particleSystem1.addBehavior(new LimitVelocityBehavior(0.3))
  particleSystem1.addBehavior(new RotationOverLifeTime([-0.2, 0.2]))

  const scene = createScene2D(canvas)
  scene.addParticleSystem(particleSystem1)

  document.addEventListener('mousemove', (e) => {
    mousePosition = createVector2(e.clientX, e.clientY)
  })

  // document.addEventListener('mousedown', () => {
  //   [particleSystem1].forEach(particleSystem => {
  //     particleSystem.addBehavior(followMouse)
  //     particleSystem.addBehavior(standardLimitVelocity)
  //     particleSystem.removeBehavior(decelerationBehavior)
  //   })
  // })

  // document.addEventListener('mouseup', () => {
  //   [particleSystem1].forEach(particleSystem => {
  //     particleSystem.removeBehavior(followMouse)
  //     particleSystem.addBehavior(standardLimitVelocity)
  //     particleSystem.addBehavior(decelerationBehavior)
  //   })
  // })
}