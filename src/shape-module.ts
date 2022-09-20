import { ParticleSystem } from "./particle-system"
import { getRandomPointAroundCircle, getRandomPointInsideCircle, getRandomPointInsideRectangle } from "./utils"
import { Vector2 } from "./vector2"

export type ShapeType = 'point' | 'circle' | 'rectangle' | 'ring'

type ShapeModuleConfig = {
  shape?: ShapeType
  radius?: number
  width?: number
  height?: number
}

export class ShapeModule {
  public shapeType: ShapeType
  public radius
  public width
  public height

  constructor (config: ShapeModuleConfig = {}) {
    this.shapeType = config.shape ?? 'point'
    this.radius = config.radius ?? 75
    this.width = config.width ?? 150
    this.height = config.height ?? 150
  }

  public getSpawnPosition (system: ParticleSystem): Vector2 {
    const systemPosition = system.position

    if(this.shapeType === 'circle') {
      return getRandomPointInsideCircle(systemPosition, this.radius)
    }

    if(this.shapeType === 'ring') {
      return getRandomPointAroundCircle(systemPosition, this.radius)
    }

    if(this.shapeType === 'rectangle') {
      return getRandomPointInsideRectangle(systemPosition.clone().subtract(new Vector2(this.width * 0.5, this.height * 0.5)), this.width, this.height)
    }

    return systemPosition
  }
}

export function createShapeModule (config: ShapeModuleConfig = {}) {
  return new ShapeModule(config)
}