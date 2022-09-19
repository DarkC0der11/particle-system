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

let mousePosition = createVector2(0, 0)

const canvasRenderer = createCanvasRenderer(context)

const particleSystem1 = createParticleSystem({
  renderer: canvasRenderer,
  emissionModule: createEmissionModule({
    shape: 'circle',
    rateOverTime: 100
  }),
  position: createVector2(canvas.width / 3, canvas.height / 2),
  initializers: [
    initializeColor('rgba(255, 50, 50, 1)'),
    initializeLifeTime(1000, 1000),
    initializeTexture(particleImage),
    initializeSize(20, 20),
    initializeVelocity(
      createVector2(-0.01, -0.01),
      createVector2(0.01, 0.01)
    ),
    initializeGlobalCompositeOperation('lighter')
  ],
  behaviors: [ 
    opacityOverTime(1, 0),
  ]
})

const particleSystem2 = createParticleSystem({
  renderer: canvasRenderer,
  emissionModule: createEmissionModule({
    rateOverTime: 100,
    shape: 'rectangle'
  }),
  position: createVector2(canvas.width / 6, canvas.height / 2),
  initializers: [
    initializeColor('rgba(0, 255, 100, 1)'),
    initializeGlobalCompositeOperation('lighter'),
    initializeLifeTime(1000, 1000),
    initializeTexture(particleImage),
    initializeSize(20, 20),
    initializeVelocity(
      createVector2(-0.01, -0.01),
      createVector2(0.01, 0.01)
    ),
  ],
  behaviors: [ 
    opacityOverTime(1, 0),
  ]
})

const particleSystem3 = createParticleSystem({
  renderer: canvasRenderer,
  emissionModule: createEmissionModule({
    rateOverTime: 100,
    shape: 'ring'
  }),
  position: createVector2(canvas.width / 2, canvas.height / 2),
  initializers: [
    initializeColor('rgba(238, 90, 50, 1)'),
    initializeGlobalCompositeOperation('lighter'),
    initializeLifeTime(1000, 1000),
    initializeTexture(particleImage),
    initializeSize(20, 20),
    initializeVelocity(
      createVector2(-0.01, -0.01),
      createVector2(0.01, 0.01)
    ),
  ],
  behaviors: [ 
    opacityOverTime(1, 0),
  ]
})

const particleSystem4 = createParticleSystem({
  renderer: canvasRenderer,
  emissionModule: createEmissionModule({
    rateOverTime: 100,
  }),
  position: createVector2(canvas.width * 0.75, canvas.height / 2),
  initializers: [
    initializeColor('cyan'),
    initializeGlobalCompositeOperation('lighter'),
    initializeLifeTime(1000, 1000),
    initializeTexture(particleImage),
    initializeSize(20, 20),
    initializeVelocity(
      createVector2(-0.01, -0.01),
      createVector2(0.01, 0.01)
    ),
  ],
  behaviors: [ 
    opacityOverTime(1, 0),
  ]
})

const scene = createScene2D(canvas)
scene.addParticleSystem(particleSystem1)
scene.addParticleSystem(particleSystem2)
scene.addParticleSystem(particleSystem3)
scene.addParticleSystem(particleSystem4)

document.addEventListener('mousemove', (e) => {
  mousePosition = createVector2(e.clientX, e.clientY)
})