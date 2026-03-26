import { useSlideProgress } from '@/hooks/use-slide-progress'

export function useStepVisibility(stepId: number) {
  const { currentStep, showAllSteps } = useSlideProgress()
  return showAllSteps || currentStep >= stepId
}
