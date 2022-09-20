export class Vector2 {
  public x: number = 0
  public y: number = 0

  public static get Zero () {
    return new Vector2(0, 0)
  }

  public static get One () {
    return new Vector2(1, 1)
  }

  public static get Up () {
    return new Vector2(0, -1)
  }

  public static get Right () {
    return new Vector2(1, 0)
  }

  public static get Down () {
    return new Vector2(0, 1)
  }

  public static get Left () {
    return new Vector2(0, -1)
  }

  public static Random () {
    return new Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1)
  }

  public static RandomBetween (min: Vector2, max: Vector2) {
    return new Vector2(
      Math.random() * (max.x - min.x) + min.x,
      Math.random() * (max.y - min.y) + min.y
    )
  }

  constructor (x: number, y: number) {
    this.x = x
    this.y = y
  }

  public set (vector: Vector2) {
    this.x = vector.x
    this.y = vector.y
    return this
  }

  public getLength () {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  public add (vector: Vector2) {
    this.x += vector.x
    this.y += vector.y
    return this
  }

  public subtract (vector: Vector2) {
    this.x -= vector.x
    this.y -= vector.y
    return this
  }

  public multiply (vector: Vector2) {
    this.x *= vector.x
    this.y *= vector.y
    return this
  }

  public scale (scale: number) {
    this.x *= scale
    this.y *= scale
    return this
  }

  public divide (vector: Vector2) {
    this.x /= vector.x
    this.y /= vector.y
    return this
  }

  public distance (vector: Vector2) {
    return Math.sqrt(Math.pow(this.x - vector.x, 2) + Math.pow(this.y - vector.y, 2))
  }

  public normalize () {
    const length = this.getLength()
    this.x /= length
    this.y /= length
    return this
  }

  public clone () {
    return new Vector2(this.x, this.y)
  }
}

export function createVector2 (x: number, y: number): Vector2 {
  return new Vector2(x, y)
}