import { Particle } from "./particle"
import { ParticleSystem } from "./particle-system"

export type SubEmitterTriggerCondition = 'death' | 'birth'

export type SubEmitter = {
  triggerCondition: SubEmitterTriggerCondition
  particleSystemFactory?: () => ParticleSystem
}

export class SubEmittersModule {
  private _parent!: ParticleSystem
  public subEmitters: SubEmitter[] = []
  private _subParticleSystems: ParticleSystem[] = []

  constructor () {
    this._handleParticleSystemParticleDeath = this._handleParticleSystemParticleDeath.bind(this)
  }

  private _handleParticleSystemParticleDeath (particle: Particle) {
    const subEmitter = this.subEmitters.find((subEmitter) => {
      return subEmitter.triggerCondition === 'death'
    })

    if(!subEmitter) {
      return
    }

    if(subEmitter.particleSystemFactory) {
      const subParticleSystem = subEmitter.particleSystemFactory()

      if(!subParticleSystem.emission.isUsingBursts) {
        throw new Error ('Sub-emitter particle system must use bursts')
      }

      subParticleSystem.position.set(particle.position)
      this._subParticleSystems.push(subParticleSystem)
    } else {
      const newParticle = this._parent.allocateAndPrepareParticle()
      newParticle.position.set(particle.position)
    }
  }

  public register (particleSystem: ParticleSystem) {
    particleSystem.events.on('particle-death', this._handleParticleSystemParticleDeath)

    this._parent = particleSystem
  }

  public unregister (particleSystem: ParticleSystem) {
    particleSystem.events.off('particle-death', this._handleParticleSystemParticleDeath)
  }

  public tick (delta: number) {
    this._subParticleSystems.forEach((subParticleSystem) => {
      subParticleSystem.tick(delta)

      if(subParticleSystem.hasCompleted) {
        this._subParticleSystems = this._subParticleSystems.filter((s) => s !== subParticleSystem)
      }
    })
  }
}

export function createSubEmittersModule (): SubEmittersModule {
  return new SubEmittersModule()
}