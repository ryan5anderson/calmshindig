const DEFAULT_SEGMENTS = 12

export type WaveRevealOptions = {
  segments?: number
  amplitude?: number
  phase?: number
}

export function waveRevealPolygon(
  progress: number,
  options: WaveRevealOptions = {}
): string {
  const segments = options.segments ?? DEFAULT_SEGMENTS
  const amplitude = options.amplitude ?? 3.2
  const phase = options.phase ?? 0
  const p = Math.min(1, Math.max(0, progress))

  const baseY = 100 - p * 100
  const waveEnvelope = p * (1 - p) * 4
  const wobbleScale = amplitude * Math.max(0, Math.min(1, waveEnvelope))

  const pts: string[] = ['0% 0%', '100% 0%']

  for (let i = segments; i >= 0; i--) {
    const t = i / segments
    const x = `${(t * 100).toFixed(2)}%`
    const wobble =
      wobbleScale * Math.sin(t * Math.PI * 2 + phase + p * 1.15 * Math.PI)
    const y = Math.min(100, Math.max(0, baseY + wobble))
    pts.push(`${x} ${y.toFixed(2)}%`)
  }

  return `polygon(${pts.join(', ')})`
}
