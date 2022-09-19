import {createParticleSystem} from './particle-system'
import {createCanvasRenderer} from './canvas-renderer'
import { createVector2 } from './vector2'
import { scaleOverTime, limitVelocity, opacityOverTime, followTarget } from './behaviours'
import { initializeColor, initializeGlobalCompositeOperation, initializeLifeTime, initializeSize, initializeTexture, initializeVelocity } from './initializers'
import {createScene2D} from './scene'
import { createEmissionModule } from './emission-module'
import particleImage from './particle.webp'

const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!
const context = canvas.getContext('2d')!

canvas.width = window.innerWidth
canvas.height = window.innerHeight

console.log(canvas.width)

let mousePosition = createVector2(0, 0)

const canvasRenderer = createCanvasRenderer(context)

const particleSystem1 = createParticleSystem({
  renderer: canvasRenderer,
  emissionModule: createEmissionModule({
    rateOverTime: 10,
    shape: 'ring',
    radius: 300
  }),
  position: createVector2(canvas.width / 2, canvas.height / 2),
  initializers: [
    initializeColor('rgba(255, 50, 50, 1)'),
    initializeLifeTime(2000, 4000),
    initializeTexture(particleImage),
    initializeSize(5, 150),
    initializeVelocity(
      createVector2(-0, -0),
      createVector2(0, 0)
    ),
    initializeGlobalCompositeOperation('lighter')
  ],
  behaviors: [ 
    scaleOverTime(1, 0),
    opacityOverTime(1, 0),
    limitVelocity(8),
    followTarget({ getTargetPosition: () => mousePosition, acceleration: 1 })
  ]
})

const particleSystem2 = createParticleSystem({
  renderer: canvasRenderer,
  emissionModule: createEmissionModule({
    rateOverTime: 200,
  }),
  position: createVector2(canvas.width / 4, canvas.height / 2),
  initializers: [
    initializeColor('rgba(0, 255, 100, 1)'),
    initializeGlobalCompositeOperation('lighter'),
    initializeLifeTime(2000, 4000),
    initializeTexture(particleImage),
    initializeSize(20, 150),
    initializeVelocity(
      createVector2(-2, -2),
      createVector2(2, 2)
    ),
  ],
  behaviors: [ 
    scaleOverTime(1, 0),
    opacityOverTime(1, 0),
    followTarget({ getTargetPosition: () => mousePosition, acceleration: 0.1 })
  ]
})

const scene = createScene2D(canvas)
scene.addParticleSystem(particleSystem2)
scene.addParticleSystem(particleSystem1)

document.addEventListener('mousemove', (e) => {
  mousePosition = createVector2(e.clientX, e.clientY)
  particleSystem1.setPosition(mousePosition)
})