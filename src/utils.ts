import { createVector2, Vector2 } from "./vector2"

export function noop () {/* noop */}

export function clamp (value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

export function randomInRange (min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function getRandomPointAroundCircle (position: Vector2, radius: number) {
  const angle = Math.random() * Math.PI * 2
  const x = Math.cos(angle) * radius + position.x
  const y = Math.sin(angle) * radius + position.y
  return createVector2(x, y)
}

export function getRandomPointInsideCircle (position: Vector2, radius: number) {
  const angle = Math.random() * Math.PI * 2
  const radiusMultiplier = Math.random()
  const x = Math.cos(angle) * radius * radiusMultiplier + position.x
  const y = Math.sin(angle) * radius * radiusMultiplier + position.y
  return createVector2(x, y)
}