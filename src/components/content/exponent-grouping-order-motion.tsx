import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type Phase = 0 | 1 | 2 | 3 | 4 | 5
type Direction = 1 | -1

const PHASE_MIN = 0
const PHASE_MAX = 5
const LOCK_MS = 280

interface ExponentGroupingOrderMotionProps {
  className?: string
}

export function ExponentGroupingOrderMotion({
  className,
}: ExponentGroupingOrderMotionProps) {
  const [phase, setPhase] = useState<Phase>(0)
  const [direction, setDirection] = useState<Direction>(1)
  const [isAnimating, setIsAnimating] = useState(false)
  const lockTimerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (lockTimerRef.current !== null) {
        window.clearTimeout(lockTimerRef.current)
      }
    }
  }, [])

  const lockTemporarily = () => {
    if (lockTimerRef.current !== null) {
      window.clearTimeout(lockTimerRef.current)
    }
    setIsAnimating(true)
    lockTimerRef.current = window.setTimeout(() => {
      setIsAnimating(false)
      lockTimerRef.current = null
    }, LOCK_MS)
  }

  const movePrev = () => {
    if (isAnimating || phase <= PHASE_MIN) return
    setDirection(-1)
    setPhase((prev) => (prev - 1) as Phase)
    lockTemporarily()
  }

  const moveNext = () => {
    if (isAnimating || phase >= PHASE_MAX) return
    setDirection(1)
    setPhase((prev) => (prev + 1) as Phase)
    lockTemporarily()
  }

  const prevDisabled = isAnimating || phase === PHASE_MIN
  const nextDisabled = isAnimating || phase === PHASE_MAX
  const phaseViewKey = phase <= 1
    ? 'raw'
    : phase <= 3
      ? 'grouped-five'
      : phase === 4
        ? 'grouped-three'
        : 'swapped'

  return (
    <div
      className={cn(
        'rounded-xl border-2 border-[#d9dee7] bg-[#fbfcff] px-2 sm:px-3 py-3',
        className,
      )}
    >
      <div className="overflow-x-hidden">
        <div className="mx-auto w-fit max-w-full whitespace-nowrap pt-[0.22em] text-[clamp(18px,6.1vw,28px)] leading-[1.06] font-black text-[#2d2e35]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={phaseViewKey}
              className="whitespace-nowrap"
              initial={{
                opacity: 0,
                x: direction === 1 ? 20 : -20,
                scale: 0.98,
              }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{
                opacity: 0,
                x: direction === 1 ? -20 : 20,
                scale: 0.98,
              }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <PhaseEquation phase={phase} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-3 flex justify-end gap-2">
        <button
          type="button"
          onClick={movePrev}
          disabled={prevDisabled}
          aria-label="Previous step"
          className={cn(
            'inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#b8c2d1] bg-white',
            'text-[20px] leading-none font-black text-[#344155] transition',
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
            'inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#b8c2d1] bg-white',
            'text-[20px] leading-none font-black text-[#344155] transition',
            'enabled:hover:bg-[#edf3ff] enabled:active:translate-y-px',
            'disabled:cursor-not-allowed disabled:opacity-40',
          )}
        >
          {'>'}
        </button>
      </div>
    </div>
  )
}

function PhaseEquation({ phase }: { phase: Phase }) {
  if (phase === 0 || phase === 1) {
    const numbers = ['5', '3', '5', '3', '5', '5'] as const

    return (
      <>
        {numbers.map((value, index) => (
          <span key={`${value}-${index}`} className="inline-flex items-baseline">
            <HighlighterToken
              value={value}
              color={value === '5' ? 'pink' : 'green'}
              active={phase === 1 && value === '5'}
            />
            {index < numbers.length - 1 && <TimesSymbol />}
          </span>
        ))}
      </>
    )
  }

  if (phase === 2 || phase === 3) {
    return (
      <>
        <EqualsSymbol />
        <PowerTerm base="5" exponent="4" />
        <TimesSymbol />
        <HighlighterToken value="3" color="green" active={phase === 3} />
        <TimesSymbol />
        <HighlighterToken value="3" color="green" active={phase === 3} />
      </>
    )
  }

  if (phase === 4) {
    return (
      <>
        <EqualsSymbol />
        <PowerTerm base="5" exponent="4" />
        <TimesSymbol />
        <PowerTerm base="3" exponent="2" />
      </>
    )
  }

  return (
    <>
      <EqualsSymbol />
      <PowerTerm base="3" exponent="2" />
      <TimesSymbol />
      <PowerTerm base="5" exponent="4" />
    </>
  )
}

function HighlighterToken({
  value,
  color,
  active,
}: {
  value: string
  color: 'pink' | 'green'
  active: boolean
}) {
  const bgClass = color === 'pink' ? 'bg-[#f7bfd6]' : 'bg-[#c9e5a6]'

  return (
    <span className="relative inline-flex items-center justify-center px-[0.12em] py-[0.04em]">
      <AnimatePresence>
        {active && (
          <motion.span
            key={`marker-${color}-${value}`}
            className={cn(
              'absolute left-[-0.26em] right-[-0.26em] top-[0.04em] h-[0.94em] rounded-[0.32em] opacity-95',
              bgClass,
            )}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.9 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'left center' }}
          />
        )}
      </AnimatePresence>
      <span className="relative z-10">{value}</span>
    </span>
  )
}

function PowerTerm({
  base,
  exponent,
}: {
  base: string
  exponent: string
}) {
  return (
    <span className="inline-flex items-start leading-none">
      <span className="leading-none">{base}</span>
      <sup className="relative -top-[0.38em] ml-[0.04em] text-[0.5em] leading-none">
        {exponent}
      </sup>
    </span>
  )
}

function TimesSymbol() {
  // Use a Unicode escape to avoid mojibake when editing on mixed Windows encodings.
  return <span className="mx-1 sm:mx-1.5 inline-block align-middle">{'\u00D7'}</span>
}

function EqualsSymbol() {
  return <span className="mr-1.5 inline-block align-middle">=</span>
}

