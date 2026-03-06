import { useMemo, useState } from 'react'
import { BlankButton, ChoicePanel, QuizFeedback } from '@/components/quiz'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import type { BlankType, Choice } from '@/schemas/step'
import { MathInline } from '@/components/math'

type ExponentItemId = 'expTwo' | 'expThree'

interface ExponentQuizItem {
  id: ExponentItemId
  label: string
  answer: string
  blankType: BlankType
  choices: Choice[]
}

export function PerfectSquareExponentPairQuiz({
  stepId = 3,
  equationTex = '36 = 2^2 \\times 3^2',
  firstBase = '2',
  secondBase = '3',
  firstAnswer = '2',
  secondAnswer = '2',
  choices = ['1', '2', '3', '4'],
}: {
  stepId?: number
  equationTex?: string
  firstBase?: string
  secondBase?: string
  firstAnswer?: string
  secondAnswer?: string
  choices?: string[]
}) {
  const { markSolved, advanceStep, currentStep, totalSteps, isSolved } = useSlideProgress()
  const solved = isSolved(stepId)

  const [activeItemId, setActiveItemId] = useState<ExponentItemId | null>(null)
  const [solvedAnswers, setSolvedAnswers] = useState<Partial<Record<ExponentItemId, string>>>({})
  const [feedback, setFeedback] = useState<string | null>(null)
  const [feedbackType, setFeedbackType] = useState<'success' | 'fail' | null>(null)

  const quizItems: ExponentQuizItem[] = useMemo(
    () => [
      {
        id: 'expTwo',
        label: firstBase,
        answer: firstAnswer,
        blankType: 'normal',
        choices: choices.map((choice) => ({ label: choice, value: choice })),
      },
      {
        id: 'expThree',
        label: secondBase,
        answer: secondAnswer,
        blankType: 'normal',
        choices: choices.map((choice) => ({ label: choice, value: choice })),
      },
    ],
    [choices, firstAnswer, firstBase, secondAnswer, secondBase],
  )

  const activeItem = useMemo(
    () => quizItems.find((item) => item.id === activeItemId) ?? null,
    [activeItemId, quizItems],
  )

  const handleToggleBlank = (itemId: ExponentItemId) => {
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

      const nextUnsolvedItem = quizItems.find((item) => !nextSolvedAnswers[item.id])
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

  const renderBlank = (item: ExponentQuizItem) => {
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
        <>
          <MathInline tex={equationTex} />
          에서 <br/>{quizItems[0].label}의 지수는 {renderBlank(quizItems[0])}이고 <br/>{quizItems[1].label}의 지수는 {renderBlank(quizItems[1])}이다.
        </>
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
