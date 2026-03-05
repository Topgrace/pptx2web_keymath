import { useState } from 'react'
import { motion } from 'framer-motion'
import { PrimeDivisionReviewFillQuiz } from '@/components/content/prime-division-review-fill-quiz'
import { PrimeDivisionStepperMotion } from '@/components/content/prime-division-stepper-motion'

interface PrimeDivisionStep2ActivityProps {
  stepId?: number
  className?: string
}

export function PrimeDivisionStep2Activity({
  stepId = 2,
  className,
}: PrimeDivisionStep2ActivityProps) {
  const [quizUnlocked, setQuizUnlocked] = useState(false)

  const handleCompleteChange = (isComplete: boolean) => {
    if (isComplete) {
      setQuizUnlocked(true)
    }
  }

  return (
    <div className={className}>
      <PrimeDivisionStepperMotion className="mb-3" onCompleteChange={handleCompleteChange} />

      {quizUnlocked ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <PrimeDivisionReviewFillQuiz stepId={stepId} />
        </motion.div>
      ) : null}
    </div>
  )
}

