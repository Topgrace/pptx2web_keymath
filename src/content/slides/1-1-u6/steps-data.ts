import type { Step } from '@/schemas/step'

const rawSteps = [
  {
    id: 0,
    type: 'intro',
    cardVariant: 'default',
    quiz: {
      answer: '공약수',
      blankType: 'normal',
      choices: [
        { label: '공약수', value: '공약수' },
        { label: '최대공약수', value: '최대공약수' },
        { label: '공배수', value: '공배수' },
        { label: '최소공배수', value: '최소공배수' },
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
          id: 'term',
          answer: '공약수',
          blankType: 'normal',
          choices: [
            { label: '공약수', value: '공약수' },
            { label: '공배수', value: '공배수' },
            { label: '약수', value: '약수' },
            { label: '배수', value: '배수' },
          ],
        },
        {
          id: 'values',
          answer: '1, 2, 3, 6',
          blankType: 'normal',
          choices: [
            { label: '1, 2, 3, 6', value: '1, 2, 3, 6' },
            { label: '1, 2, 6', value: '1, 2, 6' },
            { label: '2, 3, 6', value: '2, 3, 6' },
            { label: '1, 3, 6', value: '1, 3, 6' },
          ],
        },
      ],
    },
  },
  {
    id: 2,
    type: 'note',
    cardVariant: 'default',
    quiz: {
      answer: '약수',
      blankType: 'normal',
      choices: [
        { label: '약수', value: '약수' },
        { label: '배수', value: '배수' },
        { label: '공배수', value: '공배수' },
        { label: '소인수', value: '소인수' },
      ],
    },
  },
  {
    id: 3,
    type: 'concept',
    cardVariant: 'white',
    quiz: {
      answer: '작은 것',
      blankType: 'normal',
      choices: [
        { label: '큰 것', value: '큰 것' },
        { label: '작은 것', value: '작은 것' },
        { label: '모두', value: '모두' },
        { label: '아무거나', value: '아무거나' },
      ],
    },
  },
  {
    id: 4,
    type: 'concept',
    cardVariant: 'white',
    quiz: {
      answer: '6',
      blankType: 'normal',
      choices: [
        { label: '3', value: '3' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '12', value: '12' },
      ],
    },
  },
  {
    id: 5,
    type: 'practice',
    cardVariant: 'white',
    quiz: {
      kind: 'multi',
      items: [
        {
          id: 'gcd',
          answer: '6',
          blankType: 'normal',
          choices: [
            { label: '3', value: '3' },
            { label: '6', value: '6' },
            { label: '9', value: '9' },
            { label: '12', value: '12' },
          ],
        },
        {
          id: 'common-divisors',
          answer: '1, 2, 3, 6',
          blankType: 'normal',
          choices: [
            { label: '1, 2, 3, 6', value: '1, 2, 3, 6' },
            { label: '1, 2, 6', value: '1, 2, 6' },
            { label: '2, 3, 6', value: '2, 3, 6' },
            { label: '1, 3, 6, 9', value: '1, 3, 6, 9' },
          ],
        },
      ],
    },
  },
  {
    id: 6,
    type: 'concept',
    cardVariant: 'white',
    quiz: {
      answer: '1',
      blankType: 'normal',
      choices: [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '5', value: '5' },
      ],
    },
  },
  {
    id: 7,
    type: 'summary',
    cardVariant: 'white',
    quiz: {
      answer: '서로소',
      blankType: 'normal',
      choices: [
        { label: '서로소', value: '서로소' },
        { label: '공배수', value: '공배수' },
        { label: '소인수', value: '소인수' },
        { label: '배수', value: '배수' },
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
