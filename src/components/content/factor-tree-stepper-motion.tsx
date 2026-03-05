import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { MathInline } from '@/components/math'
import { cn } from '@/lib/utils'

const PHASE_MIN = 0
const PHASE_MAX = 4

interface FactorTreeStepperMotionProps {
  className?: string
  onCompleteChange?: (isComplete: boolean) => void
}

function RevealSvg({
  show,
  children,
}: {
  show: boolean
  children: ReactNode
}) {
  return (
    <motion.g
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: show ? 'auto' : 'none' }}
    >
      {children}
    </motion.g>
  )
}

export function FactorTreeStepperMotion({
  className,
  onCompleteChange,
}: FactorTreeStepperMotionProps) {
  const [phase, setPhase] = useState(PHASE_MIN)

  const movePrev = () => setPhase((p) => Math.max(PHASE_MIN, p - 1))
  const moveNext = () => setPhase((p) => Math.min(PHASE_MAX, p + 1))

  const prevDisabled = phase === PHASE_MIN
  const nextDisabled = phase === PHASE_MAX

  useEffect(() => {
    onCompleteChange?.(phase === PHASE_MAX)
  }, [phase, onCompleteChange])

  return (
    <div className={cn('rounded-xl bg-[#fffef7] p-3', className)}>
      <div className="mb-2 flex justify-end">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={movePrev}
            disabled={prevDisabled}
            aria-label="Previous step"
            className={cn(
              'inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#b8c2d1] bg-white/95',
              'text-[20px] font-black leading-none text-[#344155] transition',
              'enabled:hover:bg-[#edf3ff] enabled:active:translate-y-px',
              'disabled:cursor-not-allowed disabled:opacity-40',
            )}
          >
            {'<'}
          </button>
          <button
            type="button"
            onClick={moveNext}
            disabled={nextDisabled}
            aria-label="Next step"
            className={cn(
              'inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#b8c2d1] bg-white/95',
              'text-[20px] font-black leading-none text-[#344155] transition',
              'enabled:hover:bg-[#edf3ff] enabled:active:translate-y-px',
              'disabled:cursor-not-allowed disabled:opacity-40',
            )}
          >
            {'>'}
          </button>
        </div>
      </div>

      <div className="rounded-lg bg-white px-2 py-2 shadow-[0_1px_6px_rgba(0,0,0,0.08)]">
        <svg viewBox="0 0 340 340" className="h-auto w-full">
          {/* Lines: 24 → 6, 24 → 4 */}
          <RevealSvg show={phase >= 1}>
            <g stroke="#2a2a2a" strokeWidth="4" strokeLinecap="round">
              <line x1="78" y1="168" x2="120" y2="98" />
              <line x1="78" y1="172" x2="120" y2="248" />
            </g>
          </RevealSvg>

          {/* Lines: 6 → 2, 6 → 3 */}
          <RevealSvg show={phase >= 2}>
            <g stroke="#2a2a2a" strokeWidth="4" strokeLinecap="round">
              <line x1="166" y1="95" x2="269" y2="45" />
              <line x1="166" y1="95" x2="269" y2="115" />
            </g>
          </RevealSvg>

          {/* Lines: 4 → 2, 4 → 2 */}
          <RevealSvg show={phase >= 3}>
            <g stroke="#2a2a2a" strokeWidth="4" strokeLinecap="round">
              <line x1="166" y1="248" x2="269" y2="220" />
              <line x1="166" y1="248" x2="269" y2="290" />
            </g>
          </RevealSvg>

          {/* Root: 24 (always visible) */}
          <text
            x="10"
            y="186"
            className="fill-[#2a2a2a] text-[52px] font-black"
          >
            24
          </text>

          {/* Intermediate: 6, 4 */}
          <RevealSvg show={phase >= 1}>
            <text x="124" y="111" className="fill-[#2a2a2a] text-[52px] font-black">
              6
            </text>
            <text x="124" y="262" className="fill-[#2a2a2a] text-[52px] font-black">
              4
            </text>
          </RevealSvg>

          {/* Leaf primes from 6: 2, 3 */}
          <RevealSvg show={phase >= 2}>
            <circle cx={300} cy={45} r={31} fill="#f8d3df" stroke="#ffffff" strokeWidth={4} />
            <text x={300} y={57} textAnchor="middle" className="fill-[#2a2a2a] text-[40px] font-black">
              2
            </text>
            <circle cx={300} cy={115} r={31} fill="#f8d3df" stroke="#ffffff" strokeWidth={4} />
            <text x={300} y={127} textAnchor="middle" className="fill-[#2a2a2a] text-[40px] font-black">
              3
            </text>
          </RevealSvg>

          {/* Leaf primes from 4: 2, 2 */}
          <RevealSvg show={phase >= 3}>
            <circle cx={300} cy={220} r={31} fill="#f8d3df" stroke="#ffffff" strokeWidth={4} />
            <text x={300} y={232} textAnchor="middle" className="fill-[#2a2a2a] text-[40px] font-black">
              2
            </text>
            <circle cx={300} cy={290} r={31} fill="#f8d3df" stroke="#ffffff" strokeWidth={4} />
            <text x={300} y={302} textAnchor="middle" className="fill-[#2a2a2a] text-[40px] font-black">
              2
            </text>
          </RevealSvg>
        </svg>
      </div>

      <AnimatePresence>
        {phase >= 3 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 text-center text-sm font-bold text-[#e25555]"
          >
            소수가 될 때까지 나누기!
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {phase === PHASE_MAX ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 rounded-lg bg-white px-3 py-2"
          >
            <div className="mb-1 text-center text-[13px] font-bold text-[#445063]">
              가지 끝의 소수들의 곱이 소인수분해한 것
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[22px] font-black leading-none text-[#232323]">
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.22, delay: 0.02 }}
                className="block basis-full text-center text-[#6ea9d6]"
              >
                <ArrowDown size={24} strokeWidth={3} className="inline-block" />
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.24, delay: 0.1 }}
              >
                <MathInline tex={'24=2\\times3\\times2\\times2'} katexFontSize="1.25em" />
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.24, delay: 0.24 }}
                className="block basis-full pl-8 whitespace-nowrap"
              >
                <MathInline tex={'=2^3\\times3'} katexFontSize="1.25em" />
              </motion.span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
