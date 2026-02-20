import type { ReactNode } from 'react'
import type { Quiz } from '@/schemas/step'
import { useQuiz } from '@/hooks/use-quiz'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import { BlankButton } from './blank-button'
import { ChoicePanel } from './choice-panel'
import { QuizFeedback } from './quiz-feedback'
import { motion } from 'framer-motion'

export function QuizArea({
  stepId,
  quiz,
  questionContent,
  renderBlank,
}: {
  stepId: number
  quiz: Quiz
  /** Full question content as JSX — should contain {blank} placeholder */
  questionContent?: ReactNode
  /** If provided, caller controls blank rendering position */
  renderBlank?: (blank: ReactNode) => ReactNode
}) {
  const { markSolved, advanceStep, currentStep, totalSteps } = useSlideProgress()
  const { isOpen, isSolved, feedback, feedbackType, toggleOpen, checkAnswer, solvedAnswer } = useQuiz(quiz)

  const handleSelect = (value: string): boolean => {
    const correct = checkAnswer(value)
    if (correct) {
      markSolved(stepId)
      setTimeout(() => {
        if (currentStep < totalSteps - 1) {
          advanceStep()
        }
      }, 1200)
    }
    return correct
  }

  const blank = (
    <BlankButton
      onClick={toggleOpen}
      solved={isSolved}
      solvedAnswer={solvedAnswer}
      blankType={quiz.blankType}
      isLatex={!!quiz.answerLatex}
    />
  )

  return (
    <motion.div
      className="mt-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="katex-inline text-[17px] font-extrabold text-gray-700 text-center leading-[1.8] mb-3.5">
        {renderBlank ? renderBlank(blank) : (
          <>
            {questionContent}
            {' '}
            {blank}
          </>
        )}
      </div>

      <ChoicePanel
        choices={quiz.choices}
        isOpen={isOpen}
        onSelect={handleSelect}
        disabled={isSolved}
      />

      <QuizFeedback message={feedback} type={feedbackType} />
    </motion.div>
  )
}
