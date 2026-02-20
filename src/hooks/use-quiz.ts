import { useState, useCallback } from 'react'
import type { Quiz } from '@/schemas/step'

interface UseQuizReturn {
  isOpen: boolean
  isSolved: boolean
  feedback: string | null
  feedbackType: 'success' | 'fail' | null
  toggleOpen: () => void
  checkAnswer: (value: string) => boolean
  solvedAnswer: string | null
}

export function useQuiz(quiz: Quiz | undefined): UseQuizReturn {
  const [isOpen, setIsOpen] = useState(false)
  const [isSolved, setIsSolved] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [feedbackType, setFeedbackType] = useState<'success' | 'fail' | null>(null)
  const [solvedAnswer, setSolvedAnswer] = useState<string | null>(null)

  const toggleOpen = useCallback(() => {
    if (!isSolved) setIsOpen(prev => !prev)
  }, [isSolved])

  const checkAnswer = useCallback(
    (value: string): boolean => {
      if (!quiz || isSolved) return false

      if (value === quiz.answer) {
        setIsSolved(true)
        setSolvedAnswer(quiz.answerLatex ?? quiz.answer)
        setFeedback(null)
        setFeedbackType('success')
        setTimeout(() => setIsOpen(false), 600)
        return true
      } else {
        setFeedback('❌ 다시 생각해보세요!')
        setFeedbackType('fail')
        setTimeout(() => {
          setFeedback(null)
          setFeedbackType(null)
        }, 1000)
        return false
      }
    },
    [quiz, isSolved],
  )

  return { isOpen, isSolved, feedback, feedbackType, toggleOpen, checkAnswer, solvedAnswer }
}
