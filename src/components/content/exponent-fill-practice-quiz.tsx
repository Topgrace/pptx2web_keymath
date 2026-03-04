import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
import { MathInline } from '@/components/math'
import { BlankButton, ChoicePanel, QuizFeedback } from '@/components/quiz'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import type { BlankType, Choice } from '@/schemas/step'

interface BlankQuizItem {
  id: string
  answer: string
  answerLatex?: string
  blankType: BlankType
  choices: Choice[]
  render: (blank: ReactNode) => ReactNode
}

const QUIZ_ITEMS: BlankQuizItem[] = [
  {
    id: 'exp-3-4',
    answer: '4',
    answerLatex: '4',
    blankType: 'exponent',
    choices: [
      { label: '$2$', value: '2', latex: '2' },
      { label: '$3$', value: '3', latex: '3' },
      { label: '$4$', value: '4', latex: '4' },
      { label: '$5$', value: '5', latex: '5' },
    ],
    render: (blank) => (
      <div className="inline-flex items-baseline gap-1">
        <span className="relative inline-block">
          <MathInline tex={'3'} />
          <span className="absolute left-full -top-[10px] -ml-[2px]">
            {blank}
          </span>
        </span>
        <span className="ml-6">=</span>
        <MathInline tex={'3 \\times 3 \\times 3 \\times 3'} />
      </div>
    ),
  },
  {
    id: 'base-x-3',
    answer: 'x',
    answerLatex: 'x',
    blankType: 'normal',
    choices: [
      { label: '$x$', value: 'x', latex: 'x' },
      { label: '$3$', value: '3', latex: '3' },
      { label: '$10$', value: '10', latex: '10' },
      { label: '$1$', value: '1', latex: '1' },
    ],
    render: (blank) => (
      <div className="inline-flex items-baseline gap-1">
        {blank}
        <MathInline tex={'^3'} />
        <span>=</span>
        <MathInline tex={'x \\times x \\times x'} />
      </div>
    ),
  },
  {
    id: 'base-10-2',
    answer: '10',
    answerLatex: '10',
    blankType: 'normal',
    choices: [
      { label: '$2$', value: '2', latex: '2' },
      { label: '$10$', value: '10', latex: '10' },
      { label: '$100$', value: '100', latex: '100' },
      { label: '$x$', value: 'x', latex: 'x' },
    ],
    render: (blank) => (
      <div className="inline-flex items-baseline gap-1">
        {blank}
        <MathInline tex={'^2'} />
        <span>=</span>
        <MathInline tex={'10 \\times 10'} />
      </div>
    ),
  },
]

export function ExponentFillPracticeQuiz({ stepId = 4 }: { stepId?: number }) {
  const { markSolved, advanceStep, currentStep, totalSteps, isSolved } = useSlideProgress()
  const solved = isSolved(stepId)

  const [activeItemId, setActiveItemId] = useState<string | null>(null)
  const [solvedAnswers, setSolvedAnswers] = useState<Record<string, string>>({})
  const [feedback, setFeedback] = useState<string | null>(null)
  const [feedbackType, setFeedbackType] = useState<'success' | 'fail' | null>(null)

  const activeItem = useMemo(
    () => QUIZ_ITEMS.find((item) => item.id === activeItemId) ?? null,
    [activeItemId],
  )

  const handleToggleBlank = (itemId: string) => {
    if (solved || solvedAnswers[itemId]) return
    setActiveItemId((prev) => (prev === itemId ? null : itemId))
  }

  const handleSelectChoice = (value: string): boolean => {
    if (!activeItem || solved) return false

    if (value === activeItem.answer) {
      const nextSolvedAnswers = {
        ...solvedAnswers,
        [activeItem.id]: activeItem.answerLatex ?? activeItem.answer,
      }

      setSolvedAnswers(nextSolvedAnswers)
      setActiveItemId(null)

      const solvedCount = Object.keys(nextSolvedAnswers).length
      if (solvedCount === QUIZ_ITEMS.length) {
        setFeedback('정답! 지수와 밑을 모두 정확히 채웠어요.')
        setFeedbackType('success')

        markSolved(stepId)
        setTimeout(() => {
          if (currentStep === stepId && currentStep < totalSteps - 1) {
            advanceStep()
          }
        }, 1200)
      } else {
        setFeedback(null)
        setFeedbackType(null)
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
      <div className="space-y-2.5">
        {QUIZ_ITEMS.map((item) => {
          const itemSolved = solved || Boolean(solvedAnswers[item.id])
          const itemSolvedAnswer = solved
            ? (item.answerLatex ?? item.answer)
            : (solvedAnswers[item.id] ?? null)

          const blank = (
            <BlankButton
              onClick={() => handleToggleBlank(item.id)}
              solved={itemSolved}
              solvedAnswer={itemSolvedAnswer}
              blankType={item.blankType}
              isLatex={Boolean(item.answerLatex)}
            />
          )

          return (
            <div
              key={item.id}
              className="katex-inline text-center text-[17px] font-extrabold text-slide-gray leading-[1.8]"
            >
              {item.render(blank)}
            </div>
          )
        })}
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
