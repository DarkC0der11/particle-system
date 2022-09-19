import { noop } from "./utils"

export type ObjectPoolConfig<T> = {
  factory: () => T
  reset?: (object: T) => void
}

export class ObjectPool<T> {
  private _pool: T[] = []
  private _factory: () => T
  private _reset: (object: T) => void

  constructor (config: ObjectPoolConfig<T>) {
    this._factory = config.factory
    this._reset = config.reset ?? noop
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