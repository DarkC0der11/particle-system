import {createParticleSystem} from './particle-system'
import {createCanvasRenderer} from './canvas-renderer'
import { createVector2 } from './vector2'
import { scaleOverTime, limitVelocity, opacityOverTime, followTarget, force, createDecelerationBehavior } from './behaviours'
import { initializeColor, initializeGlobalCompositeOperation, initializeLifeTime, initializeSize, initializeTexture, initializeVelocity } from './initializers'
import {createScene2D} from './scene'
import { createEmissionModule } from './emission-module'
import sparkParticleImage from './assets/cool-particle.png'
import glowParticle from './assets/particle.png'
import { getRandomColor, getRandomFloatInRange, getRandomIntegerBetweenRange } from './utils'

const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!
const context = canvas.getContext('2d')!

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let mousePosition = createVector2(0, 0)

const canvasRenderer = createCanvasRenderer(context)

const followMouse = followTarget({
  target: () => mousePosition,
  acceleration: 0.01
})

const standardLimitVelocity = limitVelocity(10)
const decelerationBehavior = createDecelerationBehavior(0.99)

const randomColors = Array.from({length: 20}).map(() => getRandomColor())

const particleSystem1 = createParticleSystem({
  renderer: canvasRenderer,
  emissionModule: createEmissionModule({
    rateOverTime: 300
  }),
  position: createVector2(0, 0),
  initializers: [
    initializeColor(() => randomColors[getRandomIntegerBetweenRange(0, randomColors.length)]),
    initializeLifeTime(1000, 3000),
    initializeTexture(glowParticle),
    initializeSize(30, 40),
    initializeVelocity(
      createVector2(-0.1, -0.1),
      createVector2(0.1, 0.1),
    ),
    initializeGlobalCompositeOperation('lighter')
  ],
  behaviors: [ 
    opacityOverTime(1, 0),
    scaleOverTime(2, 0),
    limitVelocity(1),
    decelerationBehavior
  ]
})

const particleSystem2 = createParticleSystem({
  renderer: canvasRenderer,
  emissionModule: createEmissionModule({
    rateOverTime: 500,
    shape: 'rectangle'
  }),
  position: createVector2(canvas.width / 6, canvas.height / 2),
  initializers: [
    initializeColor(() => 'rgba(0, 255, 100, 1)'),
    initializeGlobalCompositeOperation('lighter'),
    initializeLifeTime(1000, 2000),
    initializeTexture(sparkParticleImage),
    initializeSize(20, 30),
    initializeVelocity(
      createVector2(-0.01, -0.01),
      createVector2(0.01, 0.01)
    ),
  ],
  behaviors: [ 
    opacityOverTime(1, 0),
    force(createVector2(-0.005, 0)),
  ]
})

const particleSystem3 = createParticleSystem({
  renderer: canvasRenderer,
  emissionModule: createEmissionModule({
    rateOverTime: 500,
    shape: 'ring',
    radius: 100
  }),
  position: createVector2(canvas.width / 2, canvas.height / 2),
  initializers: [
    initializeColor(() => 'rgba(238, 90, 50, 1)'),
    initializeGlobalCompositeOperation('lighter'),
    initializeLifeTime(1000, 2000),
    initializeTexture(sparkParticleImage),
    initializeSize(20, 80),
    initializeVelocity(
      createVector2(-0.01, -0.01),
      createVector2(0.01, 0.01)
    ),
  ],
  behaviors: [ 
    opacityOverTime(1, 0),
    force(createVector2(0, -0.0005)),
    scaleOverTime(1, 0),
  ]
})

const particleSystem4 = createParticleSystem({
  renderer: canvasRenderer,
  emissionModule: createEmissionModule({
    rateOverTime: 500,
  }),
  position: createVector2(canvas.width * 0.7, canvas.height / 2),
  initializers: [
    initializeColor(() => 'rgba(30, 80, 180, 1)'),
    initializeGlobalCompositeOperation('lighter'),
    initializeLifeTime(1000, 2000),
    initializeTexture(glowParticle),
    initializeSize(20, 80),
    initializeVelocity(
      createVector2(-0.01, -0.01),
      createVector2(0.01, 0.01)
    ),
  ],
  behaviors: [ 
    opacityOverTime(1, 0),
    force(createVector2(0, 0.01)),
  ]
})

const scene = createScene2D(canvas)
scene.addParticleSystem(particleSystem1)
scene.addParticleSystem(particleSystem2)
scene.addParticleSystem(particleSystem3)
scene.addParticleSystem(particleSystem4)

document.addEventListener('mousemove', (e) => {
  mousePosition = createVector2(e.clientX, e.clientY)
  particleSystem1.setPosition(mousePosition)
})

document.addEventListener('mousedown', () => {
  [particleSystem1, particleSystem2, particleSystem3, particleSystem4].forEach(particleSystem => {
    particleSystem.addBehavior(followMouse)
    particleSystem.addBehavior(standardLimitVelocity)
    particleSystem.removeBehavior(decelerationBehavior)
  })
})

document.addEventListener('mouseup', () => {
  [particleSystem1, particleSystem2, particleSystem3, particleSystem4].forEach(particleSystem => {
    particleSystem.removeBehavior(followMouse)
    particleSystem.addBehavior(standardLimitVelocity)
    particleSystem.addBehavior(decelerationBehavior)
  })
})