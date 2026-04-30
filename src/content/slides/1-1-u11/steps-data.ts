import type { Step } from '@/schemas/step'

const rawSteps = [
  {
    id: 0,
    type: 'intro',
    cardVariant: 'default',
    quiz: {
      answer: '30',
      blankType: 'normal',
      questionLabel: '수직선 위의 두 점 A(-12), B(18) 사이의 거리는 얼마일까?',
      choices: [
        { label: '30', value: '30' },
        { label: '18', value: '18' },
        { label: '12', value: '12' },
        { label: '-30', value: '-30' },
      ],
    },
  },
  {
    id: 1,
    type: 'concept',
    cardVariant: 'white',
  },
] satisfies Step[]

export const steps = rawSteps

export const quizStepIds: Set<number> = new Set(
  steps.filter((step) => step.quiz).map((step) => step.id),
)
