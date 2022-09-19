import { noop } from "./utils"

export type ObjectPoolConfig<T> = {
  factory: () => T
  maxSize?: number
  reset?: (object: T) => void
  shouldPreallocate?: boolean
}

export class ObjectPool<T> {
  private _pool: T[] = []
  private _factory: () => T
  private _reset: (object: T) => void
  private _maxSize: number
  private _shouldPreallocate: ObjectPoolConfig<T>['shouldPreallocate']

  constructor (config: ObjectPoolConfig<T>) {
    this._factory = config.factory
    this._reset = config.reset ?? noop
    this._maxSize = config.maxSize ?? 100
    this._shouldPreallocate = config.shouldPreallocate ?? true

    if(this._shouldPreallocate) {
      this._preallocate()
    }
  }

  private _preallocate () {
    for(let i = 0; i < this._maxSize; i++) {
      this._pool.push(this._factory())
    }
  }

  public allocate (): T {
    if (this._pool.length > 0) {
      const object = this._pool.pop()!
      this._reset(object)
      return object
    }

    return this._factory()
  }

  public receive (obj: T) {
    this._pool.push(obj)
  }
}

export function createObjectPool<T> (config: ObjectPoolConfig<T>) {
  return new ObjectPool(config)
}