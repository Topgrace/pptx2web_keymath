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
      ],
    },
  },
  {
    id: 1,
    type: 'concept',
    cardVariant: 'white',
    quiz: {
      kind: 'multi',
      items: [
        {
          id: 'multiples',
          answer: '3의 배수이자 7의 배수',
          blankType: 'normal',
          choices: [
            { label: '3의 배수이자 7의 배수', value: '3의 배수이자 7의 배수' },
            { label: '3의 약수이자 7의 약수', value: '3의 약수이자 7의 약수' },
            { label: '3과 7의 공약수', value: '3과 7의 공약수' },
          ],
        },
        {
          id: 'divisors',
          answer: '3, 7',
          blankType: 'normal',
          choices: [
            { label: '3, 7', value: '3, 7' },
            { label: '1, 21', value: '1, 21' },
            { label: '3, 21', value: '3, 21' },
            { label: '7, 21', value: '7, 21' },
          ],
        },
        {
          id: 'target',
          answer: '21',
          blankType: 'normal',
          choices: [
            { label: '14', value: '14' },
            { label: '21', value: '21' },
            { label: '28', value: '28' },
            { label: '35', value: '35' },
          ],
        },
      ],
    },
  },
  {
    id: 2,
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
    id: 3,
    type: 'note',
    cardVariant: 'default',
    quiz: {
      kind: 'multi',
      items: [
        {
          id: 'prime-power-count',
          answer: '9',
          blankType: 'normal',
          choices: [
            { label: '7', value: '7' },
            { label: '8', value: '8' },
            { label: '9', value: '9' },
            { label: '10', value: '10' },
          ],
        },
        {
          id: 'non-prime-power-count',
          answer: '5',
          blankType: 'normal',
          choices: [
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' },
            { label: '6', value: '6' },
          ],
        },
      ],
    },
  },
  {
    id: 4,
    type: 'concept',
    cardVariant: 'white',
    quiz: {
      answer: '20',
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
      answer: '(p+1)×(q+1)',
      answerLatex: '(p+1)\\times(q+1)',
      blankType: 'normal',
      choices: [
        { label: 'p×q', value: 'p×q', latex: 'p\\times q' },
        { label: '(p+1)×(q+1)', value: '(p+1)×(q+1)', latex: '(p+1)\\times(q+1)' },
        { label: '(p+q)', value: '(p+q)', latex: '(p+q)' },
        { label: 'p×q+1', value: 'p×q+1', latex: 'p\\times q+1' },
      ],
    },
  },
  {
    id: 6,
    type: 'practice',
    cardVariant: 'white',
    quiz: {
      answer: '48',
      blankType: 'normal',
      choices: [
        { label: '24', value: '24' },
        { label: '36', value: '36' },
        { label: '48', value: '48' },
        { label: '64', value: '64' },
      ],
    },
  },
  {
    id: 7,
    type: 'summary',
    cardVariant: 'white',
    quiz: {
      answer: '7',
      blankType: 'exponent',
      choices: [
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' },
        { label: '8', value: '8' },
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

export const quizStepIds: Set<number> = new Set([
  1,
  ...steps.filter((step) => step.quiz).map((step) => step.id),
])
