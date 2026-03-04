import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type Phase = 0 | 1 | 2 | 3 | 4 | 5
type Direction = 1 | -1

const PHASE_MIN = 0
const PHASE_MAX = 5
const LOCK_MS = 280
const FIVE_MERGE_LOCK_MS = 1180
const THREE_MERGE_LOCK_MS = 980
const SWAP_LOCK_MS = 620
const FIVE_MERGE_ANIM_MS = 1120
const THREE_MERGE_ANIM_MS = 930

interface ExponentGroupingOrderMotionProps {
  className?: string
}

export function ExponentGroupingOrderMotion({
  className,
}: ExponentGroupingOrderMotionProps) {
  const [phase, setPhase] = useState<Phase>(0)
  const [direction, setDirection] = useState<Direction>(1)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showFiveMergeMotion, setShowFiveMergeMotion] = useState(false)
  const [showThreeMergeMotion, setShowThreeMergeMotion] = useState(false)
  const lockTimerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (lockTimerRef.current !== null) {
        window.clearTimeout(lockTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (phase === 2 && direction === 1) {
      setShowFiveMergeMotion(true)
      const timerId = window.setTimeout(() => {
        setShowFiveMergeMotion(false)
      }, FIVE_MERGE_ANIM_MS)

      return () => {
        window.clearTimeout(timerId)
      }
    }

    setShowFiveMergeMotion(false)
  }, [phase, direction])

  useEffect(() => {
    if (phase === 4 && direction === 1) {
      setShowThreeMergeMotion(true)
      const timerId = window.setTimeout(() => {
        setShowThreeMergeMotion(false)
      }, THREE_MERGE_ANIM_MS)

      return () => {
        window.clearTimeout(timerId)
      }
    }

    setShowThreeMergeMotion(false)
  }, [phase, direction])

  const lockTemporarily = (ms = LOCK_MS) => {
    if (lockTimerRef.current !== null) {
      window.clearTimeout(lockTimerRef.current)
    }
    setIsAnimating(true)
    lockTimerRef.current = window.setTimeout(() => {
      setIsAnimating(false)
      lockTimerRef.current = null
    }, ms)
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
    lockTemporarily(
      phase === 1
        ? FIVE_MERGE_LOCK_MS
        : phase === 3
          ? THREE_MERGE_LOCK_MS
          : phase === 4
            ? SWAP_LOCK_MS
            : LOCK_MS,
    )
  }

  const prevDisabled = isAnimating || phase === PHASE_MIN
  const nextDisabled = isAnimating || phase === PHASE_MAX
  const phaseViewKey = 'equation'

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
              <PhaseEquation
                phase={phase}
                showFiveMergeMotion={showFiveMergeMotion}
                showThreeMergeMotion={showThreeMergeMotion}
              />
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

function PhaseEquation({
  phase,
  showFiveMergeMotion,
  showThreeMergeMotion,
}: {
  phase: Phase
  showFiveMergeMotion: boolean
  showThreeMergeMotion: boolean
}) {
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
    if (phase === 2 && showFiveMergeMotion) {
      return <FiveToPowerMergeMotion />
    }

    return (
      <>
        <EqualsSymbol />
        <PowerTerm base="5" exponent="4" highlight={phase === 2 ? 'pink' : undefined} />
        <TimesSymbol />
        <HighlighterToken value="3" color="green" active={phase === 3} />
        <TimesSymbol />
        <HighlighterToken value="3" color="green" active={phase === 3} />
      </>
    )
  }

  if (phase === 4 || phase === 5) {
    if (showThreeMergeMotion) {
      return <ThreeToPowerMergeMotion />
    }

    return <PowerSwapMotion swapped={phase === 5} highlightThree={phase === 4} />
  }
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
  highlight,
}: {
  base: string
  exponent: string
  highlight?: 'pink' | 'green'
}) {
  const bgClass = highlight === 'pink' ? 'bg-[#f7bfd6]' : 'bg-[#c9e5a6]'

  const term = (
    <span className="inline-flex items-start leading-none">
      <span className="leading-none">{base}</span>
      <sup className="relative -top-[0.38em] ml-[0.04em] text-[0.5em] leading-none">
        {exponent}
      </sup>
    </span>
  )

  if (!highlight) return term

  return (
    <span className="relative inline-flex items-center justify-center px-[0.12em] py-[0.04em]">
      <span
        className={cn(
          'absolute left-[-0.26em] right-[-0.26em] top-[0.04em] h-[0.94em] rounded-[0.32em] opacity-90',
          bgClass,
        )}
      />
      <span className="relative z-10">
        {term}
      </span>
    </span>
  )
}

type MergeTokenId = '5a' | '3a' | '5b' | '3b' | '5c' | '5d'

const RAW_MERGE_ORDER: MergeTokenId[] = ['5a', '3a', '5b', '3b', '5c', '5d']
const GROUPED_MERGE_ORDER: MergeTokenId[] = ['5a', '5b', '5c', '5d', '3a', '3b']
const COLLAPSED_MERGE_ORDER: Array<'5a' | '3a' | '3b'> = ['5a', '3a', '3b']

