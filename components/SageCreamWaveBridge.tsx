'use client'

import { useId, useMemo, useRef } from 'react'
import { useGSAP } from '@/hooks/useGSAP'

/** Section fills — wavy boundary lets each bleed into the other horizontally */
const SAGE = '#c4d6b4'
const CREAM = '#F5F0EB'
const SAGE_BAR = '#a8bf98'
const CREAM_BAR = '#ede6df'

const VB_W = 1440
const VB_H = 200
const CENTER_Y = 118
const MAX_HALF = 68

const BOUNDARY_STEP = 5
/** How far the split wanders above/below center (green dips down, cream reaches up). */
const WOBBLE_A1 = 16
const WOBBLE_A2 = 9

function boundaryY(x: number, wobblePhase: number) {
  const wobble =
    WOBBLE_A1 * Math.sin(x * 0.0041 + wobblePhase) +
    WOBBLE_A2 * Math.sin(x * 0.0115 - wobblePhase * 1.25)
  const y = CENTER_Y + wobble
  return Math.min(VB_H - 20, Math.max(34, y))
}

function buildWavyBackground(wobblePhase: number) {
  const ys: number[] = []
  for (let x = 0; x <= VB_W; x += BOUNDARY_STEP) {
    ys.push(boundaryY(x, wobblePhase))
  }

  let sage = `M 0 0 L ${VB_W} 0 L ${VB_W} ${ys[ys.length - 1]}`
  for (let i = ys.length - 2; i >= 0; i--) {
    sage += ` L ${i * BOUNDARY_STEP} ${ys[i]}`
  }
  sage += ' L 0 0 Z'

  let cream = `M 0 ${ys[0]}`
  for (let i = 1; i < ys.length; i++) {
    cream += ` L ${i * BOUNDARY_STEP} ${ys[i]}`
  }
  cream += ` L ${VB_W} ${ys[ys.length - 1]} L ${VB_W} ${VB_H} L 0 ${VB_H} Z`

  return { sage, cream }
}

function barHalfHeight(i: number, n: number, phase: number, gain: number) {
  const a = Math.sin(i * 0.41 + phase)
  const b = Math.sin(i * 0.095 + phase * 0.52)
  const c = Math.sin(i * 1.92 + phase * 1.08)
  const d = Math.sin(i * 4.1 + phase * 1.9) * 0.2
  let e = Math.abs(a * 0.52 + b * 0.48) + c * c * 0.38 + d
  e = Math.min(1, Math.max(0.16, e))
  return MAX_HALF * gain * (0.26 + 0.74 * e)
}

function layoutBars(
  rects: NodeListOf<SVGRectElement> | SVGRectElement[],
  n: number,
  phase: number,
  gain: number,
  barW: number,
  step: number
) {
  for (let i = 0; i < n; i++) {
    const h = barHalfHeight(i, n, phase, gain)
    const x = i * step + (step - barW) / 2
    const el = rects[i]
    const rx = Math.min(barW * 0.5, 4)
    el.setAttribute('x', String(x))
    el.setAttribute('y', String(CENTER_Y - h))
    el.setAttribute('width', String(barW))
    el.setAttribute('height', String(h * 2))
    el.setAttribute('rx', String(rx))
    el.setAttribute('ry', String(rx))
  }
}

/**
 * Sage ↔ cream with a wavy interleaved boundary + DJ-style meter bars.
 */
export default function SageCreamWaveBridge() {
  const gradId = useId().replace(/:/g, '')
  const containerRef = useRef<HTMLDivElement>(null)
  const sageBgRef = useRef<SVGPathElement>(null)
  const creamBgRef = useRef<SVGPathElement>(null)
  const barsGroupRef = useRef<SVGGElement>(null)

  const barCount = 88
  const step = VB_W / barCount
  const barW = step * 0.84

  const initialBg = useMemo(() => buildWavyBackground(0), [])

  const initialLayout = useMemo(() => {
    return Array.from({ length: barCount }, (_, i) => {
      const h = barHalfHeight(i, barCount, 0, 1)
      const x = i * step + (step - barW) / 2
      const rx = Math.min(barW * 0.5, 4)
      return { x, y: CENTER_Y - h, w: barW, h2: h * 2, rx }
    })
  }, [barCount, step, barW])

  useGSAP((gsap, ScrollTrigger) => {
    return gsap.context(() => {
      const section = containerRef.current?.closest('section')
      const group = barsGroupRef.current
      const sageEl = sageBgRef.current
      const creamEl = creamBgRef.current
      if (!section || !group || !sageEl || !creamEl) return

      const rects = group.querySelectorAll<SVGRectElement>('rect')
      if (rects.length !== barCount) return

      const state = { phase: 0, gain: 1, wobble: 0 }
      layoutBars(rects, barCount, state.phase, state.gain, barW, step)
      const applyBg = () => {
        const { sage, cream } = buildWavyBackground(state.wobble)
        sageEl.setAttribute('d', sage)
        creamEl.setAttribute('d', cream)
      }
      applyBg()

      const sync = () => {
        layoutBars(rects, barCount, state.phase, state.gain, barW, step)
        applyBg()
      }

      gsap.to(state, {
        phase: Math.PI * 2.35,
        gain: 0.88,
        wobble: Math.PI * 1.85,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'bottom 92%',
          end: 'bottom 8%',
          scrub: 1.15,
        },
        onUpdate: sync,
      })

      ScrollTrigger.refresh()
    }, containerRef)
  }, [barCount, barW, step])

  return (
    <div
      ref={containerRef}
      className="relative left-1/2 w-screen max-w-none -translate-x-1/2 pointer-events-none select-none -mb-px h-[clamp(11rem,32vw,26rem)] sm:h-[clamp(12rem,28vw,28rem)]"
      aria-hidden
    >
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="none"
        className="block h-full w-full"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={SAGE_BAR} />
            <stop offset="38%" stopColor={SAGE_BAR} />
            <stop offset="62%" stopColor={CREAM_BAR} />
            <stop offset="100%" stopColor={CREAM_BAR} />
          </linearGradient>
        </defs>
        <path
          ref={sageBgRef}
          d={initialBg.sage}
          fill={SAGE}
          className="will-change-[d]"
        />
        <path
          ref={creamBgRef}
          d={initialBg.cream}
          fill={CREAM}
          className="will-change-[d]"
        />
        <g ref={barsGroupRef}>
          {initialLayout.map((b, i) => (
            <rect
              key={i}
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h2}
              rx={b.rx}
              ry={b.rx}
              fill={`url(#${gradId})`}
              stroke="rgb(56 68 40 / 0.11)"
              strokeWidth={1.25}
              vectorEffect="nonScalingStroke"
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
