import { useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react'
import { MathInline } from '@/components/math'
import { cn } from '@/lib/utils'

const PHASE_MIN = 0
const PHASE_MAX = 4
const MARKER_HEIGHT_BY_PHASE = [0, 56, 100, 144, 144] as const

interface PrimeDivisionStepperMotionProps {
  className?: string
}

function isRevealed(phase: number, showFrom: number) {
  return phase >= showFrom
}

function RevealItem({
  show,
  className,
  children,
  xFrom = 6,
}: {
  show: boolean
  className: string
  children: ReactNode
  xFrom?: number
}) {
  return (
    <motion.div
      className={cn(className, !show && 'pointer-events-none')}
      animate={{
        opacity: show ? 1 : 0,
        x: show ? 0 : xFrom,
        y: show ? 0 : 4,
      }}
      transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function PrimeDivisionStepperMotion({
  className,
}: PrimeDivisionStepperMotionProps) {
  const [phase, setPhase] = useState(PHASE_MIN)

  const movePrev = () => {
    setPhase((prev) => Math.max(PHASE_MIN, prev - 1))
  }

  const moveNext = () => {
    setPhase((prev) => Math.min(PHASE_MAX, prev + 1))
  }

  const prevDisabled = phase === PHASE_MIN
  const nextDisabled = phase === PHASE_MAX

  return (
    <div className={cn('rounded-xl bg-[#fffef7] p-3', className)}>
      <div className="mb-2 flex justify-end gap-2">
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

      <div className="relative mx-auto h-[274px] w-full max-w-[330px] overflow-hidden rounded-lg bg-[#efefef]">
        <div className="absolute left-4 top-10 text-left text-[14px] font-extrabold leading-[1.35] text-[#ff4b4b]">
          2, 3, 5처럼
          <br />
          작은 소수로
          <br />
          나누기!
        </div>
        <div className="absolute left-[90px] top-[44px] text-[#ff5b5b]">
          <ArrowRight size={20} strokeWidth={2.4} />
        </div>

        <div className="absolute left-[116px] top-[24px] h-[208px] w-[116px]">
          <motion.div
            className="absolute left-0 top-0 w-[28px] rounded-sm bg-[#f7c5d7]"
            animate={{
              opacity: phase === 0 ? 0 : 1,
              height: MARKER_HEIGHT_BY_PHASE[phase],
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            className="absolute left-0 top-[134px] h-[30px] rounded-sm bg-[#f7c5d7]"
            animate={{ opacity: phase >= 3 ? 1 : 0, width: phase >= 3 ? 112 : 0 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
          />

          <RevealItem
            show={isRevealed(phase, 1)}
            className="absolute left-[4px] top-[10px] w-[20px] text-center text-[40px] font-black leading-none text-[#2a2a2a]"
            xFrom={-4}
          >
            2
          </RevealItem>
          <RevealItem
            show={isRevealed(phase, 2)}
            className="absolute left-[4px] top-[54px] w-[20px] text-center text-[40px] font-black leading-none text-[#2a2a2a]"
            xFrom={-4}
          >
            2
          </RevealItem>
          <RevealItem
            show={isRevealed(phase, 3)}
            className="absolute left-[4px] top-[98px] w-[20px] text-center text-[40px] font-black leading-none text-[#2a2a2a]"
            xFrom={-4}
          >
            2
          </RevealItem>

          <RevealItem
            show={isRevealed(phase, 0)}
            className="absolute left-[30px] top-[8px] text-[44px] font-black leading-none text-[#2a2a2a]"
            xFrom={-4}
          >
            )
          </RevealItem>
          <RevealItem
            show={isRevealed(phase, 1)}
            className="absolute left-[30px] top-[52px] text-[44px] font-black leading-none text-[#2a2a2a]"
            xFrom={-4}
          >
            )
          </RevealItem>
          <RevealItem
            show={isRevealed(phase, 2)}
            className="absolute left-[30px] top-[96px] text-[44px] font-black leading-none text-[#2a2a2a]"
            xFrom={-4}
          >
            )
          </RevealItem>

          <RevealItem
            show={isRevealed(phase, 0)}
            className="absolute left-[39px] top-[4px] w-[73px] border-b-[3px] border-[#555] pr-[6px] text-right text-[40px] font-black leading-none text-[#2a2a2a]"
          >
            24
          </RevealItem>
          <RevealItem
            show={isRevealed(phase, 1)}
            className="absolute left-[39px] top-[48px] w-[73px] border-b-[3px] border-[#555] pr-[6px] text-right text-[40px] font-black leading-none text-[#2a2a2a]"
          >
            12
          </RevealItem>
          <RevealItem
            show={isRevealed(phase, 2)}
            className="absolute left-[39px] top-[92px] w-[73px] border-b-[3px] border-[#555] pr-[6px] text-right text-[40px] font-black leading-none text-[#2a2a2a]"
          >
            6
          </RevealItem>
          <RevealItem
            show={isRevealed(phase, 3)}
            className="absolute left-[39px] top-[136px] w-[73px] pr-[6px] text-right text-[40px] font-black leading-none text-[#2a2a2a]"
          >
            3
          </RevealItem>
        </div>

        <RevealItem
          show={isRevealed(phase, 4)}
          className="absolute left-[16px] top-[206px] text-[25px] font-black leading-none text-[#ff4b4b]"
          xFrom={0}
        >
          소수가 나오면 끝!
        </RevealItem>
        <RevealItem
          show={isRevealed(phase, 4)}
          className="absolute left-[166px] top-[170px] text-[#ff5b5b]"
          xFrom={0}
        >
          <ArrowUpRight size={46} strokeWidth={2.3} />
        </RevealItem>
      </div>

      <AnimatePresence>
        {isRevealed(phase, 4) ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 rounded-lg bg-white px-3 py-2"
          >
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
                <MathInline tex={'24=2\\times2\\times2\\times3'} katexFontSize="1.25em" />
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