function FiveToPowerMergeMotion() {
  const [stage, setStage] = useState<0 | 1 | 2>(0)

  useEffect(() => {
    const reorderTimer = window.setTimeout(() => {
      setStage(1)
    }, 70)
    const collapseTimer = window.setTimeout(() => {
      setStage(2)
    }, 620)

    return () => {
      window.clearTimeout(reorderTimer)
      window.clearTimeout(collapseTimer)
    }
  }, [])

  const order =
    stage === 0
      ? RAW_MERGE_ORDER
      : stage === 1
        ? GROUPED_MERGE_ORDER
        : COLLAPSED_MERGE_ORDER

  return (
    <>
      <EqualsSymbol />
      <motion.span layout className="inline-flex items-baseline">
        <AnimatePresence initial={false}>
          {order.map((id, index) => {
            const value = id.startsWith('5') ? '5' : '3'
            const isMergedPow = id === '5a' && stage === 2
            const isMergeSource = id.startsWith('5') && id !== '5a'

            return (
              <motion.span
                key={id}
                layout
                transition={{
                  layout: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
                  default: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                }}
                exit={
                  isMergeSource
                    ? {
                        x: -34,
                        y: 4,
                        scale: 0.18,
                        opacity: 0,
                        transition: { duration: 0.34, ease: [0.16, 1, 0.3, 1] },
                      }
                    : { opacity: 0, transition: { duration: 0.24 } }
                }
                className="inline-flex items-baseline"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isMergedPow ? (
                    <motion.span
                      key="pow"
                      initial={{ opacity: 0, y: -6, scale: 0.94 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <PowerTerm base="5" exponent="4" highlight="pink" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="digit"
                      initial={{ opacity: 0.9 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <HighlighterToken
                        value={value}
                        color={value === '5' ? 'pink' : 'green'}
                        active={value === '5'}
                      />
                    </motion.span>
                  )}
                </AnimatePresence>
                {index < order.length - 1 && <TimesSymbol />}
              </motion.span>
            )
          })}
        </AnimatePresence>
      </motion.span>
    </>
  )
}

function ThreeToPowerMergeMotion() {
  const [stage, setStage] = useState<0 | 1 | 2>(0)

  useEffect(() => {
    const gatherTimer = window.setTimeout(() => {
      setStage(1)
    }, 80)
    const collapseTimer = window.setTimeout(() => {
      setStage(2)
    }, 560)

    return () => {
      window.clearTimeout(gatherTimer)
      window.clearTimeout(collapseTimer)
    }
  }, [])

  const order: Array<'3a' | '3b'> | Array<'3a'> = stage === 2 ? ['3a'] : ['3a', '3b']

  return (
    <>
      <EqualsSymbol />
      <PowerTerm base="5" exponent="4" />
      <TimesSymbol />
      <motion.span layout className="inline-flex items-baseline">
        <AnimatePresence initial={false}>
          {order.map((id, index) => {
            const isMergedPow = id === '3a' && stage === 2
            const isMergeSource = id === '3b'

            return (
              <motion.span
                key={id}
                layout
                animate={{
                  x: stage === 0 ? 0 : id === '3a' ? -10 : -20,
                }}
                transition={{
                  layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                  default: { duration: 0.34, ease: [0.16, 1, 0.3, 1] },
                }}
                exit={
                  isMergeSource
                    ? {
                        x: -32,
                        y: 3,
                        scale: 0.2,
                        opacity: 0,
                        transition: { duration: 0.34, ease: [0.16, 1, 0.3, 1] },
                      }
                    : { opacity: 0, transition: { duration: 0.22 } }
                }
                className="inline-flex items-baseline"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isMergedPow ? (
                    <motion.span
                      key="pow"
                      initial={{ opacity: 0, y: -6, scale: 0.92 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <PowerTerm base="3" exponent="2" highlight="green" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="digit"
                      initial={{ opacity: 0.9 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.16 }}
                    >
                      <HighlighterToken value="3" color="green" active />
                    </motion.span>
                  )}
                </AnimatePresence>
                {index < order.length - 1 && <TimesSymbol />}
              </motion.span>
            )
          })}
        </AnimatePresence>
      </motion.span>
    </>
  )
}

function PowerSwapMotion({
  swapped,
  highlightThree,
}: {
  swapped: boolean
  highlightThree: boolean
}) {
  const swapEase: [number, number, number, number] = [0.16, 1, 0.3, 1]
  const motionTransition = {
    layout: { duration: 0.46, ease: swapEase },
  }

  return (
    <>
      <EqualsSymbol />
      <motion.span
        layout
        className="inline-grid grid-cols-[2.45em_auto_2.45em] items-baseline"
      >
        <motion.span
          layout
          transition={motionTransition}
          className={cn(
            'row-start-1',
            swapped ? 'col-start-3 justify-self-start' : 'col-start-1 justify-self-end',
          )}
        >
          <PowerTerm base="5" exponent="4" />
        </motion.span>

        <span className="col-start-2 row-start-1 inline-block align-middle px-1 sm:px-1.5">
          {'\u00D7'}
        </span>

        <motion.span
          layout
          transition={motionTransition}
          className={cn(
            'row-start-1',
            swapped ? 'col-start-1 justify-self-end' : 'col-start-3 justify-self-start',
          )}
        >
          <PowerTerm
            base="3"
            exponent="2"
            highlight={highlightThree ? 'green' : undefined}
          />
        </motion.span>
      </motion.span>
    </>
  )
}

function TimesSymbol() {
  // Use a Unicode escape to avoid mojibake when editing on mixed Windows encodings.
  return <span className="mx-1 sm:mx-1.5 inline-block align-middle">{'\u00D7'}</span>
}

function EqualsSymbol() {
  return <span className="mr-1.5 inline-block align-middle">=</span>
}

