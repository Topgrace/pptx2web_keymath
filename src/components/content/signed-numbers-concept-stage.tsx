import type { ReactNode } from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { StepCard } from '@/components/cards/step-card'
import { BlankButton } from '@/components/quiz/blank-button'
import { ChoicePanel } from '@/components/quiz/choice-panel'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import { cn } from '@/lib/utils'

type BlankId = 'ground' | 'belowZero' | 'east' | 'beforeTime'

const signPairs = [
  ['이익', '손해'],
  ['지상', '지하'],
  ['증가', '감소'],
  ['~후', '~전'],
  ['영상', '영하'],
  ['동쪽', '서쪽'],
  ['해발', '해저'],
  ['...', '...'],
] as const

const quizByBlank = {
  ground: {
    answer: '지상',
    choices: [
      { label: '지상', value: '지상' },
      { label: '지하', value: '지하' },
    ],
  },
  belowZero: {
    answer: '영하',
    choices: [
      { label: '영상', value: '영상' },
      { label: '영하', value: '영하' },
    ],
  },
  east: {
    answer: '동쪽',
    choices: [
      { label: '동쪽', value: '동쪽' },
      { label: '북쪽', value: '북쪽' },
    ],
  },
  beforeTime: {
    answer: '-4시간',
    choices: [
      { label: '-4시간', value: '-4시간' },
      { label: '+4시간', value: '+4시간' },
    ],
  },
} as const

