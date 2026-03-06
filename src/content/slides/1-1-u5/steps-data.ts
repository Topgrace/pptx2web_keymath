import type { Step } from '@/schemas/step'

const rawSteps = [
  {
    id: 0,
    type: 'intro',
    cardVariant: 'default',
    quiz: {
      answer: '약수',
      blankType: 'normal',
      choices: [
        { label: '약수', value: '약수' },
        { label: '배수', value: '배수' },
        { label: '소수', value: '소수' },
        { label: '인수', value: '인수' },
      ],
    },
  },
  {
    id: 1,
    type: 'concept',
    cardVariant: 'white',
    quiz: {
      answer: '6',
      blankType: 'normal',
      choices: [
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '8', value: '8' },
      ],
    },
  },
  {
    id: 2,
    type: 'concept',
    cardVariant: 'white',
    quiz: {
      answer: '5',
      blankType: 'normal',
      choices: [
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '8', value: '8' },
      ],
    },
  },
  {
    id: 3,
    type: 'note',
    cardVariant: 'default',
    quiz: {
      answer: '(n+1)',
      blankType: 'normal',
      choices: [
        { label: 'n', value: 'n' },
        { label: '(n+1)', value: '(n+1)' },
        { label: '(n-1)', value: '(n-1)' },
        { label: '2n', value: '2n' },
      ],
    },
  },
  {
    id: 4,
    type: 'concept',
    cardVariant: 'white',
    quiz: {
      answer: '15',
      blankType: 'normal',
      choices: [
        { label: '10', value: '10' },
        { label: '12', value: '12' },
        { label: '15', value: '15' },
        { label: '20', value: '20' },
      ],
    },
  },
  {
    id: 5,
    type: 'note',
    cardVariant: 'default',
    quiz: {
      answer: '(m+1)×(n+1)',
      blankType: 'normal',
      choices: [
        { label: 'm×n', value: 'm×n' },
        { label: '(m+1)×(n+1)', value: '(m+1)×(n+1)' },
        { label: '(m+n)', value: '(m+n)' },
        { label: 'm×n+1', value: 'm×n+1' },
      ],
    },
  },
  {
    id: 6,
    type: 'practice',
    cardVariant: 'white',
    quiz: {
      answer: '24',
      blankType: 'normal',
      choices: [
        { label: '18', value: '18' },
        { label: '20', value: '20' },
        { label: '24', value: '24' },
        { label: '30', value: '30' },
      ],
    },
  },
  {
    id: 7,
    type: 'summary',
    cardVariant: 'white',
    quiz: {
      answer: '(n+1)',
      blankType: 'normal',
      choices: [
        { label: 'n', value: 'n' },
        { label: '(n+1)', value: '(n+1)' },
        { label: '(n-1)', value: '(n-1)' },
        { label: '2n', value: '2n' },
      ],
    },
  },
  {
    id: 8,
    type: 'complete',
    cardVariant: 'default',
  },
] satisfies Step[]

export const steps = rawSteps

export const quizStepIds: Set<number> = new Set(
  steps.filter((step) => step.quiz).map((step) => step.id),
)
