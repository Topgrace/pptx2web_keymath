import type { Step } from '@/schemas/step'

const rawSteps = [
  {
    id: 0,
    type: 'intro',
    cardVariant: 'default',
    quiz: {
      answer: '공배수',
      blankType: 'normal',
      choices: [
        { label: '공배수', value: '공배수' },
        { label: '최소공배수', value: '최소공배수' },
        { label: '공약수', value: '공약수' },
        { label: '최대공약수', value: '최대공약수' },
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
          answer: '공배수',
          blankType: 'normal',
          choices: [
            { label: '공배수', value: '공배수' },
            { label: '최소공배수', value: '최소공배수' },
            { label: '공약수', value: '공약수' },
            { label: '배수', value: '배수' },
          ],
        },
        {
          id: 'values',
          answer: '6, 12, 18, 24',
          blankType: 'normal',
          choices: [
            { label: '6, 12, 18, 24', value: '6, 12, 18, 24' },
            { label: '2, 4, 6, 8', value: '2, 4, 6, 8' },
            { label: '3, 6, 9, 12', value: '3, 6, 9, 12' },
            { label: '12, 18, 24, 30', value: '12, 18, 24, 30' },
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
      answer: '배수',
      blankType: 'normal',
      choices: [
        { label: '배수', value: '배수' },
        { label: '약수', value: '약수' },
        { label: '공약수', value: '공약수' },
        { label: '소인수', value: '소인수' },
      ],
    },
  },
  {
    id: 3,
    type: 'concept',
    cardVariant: 'white',
    quiz: {
      answer: '큰 것',
      blankType: 'normal',
      choices: [
        { label: '큰 것', value: '큰 것' },
        { label: '작은 것', value: '작은 것' },
        { label: '아무거나', value: '아무거나' },
        { label: '모두', value: '모두' },
      ],
    },
  },
  {
    id: 4,
    type: 'concept',
    cardVariant: 'white',
    quiz: {
      answer: '180',
      blankType: 'normal',
      choices: [
        { label: '90', value: '90' },
        { label: '120', value: '120' },
        { label: '180', value: '180' },
        { label: '360', value: '360' },
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
          id: 'lcm',
          answer: '36',
          blankType: 'normal',
          choices: [
            { label: '18', value: '18' },
            { label: '24', value: '24' },
            { label: '36', value: '36' },
            { label: '72', value: '72' },
          ],
        },
        {
          id: 'multiples',
          answer: '36, 72, 108',
          blankType: 'normal',
          choices: [
            { label: '36, 72, 108', value: '36, 72, 108' },
            { label: '12, 24, 36', value: '12, 24, 36' },
            { label: '18, 36, 54', value: '18, 36, 54' },
            { label: '24, 48, 72', value: '24, 48, 72' },
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
      answer: '마지막 몫까지',
      blankType: 'normal',
      choices: [
        { label: '나눈 수만', value: '나눈 수만' },
        { label: '첫 줄만', value: '첫 줄만' },
        { label: '마지막 몫까지', value: '마지막 몫까지' },
        { label: '공약수만', value: '공약수만' },
      ],
    },
  },
  {
    id: 7,
    type: 'summary',
    cardVariant: 'white',
    quiz: {
      answer: '최소공배수',
      blankType: 'normal',
      choices: [
        { label: '최소공배수', value: '최소공배수' },
        { label: '공약수', value: '공약수' },
        { label: '최대공약수', value: '최대공약수' },
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