function SignComparisonTable({
  renderPositiveItem,
  renderNegativeItem,
}: {
  renderPositiveItem: (item: string) => ReactNode
  renderNegativeItem: (item: string) => ReactNode
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#B0CBB9] bg-white">
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr>
            <th className="h-[52px] border-r border-[#B0CBB9] border-b bg-[#E9F2EB] px-3 text-center text-2xl font-black leading-none text-[#356B4B]">
              +
            </th>
            <th className="h-[52px] border-b border-[#B0CBB9] bg-[#E9F2EB] px-3 text-center text-2xl font-black leading-none text-[#356B4B]">
              -
            </th>
          </tr>
        </thead>
        <tbody>
          {signPairs.map(([positive, negative], index) => (
            <tr key={`${positive}-${negative}`}>
              <td
                className={cn(
                  'h-[48px] border-r border-[#B0CBB9] px-2.5 text-center align-middle text-[15px] font-semibold leading-tight text-[#333]',
                  index < signPairs.length - 1 && 'border-b border-[#F0F0F0]',
                )}
              >
                {renderPositiveItem(positive)}
              </td>
              <td
                className={cn(
                  'h-[48px] px-2.5 text-center align-middle text-[15px] font-semibold leading-tight text-[#333]',
                  index < signPairs.length - 1 && 'border-b border-[#F0F0F0]',
                )}
              >
                {renderNegativeItem(negative)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function SignedNumbersConceptStage({
  stepId = 6,
  visible = false,
  className,
}: {
  stepId?: number
  visible?: boolean
  className?: string
}) {
  const { markSolved, advanceStep, currentStep, totalSteps } = useSlideProgress()
  const [activeBlank, setActiveBlank] = useState<BlankId | null>(null)
  const [solvedBlanks, setSolvedBlanks] = useState<Record<BlankId, boolean>>({
    ground: false,
    belowZero: false,
    east: false,
    beforeTime: false,
  })

  const tableSolved = solvedBlanks.ground && solvedBlanks.belowZero && solvedBlanks.east

  const completeStep = () => {
    markSolved(stepId)
    window.setTimeout(() => {
      if (currentStep === stepId && currentStep < totalSteps - 1) {
        advanceStep()
      }
    }, 2600)
  }

  const handleChoiceSelect = (value: string) => {
    if (!activeBlank) return false

    const quiz = quizByBlank[activeBlank]
    if (value !== quiz.answer) return false

    const nextSolved = {
      ...solvedBlanks,
      [activeBlank]: true,
    }

    setSolvedBlanks(nextSolved)
    setActiveBlank(null)

    if (Object.values(nextSolved).every(Boolean)) {
      completeStep()
    }

    return true
  }

  const renderBlank = (blankId: BlankId) => {
    const quiz = quizByBlank[blankId]

    return (
      <span className="inline-block align-middle [&>button]:min-w-[66px] [&>button]:rounded-md [&>button]:border-[2px] [&>button]:px-2 [&>button]:py-0.5 [&>button]:text-[15px] [&>button>span]:text-[16px]">
        <BlankButton
          onClick={() => {
            if (solvedBlanks[blankId]) return
            setActiveBlank((prev) => (prev === blankId ? null : blankId))
          }}
          solved={solvedBlanks[blankId]}
          solvedAnswer={quiz.answer}
          active={activeBlank === blankId}
          blankType="normal"
        />
      </span>
    )
  }

  const renderPositiveItem = (item: string) => {
    if (item === '지상') return renderBlank('ground')
    if (item === '동쪽') return renderBlank('east')
    return item
  }

  const renderNegativeItem = (item: string) => {
    if (item === '영하') return renderBlank('belowZero')
    return item
  }

  return (
    <StepCard
      variant="white"
      visible={visible}
      className={cn('overflow-visible px-4 py-6 sm:px-6 sm:py-7', className)}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.38, ease: 'easeOut' }}
        className="mx-auto w-full max-w-md rounded-xl bg-white p-6 shadow-[0_8px_24px_rgba(46,87,68,0.08)] sm:max-w-xl"
      >
        <div className="mb-4 inline-flex rounded-md bg-[#356B4B] px-4 py-2 text-[18px] font-black leading-none text-white">
          부호를 가진 수
        </div>

        <p className="mb-6 break-keep text-[15px] font-medium leading-[1.75] text-[#444]">
          서로 반대되는 성질을 가진 두 수량을 나타낼 때, 어떤 기준을 중심으로 한쪽 수량에는{' '}
          <strong className="font-black text-[#356B4B]">양의 부호 '+'</strong>를, 다른 쪽 수량에는{' '}
          <strong className="font-black text-[#356B4B]">음의 부호 '-'</strong>를 사용하여 나타낸다.
        </p>

        <SignComparisonTable
          renderPositiveItem={renderPositiveItem}
          renderNegativeItem={renderNegativeItem}
        />

        <div className="min-h-[86px]">
          {tableSolved ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.32, ease: 'easeOut' }}
                className="mx-auto mt-4 flex w-fit items-start gap-2 rounded-xl border border-[#D7E5DB] bg-[#F7FBF8] px-3 py-2.5 text-[#356B4B] shadow-[0_10px_24px_rgba(46,87,68,0.12)]"
              >
                <span className="mt-1 rounded bg-[#7FA98C] px-1.5 py-0.5 text-[12px] font-black leading-none text-white">
                  예
                </span>
                <div className="text-[16px] font-black leading-[1.55]">
                  <div className="flex items-center gap-1.5">
                    <span aria-hidden="true">•</span>
                    <span>4시간 전:</span>
                    {renderBlank('beforeTime')}
                  </div>
                  <div className="flex gap-1.5">
                    <span aria-hidden="true">•</span>
                    <span>8시간 후: +8시간</span>
                  </div>
                </div>
              </motion.div>

              <div
                className={cn(
                  'mx-auto mt-3 w-fit rounded-2xl border border-[#D7E5DB] bg-white/95 px-3 py-2 shadow-[0_12px_28px_rgba(46,87,68,0.14)]',
                  activeBlank !== 'beforeTime' && 'pointer-events-none invisible',
                )}
              >
                <ChoicePanel
                  choices={activeBlank === 'beforeTime' ? [...quizByBlank.beforeTime.choices] : []}
                  isOpen={activeBlank === 'beforeTime'}
                  onSelect={handleChoiceSelect}
                  disabled={false}
                  className="mt-0 gap-2"
                />
              </div>
            </>
          ) : (
            <div
              className={cn(
                'mx-auto mt-3 w-fit rounded-2xl border border-[#D7E5DB] bg-white/95 px-3 py-2 shadow-[0_12px_28px_rgba(46,87,68,0.14)]',
                activeBlank === null && 'pointer-events-none invisible',
              )}
            >
              <ChoicePanel
                choices={activeBlank ? [...quizByBlank[activeBlank].choices] : []}
                isOpen={activeBlank !== null}
                onSelect={handleChoiceSelect}
                disabled={false}
                className="mt-0 gap-2"
              />
            </div>
          )}
        </div>
      </motion.div>
    </StepCard>
  )
}
