import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import { QuizFeedback } from '@/components/quiz/quiz-feedback'

interface EratosthenesSieveCardProps {
  visible?: boolean
  className?: string
  stepId?: number
}

interface SieveRound {
  title: string
  instruction: string
  target: number[]
}

const NUMBERS = Array.from({ length: 50 }, (_, idx) => idx + 1)

const PRIME_NUMBERS = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]

const SIEVE_ROUNDS: SieveRound[] = [
  {
    title: '1 제거',
    instruction: '1은 소수가 아니므로 1을 지웁니다.',
    target: [1],
  },
  {
    title: '2의 배수 제거',
    instruction: '2는 남기고 2의 배수(2 제외)를 모두 지웁니다.',
    target: [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50],
  },
  {
    title: '3의 배수 제거',
    instruction: '3은 남기고 남아 있는 3의 배수를 지웁니다.',
    target: [9, 15, 21, 27, 33, 39, 45],
  },
  {
    title: '5의 배수 제거',
    instruction: '5는 남기고 남아 있는 5의 배수를 지웁니다.',
    target: [25, 35],
  },
  {
    title: '7의 배수 제거',
    instruction: '7은 남기고 남아 있는 7의 배수를 지웁니다.',
    target: [49],
  },
]

export function EratosthenesSieveCard({
  visible = false,
  className,
  stepId = 11,
}: EratosthenesSieveCardProps) {
  const { markSolved, advanceStep, currentStep, totalSteps, isSolved } = useSlideProgress()
  const solved = isSolved(stepId)

  const finalRemovedSet = useMemo(
    () => new Set(SIEVE_ROUNDS.flatMap((round) => round.target)),
    [],
  )
  const primeSet = useMemo(() => new Set(PRIME_NUMBERS), [])

  const [roundIndex, setRoundIndex] = useState(0)
  const [removedNumbers, setRemovedNumbers] = useState<Set<number>>(new Set())
  const [feedback, setFeedback] = useState<string | null>(null)
  const [feedbackType, setFeedbackType] = useState<'success' | 'fail' | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const toastTimerRef = useRef<number | null>(null)

  const completed = solved || roundIndex >= SIEVE_ROUNDS.length
  const activeRound = completed ? null : SIEVE_ROUNDS[roundIndex]
  const completedRoundCount = solved ? SIEVE_ROUNDS.length : roundIndex
  const viewRemovedNumbers = solved ? finalRemovedSet : removedNumbers
  const viewFeedback = solved ? '체를 완성했어요. 남아 있는 수는 모두 소수입니다.' : feedback
  const viewFeedbackType = solved ? 'success' : feedbackType

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current)
      }
    }
  }, [])

  const showToast = (message: string) => {
    setToastMessage(message)
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current)
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null)
      toastTimerRef.current = null
    }, 1200)
  }

  const completeRound = (target: number[]) => {
    setRemovedNumbers((prev) => {
      const next = new Set(prev)
      target.forEach((num) => next.add(num))
      return next
    })

    setFeedbackType('success')

    const isLastRound = roundIndex === SIEVE_ROUNDS.length - 1
    if (isLastRound) {
      setRoundIndex(SIEVE_ROUNDS.length)
      setFeedback('정답! 에라토스테네스의 체 완성!')

      if (!solved) {
        markSolved(stepId)
        setTimeout(() => {
          if (currentStep === stepId && currentStep < totalSteps - 1) {
            advanceStep()
          }
        }, 1200)
      }
      return
    }

    const nextRoundIndex = roundIndex + 1
    setRoundIndex(nextRoundIndex)
    setFeedback(`라운드 완료! 다음 단계: ${SIEVE_ROUNDS[nextRoundIndex].title}`)
  }

  const handleToggleNumber = (number: number) => {
    if (!activeRound || completed || removedNumbers.has(number)) return

    const targetSet = new Set(activeRound.target)
    if (!targetSet.has(number)) {
      showToast('오답! 현재 라운드에서 지워야 할 수가 아니에요.')
      return
    }

    const nextRemoved = new Set(removedNumbers)
    nextRemoved.add(number)
    setRemovedNumbers(nextRemoved)

    const roundDone = activeRound.target.every((value) => nextRemoved.has(value))
    if (roundDone) {
      completeRound(activeRound.target)
    }
  }

  return (
    <motion.section
      className={cn(
        'relative mx-4 overflow-hidden rounded-sm border-4 border-[#222] bg-white shadow-[6px_6px_0px_#222]',
        className,
      )}
      initial={{ opacity: 0, y: 32 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            key={toastMessage}
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute left-4 right-4 top-3 z-20 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-center text-[12px] font-bold text-red-700 shadow"
            role="status"
            aria-live="polite"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="border-b border-[#dbe4ea] bg-[#f8fafc] px-4 py-3">
        <h3 className="text-center text-[22px] leading-none font-black text-[#1F4F8A]">에라토스테네스의 체</h3>
        <p className="mt-2 text-center text-[13px] font-bold text-slide-gray">
          배수를 지워 소수만 남겨 봅시다.
        </p>
      </div>

      <div className="px-4 pt-3">
        <div className="rounded-[10px] border border-[#dbe4ea] bg-white px-3 py-2">
          <div className="text-[12px] font-black text-[#1F4F8A]">
            {completed ? '완료' : `라운드 ${roundIndex + 1}/${SIEVE_ROUNDS.length}`}
          </div>
          <div className="mt-1 text-[13px] font-bold leading-[1.5] text-slide-gray">
            {completed ? '모든 라운드를 완료했습니다. 남은 소수를 확인해 보세요.' : activeRound?.instruction}
          </div>
        </div>
      </div>

      <div className="px-4 pt-2">
        <ol className="space-y-1 text-[12px] font-bold text-slide-gray">
          {SIEVE_ROUNDS.map((round, idx) => (
            <li
              key={round.title}
              className={cn(
                'rounded-md px-2 py-1',
                idx < completedRoundCount && 'bg-[#e8fbf4] text-[#1f8d74] line-through decoration-2 decoration-[#1f8d74]',
                idx === roundIndex && !completed && 'bg-[#dbeafe] text-[#1e40af]',
              )}
            >
              {idx < completedRoundCount ? '[완료] ' : ''}
              {idx + 1}. {round.instruction}
            </li>
          ))}
        </ol>
      </div>

      <div className="px-4 pb-2 pt-3">
        <div
          className="gap-1"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
            gap: '0.25rem',
          }}
        >
          {NUMBERS.map((number) => {
            const removed = viewRemovedNumbers.has(number)
            const highlightedPrime = completed && primeSet.has(number)
            const disabled = completed || removed
            const ariaState = removed ? 'removed' : 'selectable'

            return (
              <button
                key={number}
                type="button"
                onClick={() => handleToggleNumber(number)}
                disabled={disabled}
                aria-label={`${number}, ${ariaState}`}
                className={cn(
                  'relative aspect-square rounded border text-[12px] font-black transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-1',
                  removed && 'cursor-default border-slate-300 bg-slate-200 text-slate-500',
                  highlightedPrime && !removed && 'border-[#1f8d74] bg-[#e8fbf4] text-[#1f8d74]',
                  !removed && !highlightedPrime && 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
                )}
              >
                {number}
                {removed && (
                  <span
                    className="pointer-events-none absolute"
                    style={{
                      left: '10%',
                      right: '10%',
                      top: '50%',
                      height: '2px',
                      transform: 'translateY(-50%) rotate(-38deg)',
                      backgroundColor: '#ef4444',
                    }}
                    aria-hidden="true"
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>

      <div className="px-4 pb-3">
        <QuizFeedback message={viewFeedback} type={viewFeedbackType} />
      </div>

      {completed && (
        <div className="mx-4 mb-4 rounded-[10px] border border-[#bfe8d7] bg-[#f1fff8] px-3 py-2">
          <p className="text-[13px] font-black text-[#1f8d74]">남은 수(소수)</p>
          <p className="mt-1 text-[13px] font-bold leading-[1.6] text-slide-gray">
            2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47
          </p>
        </div>
      )}
    </motion.section>
  )
}
