import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { BlankButton, ChoicePanel, QuizFeedback } from '@/components/quiz'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import type { BlankType, Choice } from '@/schemas/step'

type QuizItemId = 'diff' | 'comparison'

interface QuizItem {
  id: QuizItemId
  answer: string
  blankType: BlankType
  choices: Choice[]
}

const QUIZ_ITEMS: QuizItem[] = [
  {
    id: 'diff',
    answer: '30도',
    blankType: 'normal',
    choices: [
      { label: '10도', value: '10도' },
      { label: '20도', value: '20도' },
      { label: '30도', value: '30도' },
      { label: '40도', value: '40도' },
    ],
  },
  {
    id: 'comparison',
    answer: '따뜻하다',
    blankType: 'normal',
    choices: [
      { label: '따뜻하다', value: '따뜻하다' },
      { label: '차갑다', value: '차갑다' },
      { label: '같다', value: '같다' },
      { label: '비슷하다', value: '비슷하다' },
    ],
  },
]

export function TemperatureComparisonQuiz({ stepId = 2 }: { stepId?: number }) {
  const { markSolved, advanceStep, currentStep, totalSteps, isSolved } = useSlideProgress()
  const solved = isSolved(stepId)

  const [activeItemId, setActiveItemId] = useState<QuizItemId | null>(null)
  const [solvedAnswers, setSolvedAnswers] = useState<Partial<Record<QuizItemId, string>>>({})
  const [feedback, setFeedback] = useState<string | null>(null)
  const [feedbackType, setFeedbackType] = useState<'success' | 'fail' | null>(null)

  const activeItem = useMemo(
    () => QUIZ_ITEMS.find((item) => item.id === activeItemId) ?? null,
    [activeItemId],
  )

  const handleToggleBlank = (itemId: QuizItemId) => {
    if (solved || solvedAnswers[itemId]) return
    setFeedback(null)
    setFeedbackType(null)
    setActiveItemId((prev) => (prev === itemId ? null : itemId))
  }

  const handleSelectChoice = (value: string): boolean => {
    if (!activeItem || solved) return false

    if (value === activeItem.answer) {
      const nextSolvedAnswers = { ...solvedAnswers, [activeItem.id]: activeItem.answer }
      setSolvedAnswers(nextSolvedAnswers)
      setFeedback(null)
      setFeedbackType(null)

      const nextUnsolvedItem = QUIZ_ITEMS.find((item) => !nextSolvedAnswers[item.id])
      if (nextUnsolvedItem) {
        setActiveItemId(null)
      } else {
        setActiveItemId(null)
        markSolved(stepId)
        setTimeout(() => {
          if (currentStep === stepId && currentStep < totalSteps - 1) {
            advanceStep()
          }
        }, 1200)
      }
      return true
    }

    setFeedback('다시 생각해 보세요.')
    setFeedbackType('fail')
    setTimeout(() => {
      setFeedback(null)
      setFeedbackType(null)
    }, 1000)
    return false
  }

  const renderBlank = (item: QuizItem) => {
    const itemSolved = solved || Boolean(solvedAnswers[item.id])
    const solvedAnswer = solved ? item.answer : (solvedAnswers[item.id] ?? null)

    return (
      <BlankButton
        onClick={() => handleToggleBlank(item.id)}
        solved={itemSolved}
        solvedAnswer={solvedAnswer}
        active={activeItemId === item.id}
        blankType={item.blankType}
      />
    )
  }

  return (
    <motion.div
      className="mt-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="mb-2 text-center text-[13px] font-bold text-[#445063]">
        앞에서 비교한 두 도시의 온도 차이를 정리해 보자.
      </div>

      <div className="katex-inline mb-3.5 text-center text-[17px] font-extrabold leading-[1.9] text-gray-700">
        서울은 모스크바보다&nbsp;{renderBlank(QUIZ_ITEMS[0])}&nbsp;더&nbsp;{renderBlank(QUIZ_ITEMS[1])}
      </div>

      <ChoicePanel
        choices={activeItem?.choices ?? []}
        isOpen={Boolean(activeItem) && !solved}
        onSelect={handleSelectChoice}
        disabled={solved}
      />

      <QuizFeedback message={feedback} type={feedbackType} />
    </motion.div>
  )
}
