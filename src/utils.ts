import { createVector2, Vector2 } from "./vector2"

export function noop () {/* noop */}

export function clamp (value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

export function getRandomFloatInRange (min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function getRandomIntegerBetweenRange (min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function getRandomPointAroundCircle (position: Vector2, radius: number) {
  const angle = Math.random() * Math.PI * 2
  const x = Math.cos(angle) * radius + position.x
  const y = Math.sin(angle) * radius + position.y
  return createVector2(x, y)
}

export function convertToRadians (degrees: number) {
  return degrees * Math.PI / 180
}

export function getRandomPointInsideCircle (position: Vector2, radius: number) {
  const angle = Math.random() * Math.PI * 2
  const radiusMultiplier = Math.random()
  const x = Math.cos(angle) * radius * radiusMultiplier + position.x
  const y = Math.sin(angle) * radius * radiusMultiplier + position.y
  return createVector2(x, y)
}

export function getRandomPointInsideRectangle (position: Vector2, width: number, height: number) {
  const x = Math.random() * width + position.x
  const y = Math.random() * height + position.y
  return createVector2(x, y)
}

export function getRandomColor () {
  const r = Math.random() * 255
  const g = Math.random() * 255
  const b = Math.random() * 255
  const a = Math.random()
  return `rgba(${r}, ${g}, ${b}, ${a})`
}