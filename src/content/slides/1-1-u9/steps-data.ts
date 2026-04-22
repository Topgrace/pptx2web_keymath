import type { Step } from '@/schemas/step'

const rawSteps = [
  {
    id: 0,
    type: 'intro',
    cardVariant: 'default',
    quiz: {
      answer: '음수',
      blankType: 'normal',
      questionLabel: '양수의 반대말은 뭘까?',
      choices: [
        { label: '음수', value: '음수' },
        { label: '양의 정수', value: '양의 정수' },
        { label: '자연수', value: '자연수' },
        { label: '정수', value: '정수' },
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
