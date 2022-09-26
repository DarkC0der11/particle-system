import { createEmissionModule, EmissionModule } from "./emission-module";
import { createParticle, Particle } from "./particle";
import { ParticleSystemRenderer } from "./types";
import { Vector2 } from "./vector2";
import { createObjectPool, ObjectPool } from "./object-pool";
import { ParticleBehavior } from "./behaviors/behavior";
import { ParticleInitializer } from "./initializers/initializer";
import { createShapeModule, ShapeModule } from "./shape-module";
import { createSubEmittersModule, SubEmittersModule } from "./sub-emitters";
import mitt from "mitt";

export type ParticleSystemEvents = {
  "particle-death": Particle
}

export type ParticleSystemConfig = {
  renderer: ParticleSystemRenderer
}

export class ParticleSystem {
  public renderer: ParticleSystemRenderer
  public position: Vector2 = Vector2.Zero
  public duration: number = 1000
  public isLooping: boolean = true

  private _objectPool: ObjectPool<Particle>
  private _particles: Particle[] = []
  private _initializers: Set<ParticleInitializer> = new Set()
  private _behaviors: Set<ParticleBehavior> = new Set()
  private _timestamp: number = 0
  private _hasEmitterUsedLastBurst: boolean = false

  public events = mitt<ParticleSystemEvents>()
  
  public emission: EmissionModule = createEmissionModule()
  public shape: ShapeModule = createShapeModule()
  public subEmitters: SubEmittersModule = createSubEmittersModule()

  public get particlesCount () {
    return this._particles.length
  }

  public get hasCompleted () {
    if(this.isLooping) {
      return false
    }

    const hasLiveParticles = this._particles.some(particle => !particle.isDead)
    return this._timestamp >= this.duration && !hasLiveParticles
  }

  private get _shouldEmitterTick () {
    if(this.isLooping) {
      return true
    }

    if(!this.emission.isUsingBursts && this._timestamp < this.duration) {
      return true
    }

    return this.emission.isUsingBursts && !this._hasEmitterUsedLastBurst
  }

  constructor ({renderer}: ParticleSystemConfig) {
    this._objectPool = createObjectPool({
      factory: () => createParticle(),
      reset: (particle) => {
        particle.velocity = Vector2.Zero
        particle.acceleration = Vector2.Zero
        particle.age = 0
        particle.angularVelocity = 0
      }
    })

    this.renderer = renderer

    this.emission.events.on('emit', (count) => this.emitParticles(count))
    this.emission.events.on('last-burst', () => {
      this._hasEmitterUsedLastBurst = true  
    })

    this.subEmitters.register(this)
  }

  public tick (deltaTime: number) {
    this._timestamp += deltaTime

    if(this._shouldEmitterTick) {
      this.emission.tick(deltaTime)
    }

    this._updateParticles(deltaTime)
    this.subEmitters.tick(deltaTime)
  }

  public reset () {
    this._timestamp = 0
    this._hasEmitterUsedLastBurst = false
    this._particles.forEach(particle => {
      this._objectPool.receive(particle)
    })
    this._particles = []
  }

  public addBehavior (behavior: ParticleBehavior) {
    this._behaviors.add(behavior)
  }

  public removeBehavior (behavior: ParticleBehavior) {
    this._behaviors.delete(behavior)
  }

  public addInitializer (initializer: ParticleInitializer) {
    this._initializers.add(initializer)
  }

  public removeInitializer (initializer: ParticleInitializer) {
    this._initializers.delete(initializer)
  }

  public allocateAndPrepareParticle () {
    const particle = this._objectPool.allocate()

    this._behaviors.forEach(behavior => {
      behavior.initialize(particle)
    })

    this._initializers.forEach(initializer => initializer.initialize(particle))
    this._particles.push(particle)
    return particle
  }

  public emitParticles (count: number) {
    for(let i = 0; i < count; i++) {
      const particle = this.allocateAndPrepareParticle()
      const position = this.shape.getSpawnPosition(this)
      particle.position.set(position)
    }
  }

  private _updateParticles (deltaTime: number) {
    this._particles.forEach((particle) => {
      if(particle.isDead) {
        this.events.emit('particle-death', particle)
        this._behaviors.forEach(behavior => behavior.reset(particle))
        this._objectPool.receive(particle)
        this._particles = this._particles.filter(p => p.id !== particle.id)
        return;
      }

      this._behaviors.forEach(behavior => behavior.applyBehavior(particle, deltaTime))
      particle.tick(deltaTime)

      this.renderer.renderParticle(particle)
    })
  }
}

export function createParticleSystem (config: ParticleSystemConfig) {
  return new ParticleSystem(config)
}