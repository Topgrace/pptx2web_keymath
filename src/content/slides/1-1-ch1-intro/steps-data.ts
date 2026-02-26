import type { Step } from '@/schemas/step'

export const steps: Step[] = [
  {
    id: 0,
    type: 'intro',
    cardVariant: 'default',
  },
  {
    id: 1,
    type: 'concept',
    cardVariant: 'white',
  },
  {
    id: 2,
    type: 'concept',
    cardVariant: 'white',
  },
]

export const quizStepIds = new Set<number>()
