import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
  type ReactNode,
} from 'react'

interface SlideState {
  currentStep: number
  solvedQuizzes: Set<number>
  totalSteps: number
}

type SlideAction =
  | { type: 'ADVANCE_STEP' }
  | { type: 'SHOW_STEP'; step: number }
  | { type: 'MARK_SOLVED'; stepId: number }
  | { type: 'RESET' }

function slideReducer(state: SlideState, action: SlideAction): SlideState {
  switch (action.type) {
    case 'ADVANCE_STEP':
      if (state.currentStep >= state.totalSteps - 1) return state
      return { ...state, currentStep: state.currentStep + 1 }
    case 'SHOW_STEP':
      return { ...state, currentStep: action.step }
    case 'MARK_SOLVED': {
      const next = new Set(state.solvedQuizzes)
      next.add(action.stepId)
      return { ...state, solvedQuizzes: next }
    }
    case 'RESET':
      return { currentStep: 0, solvedQuizzes: new Set(), totalSteps: state.totalSteps }
    default:
      return state
  }
}

interface SlideProgressContextValue {
  currentStep: number
  solvedQuizzes: Set<number>
  totalSteps: number
  progressPercent: number
  isComplete: boolean
  advanceStep: () => void
  showStep: (step: number) => void
  markSolved: (stepId: number) => void
  reset: () => void
  isSolved: (stepId: number) => boolean
  nextButtonState: 'locked' | 'unlocked' | 'done'
  /** IDs of quiz-having steps (set externally) */
  quizStepIds: Set<number>
}

const SlideProgressContext = createContext<SlideProgressContextValue | null>(null)

export function SlideProgressProvider({
  children,
  totalSteps,
  quizStepIds,
}: {
  children: ReactNode
  totalSteps: number
  quizStepIds: Set<number>
}) {
  const [state, dispatch] = useReducer(slideReducer, {
    currentStep: 0,
    solvedQuizzes: new Set<number>(),
    totalSteps,
  })

  const advanceStep = useCallback(() => dispatch({ type: 'ADVANCE_STEP' }), [])
  const showStep = useCallback((step: number) => dispatch({ type: 'SHOW_STEP', step }), [])
  const markSolved = useCallback((stepId: number) => dispatch({ type: 'MARK_SOLVED', stepId }), [])
  const reset = useCallback(() => dispatch({ type: 'RESET' }), [])
  const isSolved = useCallback((stepId: number) => state.solvedQuizzes.has(stepId), [state.solvedQuizzes])

  const progressPercent = useMemo(
    () => ((state.currentStep + 1) / state.totalSteps) * 100,
    [state.currentStep, state.totalSteps],
  )

  const isComplete = state.currentStep >= state.totalSteps - 1

  const nextButtonState = useMemo((): 'locked' | 'unlocked' | 'done' => {
    if (isComplete) return 'done'
    // If current step has a quiz that isn't solved, lock
    if (quizStepIds.has(state.currentStep) && !state.solvedQuizzes.has(state.currentStep)) {
      return 'locked'
    }
    return 'unlocked'
  }, [isComplete, quizStepIds, state.currentStep, state.solvedQuizzes])

  const value = useMemo(
    () => ({
      currentStep: state.currentStep,
      solvedQuizzes: state.solvedQuizzes,
      totalSteps: state.totalSteps,
      progressPercent,
      isComplete,
      advanceStep,
      showStep,
      markSolved,
      reset,
      isSolved,
      nextButtonState,
      quizStepIds,
    }),
    [state, progressPercent, isComplete, advanceStep, showStep, markSolved, reset, isSolved, nextButtonState, quizStepIds],
  )

  return (
    <SlideProgressContext.Provider value={value}>
      {children}
    </SlideProgressContext.Provider>
  )
}

export function useSlideProgress() {
  const ctx = useContext(SlideProgressContext)
  if (!ctx) throw new Error('useSlideProgress must be used within SlideProgressProvider')
  return ctx
}
