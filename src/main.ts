import {createParticleSystem} from './particle-system'
import {createCanvasRenderer} from './canvas-renderer'
import { createVector2 } from './vector2'
import { scaleOverTime, limitVelocity, followTarget } from './behaviours'
import { initializeColor, initializeLifeTime, initializeVelocity } from './initializers'
import {createScene2D} from './scene'
import { createEmissionModule } from './emission-module'

const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!
const context = canvas.getContext('2d')!

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const canvasHalfWidth = canvas.width / 2
const canvasHalfHeight = canvas.height / 2

let mousePosition = createVector2(0, 0)

const canvasRenderer = createCanvasRenderer(context)

const particleSystem1 = createParticleSystem({
  renderer: canvasRenderer,
  emissionModule: createEmissionModule({
    rateOverTime: 1000,
    shape: 'ring',
    radius: 300
  }),
  position: createVector2(canvas.width / 2, canvas.height / 2),
  initializers: [
    initializeColor('rgba(200, 3, 105, 0.25)'),
    initializeLifeTime(3000, 6000),
    initializeVelocity(
      createVector2(0, 0),
      createVector2(0, 0)
    ),
  ],
  behaviors: [ 
    scaleOverTime(0.25, 0),
    limitVelocity(20),
    // followTarget({
    //   getTargetPosition: () => mousePosition,
    //   acceleration: 0.1
    // })
  ]
})

const scene = createScene2D(canvas)
scene.addParticleSystem(particleSystem1)

// document.addEventListener('mousemove', (e) => {
//   mousePosition = createVector2(e.clientX, e.clientY)
// })