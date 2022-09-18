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