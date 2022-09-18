export function noop () {/* noop */}

export function clamp (value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

export function randomInRange (min: number, max: number) {
  return Math.random() * (max - min) + min
}