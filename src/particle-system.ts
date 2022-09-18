import { EmissionModule } from "./emission-module";
import mitt from 'mitt'
import { Particle } from "./particle";
import { IParticleSystemRenderer } from "./types";
import { Vector2 } from "./vector2";

type ParticleBehavior = (particle: Particle) => void
type ParticleInitializer = (particle: Particle) => void

type ParticleSystemConfig = {
  renderer: IParticleSystemRenderer;
  position?: Vector2;
  emissionModule?: EmissionModule;
  behaviors?: ParticleBehavior[]
  initializers?: ParticleInitializer[]
}

export type ParticleSystemEvents = {
  'tick': number
}

export class ParticleSystem {
  private _renderer: IParticleSystemRenderer
  private _position: Vector2
  private _particles: Particle[] = []
  private _behaviors: Set<ParticleBehavior>
  private _initializers: Set<ParticleInitializer>
  private _events = mitt<ParticleSystemEvents>()

  constructor (config: ParticleSystemConfig) {
    this._renderer = config.renderer
    this._position = config.position ?? Vector2.Zero
    this._behaviors = new Set(config.behaviors ?? [])
    this._initializers = new Set(config.initializers ?? [])

    if(config.emissionModule) {
      config.emissionModule.register(this)
    }
  }

  public setPosition (position: Vector2) {
    this._position = position
  }

  public get position () {
    return this._position
  }

  public onTick (callback: (deltaTime: number) => void) {
    this._events.on('tick', callback)
  }

  public offTick (callback: (deltaTime: number) => void) {
    this._events.off('tick', callback)
  }

  public tick (deltaTime: number) {
    this._updateParticles(deltaTime)
    this._events.emit('tick', deltaTime)
  }

  public emitParticle (position: Vector2 = this._position) {
    const particle = this._allocateParticle()
    particle.position.set(position)
    this._initializers.forEach(initializer => initializer(particle))
  }

  public addBehavior (behavior: ParticleBehavior) {
    this._behaviors.add(behavior)
  }

  public removeBehavior (behavior: ParticleBehavior) {
    this._behaviors.delete(behavior)
  }

  public getParticlesCount () {
    return this._particles.length
  }

  private _allocateParticle () {
    const particle = new Particle()
    this._particles.push(particle)
    return particle
  }

  private _updateParticles (deltaTime: number) {
    this._particles.forEach((particle) => {
      particle.age += deltaTime

      if(particle.isDead()) {
        this._particles = this._particles.filter(p => p.id !== particle.id)
        return;
      }

      if(this._behaviors) {
        this._behaviors.forEach(behavior => behavior(particle))
      }

      particle.tick()
      this._renderer.renderParticle(particle)
    })
  }
}

export function createParticleSystem (config: ParticleSystemConfig) {
  return new ParticleSystem(config)
}