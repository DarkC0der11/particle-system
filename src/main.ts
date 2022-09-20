import {createParticleSystem} from './particle-system'
import {createCanvasRenderer} from './canvas-renderer'
import { createVector2 } from './vector2'
import {createScene2D} from './scene'
import particleUrl from './assets/particle-1.png'
import coolParticleUrl from './assets/cool-particle.png'

import { TextureInitializer, SizeInitializer, ColorInitializer, CompositeOperationInitializer } from './initializers'
import { AlphaOverLifeTime, FollowTargetBehavior, ForceBehavior, LimitVelocityBehavior, RotationOverLifeTime, ScaleOverLifeTime } from './behaviors'
import { VelocityInitializer } from './initializers/velocity'
import { DecelerateBehavior } from './behaviors/decelerate'

main()

const followMouseBehavior = new FollowTargetBehavior(0.005)
const colorInitializer = new ColorInitializer('orange')

const colorInput = document.querySelector('#color') as HTMLInputElement
colorInput.addEventListener('input', (e) => {
  colorInitializer.setColor((e.target as HTMLInputElement).value)
})

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

  let mousePosition = createVector2(0, 0)

  const canvasRenderer = createCanvasRenderer(context)

  const particleSystem1 = createParticleSystem({
    renderer: canvasRenderer,
  })

  particleSystem1.position = createVector2(canvas.width / 2, canvas.height / 2)

  particleSystem1.emission.rateOverTime = 500

  particleSystem1.shape.shapeType = 'circle'
  particleSystem1.shape.radius = Math.min(canvas.width, canvas.height) / 2 * 0.8,

  particleSystem1.addInitializer(colorInitializer)
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

  const particleSystem2 = createParticleSystem({
    renderer: canvasRenderer,
  })

  particleSystem2.position = createVector2(canvas.width / 2, canvas.height / 2)

  particleSystem2.emission.rateOverTime = 300
  particleSystem2.shape.shapeType = 'ring'
  particleSystem2.shape.radius = Math.min(canvas.width, canvas.height) / 2 * 0.8

  particleSystem2.addInitializer(colorInitializer)
  particleSystem2.addInitializer(new TextureInitializer(coolParticleImage))
  particleSystem2.addInitializer(new SizeInitializer(5, 14))
  particleSystem2.addInitializer(new VelocityInitializer([createVector2(-1, -1), createVector2(1, 1)]))
  particleSystem2.addInitializer(new CompositeOperationInitializer('lighter'))

  particleSystem2.addBehavior(new LimitVelocityBehavior(1)),
  particleSystem2.addBehavior(new RotationOverLifeTime([-0.3, 0.3]))
  particleSystem2.addBehavior(new ScaleOverLifeTime(1, 0))
  particleSystem2.addBehavior(new DecelerateBehavior(0.98))
  particleSystem2.addBehavior(new AlphaOverLifeTime(1, 0))
  particleSystem2.addBehavior(new ForceBehavior(createVector2(0, 0.01)))

  const scene = createScene2D(canvas)
  scene.addParticleSystem(particleSystem2)
  scene.addParticleSystem(particleSystem1)

  document.addEventListener('mousemove', (e) => {
    mousePosition = createVector2(e.clientX, e.clientY)
    followMouseBehavior.setTargetPosition(mousePosition)
  })

  document.addEventListener('mousedown', () => {
    particleSystem1.addBehavior(followMouseBehavior)
    particleSystem2.addBehavior(followMouseBehavior)
  })

  document.addEventListener('mouseup', () => {
    particleSystem1.removeBehavior(followMouseBehavior)
    particleSystem2.removeBehavior(followMouseBehavior)
  })
}