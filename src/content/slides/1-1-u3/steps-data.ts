import type { Step } from '@/schemas/step'
import { StepSchema } from '@/schemas/step'

const rawSteps: Step[] = [
  {
    id: 0,
    type: 'intro',
    cardVariant: 'default',
    quiz: {
      answer: '소인수분해',
      blankType: 'normal',
      choices: [
        { label: '소인수분해', value: '소인수분해' },
        { label: '인수분해', value: '인수분해' },
        { label: '약수 구하기', value: '약수 구하기' },
        { label: '소수 판별', value: '소수 판별' },
      ],
    },
  },
  {
    id: 1,
    type: 'definition',
    cardVariant: 'default',
    quiz: {
      answer: '2^2 \\times 3',
      answerLatex: '2^2 \\times 3',
      blankType: 'normal',
      choices: [
        { label: '2^2 × 3', value: '2^2 \\times 3', latex: '2^2 \\times 3' },
        { label: '2 × 6', value: '2 \\times 6', latex: '2 \\times 6' },
        { label: '3 × 4', value: '3 \\times 4', latex: '3 \\times 4' },
      ],
    },
  },
  {
    id: 2,
    type: 'concept',
    cardVariant: 'white',
    quiz: {
      answer: '두 가지',
      blankType: 'normal',
      choices: [
        { label: '한 가지', value: '한 가지' },
        { label: '두 가지', value: '두 가지' },
        { label: '세 가지', value: '세 가지' },
        { label: '네 가지', value: '네 가지' },
      ],
    },
  },
  {
    id: 3,
    type: 'concept',
    cardVariant: 'white',
    quiz: {
      answer: '3',
      blankType: 'normal',
      choices: [
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '6', value: '6' },
      ],
    },
  },
  {
    id: 4,
    type: 'note',
    cardVariant: 'default',
    quiz: {
      answer: '3',
      blankType: 'normal',
      choices: [
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
      ],
    },
  },
  {
    id: 5,
    type: 'summary',
    cardVariant: 'white',
    quiz: {
      answer: '소수들만의 곱',
      blankType: 'normal',
      choices: [
        { label: '홀수만', value: '홀수만' },
        { label: '짝수만', value: '짝수만' },
        { label: '소수들만의 곱', value: '소수들만의 곱' },
        { label: '약수만', value: '약수만' },
      ],
    },
  },
  {
    id: 6,
    type: 'complete',
    cardVariant: 'default',
  },
]

export const steps: Step[] = rawSteps.map((step) => StepSchema.parse(step))

export const quizStepIds: Set<number> = new Set(
  steps.filter((step) => step.quiz).map((step) => step.id),
)
