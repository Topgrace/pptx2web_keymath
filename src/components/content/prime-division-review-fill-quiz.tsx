import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChoicePanel, QuizFeedback } from '@/components/quiz'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import { cn } from '@/lib/utils'
import type { Choice } from '@/schemas/step'

type ReviewItemId = 'to18' | 'to9' | 'to3'

interface ReviewItem {
  id: ReviewItemId
  answer: string
  choices: Choice[]
  underline: boolean
}

const REVIEW_ITEMS: ReviewItem[] = [
  {
    id: 'to18',
    answer: '18',
    underline: true,
    choices: [
      { label: '12', value: '12' },
      { label: '18', value: '18' },
      { label: '24', value: '24' },
      { label: '9', value: '9' },
    ],
  },
  {
    id: 'to9',
    answer: '9',
    underline: true,
    choices: [
      { label: '6', value: '6' },
      { label: '8', value: '8' },
      { label: '9', value: '9' },
      { label: '12', value: '12' },
    ],
  },
  {
    id: 'to3',
    answer: '3',
    underline: false,
    choices: [
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '6', value: '6' },
      { label: '9', value: '9' },
    ],
  },
]

function DivisorReveal({
  show,
  value,
}: {
  show: boolean
  value: string
}) {
  return (
    <div className="w-[28px] h-[40px]">
      <AnimatePresence mode="wait">
        {show ? (
          <motion.div
            key={value}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="h-full w-full rounded-sm bg-[#f7c5d7] text-center text-[32px] font-black leading-[40px] text-[#2a2a2a]"
          >
            {value}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

function NumberSlot({
  value,
  solved,
  locked,
  underline,
  onClick,
}: {
  value: string | null
  solved: boolean
  locked: boolean
  underline: boolean
  onClick: () => void
}) {
  return (
    <div
      className={cn(
        'w-[76px] min-h-[42px] flex items-center justify-end pr-1.5',
        underline && 'border-b-[3px] border-[#555]',
      )}
    >
      {solved && value ? (
        <span className="text-[36px] font-black leading-none text-[#2a2a2a]">{value}</span>
      ) : locked ? (
        <span className="text-[22px] font-black leading-none text-[#9ea6b3]">...</span>
      ) : (
        <button
          type="button"
          onClick={onClick}
          className="inline-flex h-[32px] min-w-[54px] items-center justify-center rounded-md border-2 border-dashed border-[#4a8ad4] bg-white px-2 text-[22px] font-black leading-none text-[#4a8ad4]"
          aria-label="빈칸 선택"
        >
          ?
        </button>
      )}
    </div>
  )
}

export function PrimeDivisionReviewFillQuiz({ stepId = 1 }: { stepId?: number }) {
  const { markSolved, advanceStep, currentStep, totalSteps, isSolved } = useSlideProgress()
  const globallySolved = isSolved(stepId)

  const [solvedAnswers, setSolvedAnswers] = useState<Partial<Record<ReviewItemId, string>>>({})
  const [activeItemId, setActiveItemId] = useState<ReviewItemId | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [feedbackType, setFeedbackType] = useState<'success' | 'fail' | null>(null)

  const solvedCount = globallySolved ? REVIEW_ITEMS.length : Object.keys(solvedAnswers).length
  const unlockedIndex = globallySolved ? REVIEW_ITEMS.length : solvedCount

  const activeItem = useMemo(
    () => REVIEW_ITEMS.find((item) => item.id === activeItemId) ?? null,
    [activeItemId],
  )

  const answerFor = (id: ReviewItemId) => {
    const item = REVIEW_ITEMS.find((entry) => entry.id === id)
    if (!item) return null
    if (globallySolved) return item.answer
    return solvedAnswers[id] ?? null
  }

  const isItemSolved = (id: ReviewItemId) => globallySolved || Boolean(solvedAnswers[id])
  const isItemLocked = (index: number, id: ReviewItemId) => !isItemSolved(id) && index > unlockedIndex

  const firstSolved = isItemSolved('to18')
  const secondSolved = isItemSolved('to9')

  const handleOpenItem = (item: ReviewItem, index: number) => {
    if (globallySolved) return
    if (isItemSolved(item.id)) return
    if (isItemLocked(index, item.id)) return
    setActiveItemId((prev) => (prev === item.id ? null : item.id))
  }

  const handleSelectChoice = (value: string): boolean => {
    if (!activeItem || globallySolved) return false

    if (value === activeItem.answer) {
      const nextSolvedAnswers = {
        ...solvedAnswers,
        [activeItem.id]: activeItem.answer,
      }
      setSolvedAnswers(nextSolvedAnswers)

      const nextSolvedCount = Object.keys(nextSolvedAnswers).length
      if (nextSolvedCount === REVIEW_ITEMS.length) {
        setFeedback('정답! 36의 소인수분해 나누기 과정을 완성했어요.')
        setFeedbackType('success')
        setActiveItemId(null)
        markSolved(stepId)

        setTimeout(() => {
          if (currentStep === stepId && currentStep < totalSteps - 1) {
            advanceStep()
          }
        }, 1200)
      } else {
        const nextItem = REVIEW_ITEMS[nextSolvedCount]
        setActiveItemId(nextItem.id)
      }

      return true
    }

    setFeedback('다시 생각해 보세요!')
    setFeedbackType('fail')
    setTimeout(() => {
      setFeedback(null)
      setFeedbackType(null)
    }, 1000)
    return false
  }

  return (
    <div className="mt-4">
      <div className="mb-2 text-center text-[14px] font-bold text-[#445063]">
        36을 소수로 나누며 빈칸을 순서대로 채워 보자.
      </div>

      <div className="mx-auto w-fit rounded-lg bg-[#f1f1f1] px-3 py-3">
        <div className="grid grid-cols-[28px_18px_76px] items-center gap-y-1">
          <div className="h-[40px] w-[28px] rounded-sm bg-[#f7c5d7] text-center text-[32px] font-black leading-[40px] text-[#2a2a2a]">
            2
          </div>
          <div className="text-[40px] font-black leading-none text-[#2a2a2a]">)</div>
          <div className="w-[76px] border-b-[3px] border-[#555] pr-1.5 text-right text-[36px] font-black leading-none text-[#2a2a2a]">
            36
          </div>

          <DivisorReveal show={firstSolved} value="2" />
          <div className="text-[40px] font-black leading-none text-[#2a2a2a]">)</div>
          <NumberSlot
            value={answerFor('to18')}
            solved={isItemSolved('to18')}
            locked={isItemLocked(0, 'to18')}
            underline={REVIEW_ITEMS[0].underline}
            onClick={() => handleOpenItem(REVIEW_ITEMS[0], 0)}
          />

          <DivisorReveal show={secondSolved} value="3" />
          <div className="text-[40px] font-black leading-none text-[#2a2a2a]">)</div>
          <NumberSlot
            value={answerFor('to9')}
            solved={isItemSolved('to9')}
            locked={isItemLocked(1, 'to9')}
            underline={REVIEW_ITEMS[1].underline}
            onClick={() => handleOpenItem(REVIEW_ITEMS[1], 1)}
          />

          <div className="h-[40px] w-[28px]" />
          <div className="h-[40px] w-[18px]" />
          <NumberSlot
            value={answerFor('to3')}
            solved={isItemSolved('to3')}
            locked={isItemLocked(2, 'to3')}
            underline={REVIEW_ITEMS[2].underline}
            onClick={() => handleOpenItem(REVIEW_ITEMS[2], 2)}
          />
        </div>
      </div>

      <ChoicePanel
        choices={activeItem?.choices ?? []}
        isOpen={Boolean(activeItem)}
        onSelect={handleSelectChoice}
        disabled={globallySolved}
      />

      <QuizFeedback message={feedback} type={feedbackType} />
    </div>
  )
}

