import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { MathInline } from '@/components/math'
import { BlankButton, ChoicePanel, QuizFeedback } from '@/components/quiz'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import type { BlankType, Choice } from '@/schemas/step'

type QuizItemId = 'multiples' | 'divisors' | 'target'

interface QuizItem {
  id: QuizItemId
  answer: string
  blankType: BlankType
  choices: Choice[]
}

const QUIZ_ITEMS: QuizItem[] = [
  {
    id: 'multiples',
    answer: '3의 배수이자 7의 배수',
    blankType: 'normal',
    choices: [
      { label: '3의 배수이자 7의 배수', value: '3의 배수이자 7의 배수' },
      { label: '3의 약수이자 7의 약수', value: '3의 약수이자 7의 약수' },
      { label: '3과 7의 공배수', value: '3과 7의 공배수' },
      { label: '3과 7의 공약수', value: '3과 7의 공약수' },
    ],
  },
  {
    id: 'divisors',
    answer: '3, 7',
    blankType: 'normal',
    choices: [
      { label: '3, 7', value: '3, 7' },
      { label: '1, 21', value: '1, 21' },
      { label: '3, 21', value: '3, 21' },
      { label: '7, 21', value: '7, 21' },
    ],
  },
  {
    id: 'target',
    answer: '21',
    blankType: 'normal',
    choices: [
      { label: '14', value: '14' },
      { label: '21', value: '21' },
      { label: '28', value: '28' },
      { label: '35', value: '35' },
    ],
  },
]

export function DivisorDefinitionMultiBlankQuiz({ stepId = 1 }: { stepId?: number }) {
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
    setActiveItemId((prev) => (prev === itemId ? null : itemId))
  }

  const handleSelectChoice = (value: string): boolean => {
    if (!activeItem || solved) return false

    if (value === activeItem.answer) {
      const nextSolvedAnswers = {
        ...solvedAnswers,
        [activeItem.id]: activeItem.answer,
      }

      setSolvedAnswers(nextSolvedAnswers)
      setFeedback(null)
      setFeedbackType(null)

      const nextUnsolvedItem = QUIZ_ITEMS.find((item) => !nextSolvedAnswers[item.id])
      if (nextUnsolvedItem) {
        setActiveItemId(nextUnsolvedItem.id)
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
        예시를 보고 빈칸을 순서대로 채워 보자.
      </div>

      <div className="katex-inline mb-3.5 text-center text-[17px] font-extrabold leading-[1.9] text-gray-700">
        <MathInline tex={'21 = 3 \\times 7'} />
        <br />
        <>21은 {renderBlank(QUIZ_ITEMS[0])}</>
        <br />
        <>{renderBlank(QUIZ_ITEMS[1])}은 {renderBlank(QUIZ_ITEMS[2])}의 약수</>
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
