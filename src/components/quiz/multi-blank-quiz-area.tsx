import { useMemo, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import type { MultiQuiz } from '@/schemas/step'
import { useMultiBlankQuiz } from '@/hooks/use-quiz'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import { BlankButton } from './blank-button'
import { ChoicePanel } from './choice-panel'
import { QuizFeedback } from './quiz-feedback'

interface MultiBlankQuizAreaProps {
  stepId: number
  quiz: MultiQuiz
  renderBlanks?: (blank: (id: string) => ReactNode) => ReactNode
}

export const MultiBlankQuizArea = ({
  stepId,
  quiz,
  renderBlanks,
}: MultiBlankQuizAreaProps) => {
  const { markSolved, advanceStep, currentStep, totalSteps, isSolved } = useSlideProgress()
  const solved = isSolved(stepId)

  const itemsById = useMemo(
    () => Object.fromEntries(quiz.items.map((item) => [item.id, item])),
    [quiz.items],
  )

  const {
    activeItem,
    feedback,
    feedbackType,
    solvedAnswers,
    toggleBlank,
    checkAnswer,
  } = useMultiBlankQuiz(quiz, solved)

  if (!renderBlanks) {
    if (import.meta.env.DEV) {
      throw new Error('Multi quiz requires renderBlanks in QuizArea.')
    }
    return null
  }

  const handleSelect = (value: string): boolean => {
    const result = checkAnswer(value)
    if (result.isCorrect && result.isComplete) {
      markSolved(stepId)
      setTimeout(() => {
        if (currentStep < totalSteps - 1) {
          advanceStep()
        }
      }, 1200)
    }
    return result.isCorrect
  }

  const renderBlank = (blankId: string): ReactNode => {
    const item = itemsById[blankId]

    if (!item) {
      if (import.meta.env.DEV) {
        throw new Error(`Unknown multi quiz blank id: ${blankId}`)
      }
      return null
    }

    const solvedAnswer = solvedAnswers[blankId] ?? null

    return (
      <BlankButton
        key={blankId}
        onClick={() => toggleBlank(blankId)}
        solved={solved || Boolean(solvedAnswer)}
        solvedAnswer={solvedAnswer}
        blankType={item.blankType}
        isLatex={Boolean(item.answerLatex)}
        solvedLatexFontSize={item.answerLatexFontSize}
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
      <div className="katex-inline mb-3.5 text-center text-[17px] font-extrabold leading-[1.8] text-gray-700">
        {renderBlanks(renderBlank)}
      </div>

      <ChoicePanel
        choices={activeItem?.choices ?? []}
        isOpen={Boolean(activeItem) && !solved}
        onSelect={handleSelect}
        disabled={solved}
      />

      <QuizFeedback message={feedback} type={feedbackType} />
    </motion.div>
  )
}
