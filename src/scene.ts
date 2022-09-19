import { ParticleSystem } from "./particle-system"

export class Scene2D {
  private _canvas: HTMLCanvasElement
  private _context: CanvasRenderingContext2D
  private _particleSystems: ParticleSystem[] = []
  private _previousElapsedTime = 0

  constructor (canvas: HTMLCanvasElement) {
    this._canvas = canvas
    this._context = canvas.getContext('2d')!

    this._tick = this._tick.bind(this)

    this._tick(0)
  }

  public addParticleSystem (particleSystem: ParticleSystem) {
    this._particleSystems.push(particleSystem)
  }
  
  private _tick (elapsedTime: number) {
    console.log('kek')

    const deltaTime = elapsedTime - this._previousElapsedTime

    this._context.fillStyle = '#000'
    this._context.fillRect(0, 0, this._canvas.width, this._canvas.height)

    this._particleSystems.forEach(particleSystem => particleSystem.tick(deltaTime))

    this._previousElapsedTime = elapsedTime

    requestAnimationFrame(this._tick)
  }
}

export function createScene2D (canvas: HTMLCanvasElement) {
  return new Scene2D(canvas)
}