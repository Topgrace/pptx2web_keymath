import type { ReactNode } from 'react'
import type { Quiz } from '@/schemas/step'
import { MultiBlankQuizArea } from './multi-blank-quiz-area'
import { SingleBlankQuizArea } from './single-blank-quiz-area'

interface QuizAreaProps {
  stepId: number
  quiz: Quiz
  /** Single blank question content rendered before the blank by default. */
  questionContent?: ReactNode
  /** Single blank renderer for custom inline placement. */
  renderBlank?: (blank: ReactNode) => ReactNode
  /** Multi blank renderer for inline placement by blank id. */
  renderBlanks?: (blank: (id: string) => ReactNode) => ReactNode
  /** Optional content shown after solving before auto-advancing. */
  completionContent?: ReactNode
  /** Auto-advance delay when completionContent is shown. */
  completionAdvanceDelayMs?: number
}

export const QuizArea = ({
  stepId,
  quiz,
  questionContent,
  renderBlank,
  renderBlanks,
  completionContent,
  completionAdvanceDelayMs,
}: QuizAreaProps) => {
  if (quiz.kind === 'multi') {
    return (
      <MultiBlankQuizArea
        stepId={stepId}
        quiz={quiz}
        renderBlanks={renderBlanks}
        completionContent={completionContent}
        completionAdvanceDelayMs={completionAdvanceDelayMs}
      />
    )
  }

  return (
    <SingleBlankQuizArea
      stepId={stepId}
      quiz={quiz}
      questionContent={questionContent}
      renderBlank={renderBlank}
      completionContent={completionContent}
      completionAdvanceDelayMs={completionAdvanceDelayMs}
    />
  )
}
