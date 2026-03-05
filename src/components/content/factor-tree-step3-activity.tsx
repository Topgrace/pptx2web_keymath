import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FactorTreeReviewFillQuiz } from '@/components/content/factor-tree-review-fill-quiz'
import { FactorTreeStepperMotion } from '@/components/content/factor-tree-stepper-motion'
import { QuizArea } from '@/components/quiz'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import type { Quiz } from '@/schemas/step'

const FINAL_QUIZ: Quiz = {
  answer: '2^2 \\times 3^2',
  answerLatex: '2^2 \\times 3^2',
  blankType: 'normal',
  choices: [
    { label: '2² × 3²', value: '2^2 \\times 3^2', latex: '2^2 \\times 3^2' },
    { label: '2³ × 3',  value: '2^3 \\times 3',   latex: '2^3 \\times 3'   },
    { label: '2 × 3²',  value: '2 \\times 3^2',   latex: '2 \\times 3^2'   },
    { label: '2² × 3',  value: '2^2 \\times 3',   latex: '2^2 \\times 3'   },
  ],
}

interface FactorTreeStep3ActivityProps {
  stepId?: number
  className?: string
}

export function FactorTreeStep3Activity({
  stepId = 3,
  className,
}: FactorTreeStep3ActivityProps) {
  const { isSolved } = useSlideProgress()
  const isGloballySolved = isSolved(stepId)

  const [quizUnlocked, setQuizUnlocked] = useState(false)
  const [reviewComplete, setReviewComplete] = useState(false)

  const handleCompleteChange = (isComplete: boolean) => {
    if (isComplete) setQuizUnlocked(true)
  }

  const handleReviewComplete = useCallback(() => {
    setReviewComplete(true)
  }, [])

  useEffect(() => {
    if (quizUnlocked && isGloballySolved) setReviewComplete(true)
  }, [quizUnlocked, isGloballySolved])

  return (
    <div className={className}>
      <FactorTreeStepperMotion className="mb-3" onCompleteChange={handleCompleteChange} />

      {quizUnlocked ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <FactorTreeReviewFillQuiz stepId={stepId} onComplete={handleReviewComplete} />
        </motion.div>
      ) : null}

      {reviewComplete ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <QuizArea
            stepId={stepId}
            quiz={FINAL_QUIZ}
            renderBlank={(blank) => <>36을 소인수분해하면 {blank}</>}
          />
        </motion.div>
      ) : null}
    </div>
  )
}
