import { ParticleSystem } from "./particle-system"

export class Scene2D {
  private _canvas: HTMLCanvasElement
  private _context: CanvasRenderingContext2D
  private _particleSystems: ParticleSystem[] = []
  private _previousTimestamp = 0

  constructor (canvas: HTMLCanvasElement) {
    this._canvas = canvas
    this._context = canvas.getContext('2d')!

    this._tick = this._tick.bind(this)

    this._tick(0)

    this._handleDocumentVisibilityChange = this._handleDocumentVisibilityChange.bind(this)

    document.addEventListener('visibilitychange', this._handleDocumentVisibilityChange)
  }

  public destroy () {
    document.removeEventListener('visibilitychange', this._handleDocumentVisibilityChange)
  }

  private _handleDocumentVisibilityChange () {
    if(document.hidden) return;
    this._previousTimestamp = performance.now()
  }

  public addParticleSystem (particleSystem: ParticleSystem) {
    this._particleSystems.push(particleSystem)
  }
  
  private _tick (timestamp: number) {
    const deltaTime = timestamp - this._previousTimestamp
    
    this._context.fillStyle = '#000'
    this._context.fillRect(0, 0, this._canvas.width, this._canvas.height)

    this._particleSystems.forEach(particleSystem => particleSystem.tick(deltaTime))

    this._previousTimestamp = timestamp

    requestAnimationFrame(this._tick)
  }
}

export function createScene2D (canvas: HTMLCanvasElement) {
  return new Scene2D(canvas)
}