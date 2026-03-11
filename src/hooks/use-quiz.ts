import { useCallback, useMemo, useState } from 'react'
import type { MultiQuiz, MultiQuizItem, SingleQuiz } from '@/schemas/step'

type QuizFeedbackType = 'success' | 'fail' | null

interface UseQuizReturn {
  isOpen: boolean
  isSolved: boolean
  feedback: string | null
  feedbackType: QuizFeedbackType
  toggleOpen: () => void
  checkAnswer: (value: string) => boolean
  solvedAnswer: string | null
}

interface MultiBlankAnswerResult {
  isCorrect: boolean
  isComplete: boolean
}

interface UseMultiBlankQuizReturn {
  activeItem: MultiQuizItem | null
  activeBlankId: string | null
  feedback: string | null
  feedbackType: QuizFeedbackType
  solvedAnswers: Record<string, string>
  toggleBlank: (blankId: string) => void
  checkAnswer: (value: string) => MultiBlankAnswerResult
}

const toSolvedAnswer = (item: Pick<MultiQuizItem, 'answer' | 'answerLatex'>) =>
  item.answerLatex ?? item.answer

const buildSolvedAnswerMap = (quiz: MultiQuiz) =>
  Object.fromEntries(quiz.items.map((item) => [item.id, toSolvedAnswer(item)]))

export const useQuiz = (quiz: SingleQuiz | undefined): UseQuizReturn => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSolved, setIsSolved] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [feedbackType, setFeedbackType] = useState<QuizFeedbackType>(null)
  const [solvedAnswer, setSolvedAnswer] = useState<string | null>(null)

  const toggleOpen = useCallback(() => {
    if (!isSolved) {
      setIsOpen((prev) => !prev)
    }
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
      }

      setFeedback('❌ 다시 생각해보세요!')
      setFeedbackType('fail')
      setTimeout(() => {
        setFeedback(null)
        setFeedbackType(null)
      }, 1000)
      return false
    },
    [quiz, isSolved],
  )

  return { isOpen, isSolved, feedback, feedbackType, toggleOpen, checkAnswer, solvedAnswer }
}

export const useMultiBlankQuiz = (
  quiz: MultiQuiz | undefined,
  isStepSolved: boolean,
): UseMultiBlankQuizReturn => {
  const [activeBlankId, setActiveBlankId] = useState<string | null>(null)
  const [localSolvedAnswers, setLocalSolvedAnswers] = useState<Record<string, string>>({})
  const [feedback, setFeedback] = useState<string | null>(null)
  const [feedbackType, setFeedbackType] = useState<QuizFeedbackType>(null)

  const solvedAnswers = useMemo(() => {
    if (!quiz) return {}
    if (isStepSolved) return buildSolvedAnswerMap(quiz)
    return localSolvedAnswers
  }, [isStepSolved, localSolvedAnswers, quiz])

  const nextBlankId = useMemo(() => {
    if (!quiz || isStepSolved) return null
    return quiz.items.find((item) => !localSolvedAnswers[item.id])?.id ?? null
  }, [isStepSolved, localSolvedAnswers, quiz])

  const activeItem = useMemo(() => {
    if (!quiz || isStepSolved || !activeBlankId) return null
    return quiz.items.find((item) => item.id === activeBlankId) ?? null
  }, [activeBlankId, isStepSolved, quiz])

  const toggleBlank = useCallback(
    (blankId: string) => {
      if (!quiz || isStepSolved) return
      if (solvedAnswers[blankId]) return
      if (blankId !== nextBlankId && blankId !== activeBlankId) return

      setActiveBlankId((prev) => (prev === blankId ? null : blankId))
      setFeedback(null)
      setFeedbackType(null)
    },
    [activeBlankId, isStepSolved, nextBlankId, quiz, solvedAnswers],
  )

  const checkAnswer = useCallback(
    (value: string): MultiBlankAnswerResult => {
      if (!quiz || isStepSolved || !activeItem) {
        return { isCorrect: false, isComplete: false }
      }

      if (value !== activeItem.answer) {
        setFeedback('❌ 다시 생각해보세요!')
        setFeedbackType('fail')
        setTimeout(() => {
          setFeedback(null)
          setFeedbackType(null)
        }, 1000)
        return { isCorrect: false, isComplete: false }
      }

      const nextSolvedAnswers = {
        ...localSolvedAnswers,
        [activeItem.id]: toSolvedAnswer(activeItem),
      }

      setLocalSolvedAnswers(nextSolvedAnswers)
      setFeedback(null)
      setFeedbackType(null)

      const nextItem = quiz.items.find((item) => !nextSolvedAnswers[item.id]) ?? null
      setActiveBlankId(nextItem?.id ?? null)

      return {
        isCorrect: true,
        isComplete: nextItem === null,
      }
    },
    [activeItem, isStepSolved, localSolvedAnswers, quiz],
  )

  return {
    activeItem,
    activeBlankId,
    feedback,
    feedbackType,
    solvedAnswers,
    toggleBlank,
    checkAnswer,
  }
}
