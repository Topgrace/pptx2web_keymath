import { useMemo, useState } from 'react'
import { BlankButton, ChoicePanel, QuizFeedback } from '@/components/quiz'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import type { BlankType, Choice } from '@/schemas/step'

type KeywordItemId = 'primeFactorization' | 'exponent'

interface KeywordQuizItem {
  id: KeywordItemId
  answer: string
  blankType: BlankType
  choices: Choice[]
}

const QUIZ_ITEMS: KeywordQuizItem[] = [
  {
    id: 'primeFactorization',
    answer: '소인수분해',
    blankType: 'normal',
    choices: [
      { label: '소인수분해', value: '소인수분해' },
      { label: '약수 구하기', value: '약수 구하기' },
      { label: '곱셈', value: '곱셈' },
      { label: '나눗셈', value: '나눗셈' },
    ],
  },
  {
    id: 'exponent',
    answer: '지수',
    blankType: 'normal',
    choices: [
      { label: '지수', value: '지수' },
      { label: '밑', value: '밑' },
      { label: '계수', value: '계수' },
      { label: '항', value: '항' },
    ],
  },
]

export function PerfectSquareKeywordQuiz({ stepId = 2 }: { stepId?: number }) {
  const { markSolved, advanceStep, currentStep, totalSteps, isSolved } = useSlideProgress()
  const solved = isSolved(stepId)

  const [activeItemId, setActiveItemId] = useState<KeywordItemId | null>(null)
  const [solvedAnswers, setSolvedAnswers] = useState<Partial<Record<KeywordItemId, string>>>({})
  const [feedback, setFeedback] = useState<string | null>(null)
  const [feedbackType, setFeedbackType] = useState<'success' | 'fail' | null>(null)

  const activeItem = useMemo(
    () => QUIZ_ITEMS.find((item) => item.id === activeItemId) ?? null,
    [activeItemId],
  )

  const handleToggleBlank = (itemId: KeywordItemId) => {
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

      const nextUnsolvedItem = QUIZ_ITEMS.find((item) => !nextSolvedAnswers[item.id])
      if (nextUnsolvedItem) {
        setActiveItemId(nextUnsolvedItem.id)
      } else {
        setActiveItemId(null)
        setFeedback(null)
        setFeedbackType('success')
        markSolved(stepId)

        setTimeout(() => {
          if (currentStep === stepId && currentStep < totalSteps - 1) {
            advanceStep()
          }
        }, 1200)
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

  const renderBlank = (item: KeywordQuizItem) => {
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
    <div className="mt-5">
      <div className="katex-inline text-[17px] font-extrabold text-gray-700 text-center leading-[1.8] mb-3.5">
        <>제곱인 수를 {renderBlank(QUIZ_ITEMS[0])}하면 모든 {renderBlank(QUIZ_ITEMS[1])}는(은) 짝수이다.</>
      </div>

      <ChoicePanel
        choices={activeItem?.choices ?? []}
        isOpen={Boolean(activeItem)}
        onSelect={handleSelectChoice}
        disabled={solved}
      />

      <QuizFeedback message={feedback} type={feedbackType} />
    </div>
  )
}
