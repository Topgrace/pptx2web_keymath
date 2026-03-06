import type { Step } from '@/schemas/step'

const rawSteps = [
  {
    id: 0,
    type: 'intro',
    cardVariant: 'default',
    quiz: {
      answer: '제곱인 수',
      blankType: 'normal',
      choices: [
        { label: '제곱인 수', value: '제곱인 수' },
        { label: '소인수', value: '소인수' },
        { label: '거듭제곱', value: '거듭제곱' },
        { label: '합성수', value: '합성수' },
      ],
    },
  },
  {
    id: 1,
    type: 'concept',
    cardVariant: 'white',
    quiz: {
      answer: '49',
      blankType: 'normal',
      choices: [
        { label: '36', value: '36' },
        { label: '42', value: '42' },
        { label: '49', value: '49' },
        { label: '50', value: '50' },
      ],
    },
  },
  {
    id: 2,
    type: 'concept',
    cardVariant: 'white',
    quiz: {
      answer: '짝수',
      blankType: 'normal',
      choices: [
        { label: '홀수', value: '홀수' },
        { label: '짝수', value: '짝수' },
        { label: '소수', value: '소수' },
        { label: '1', value: '1' },
      ],
    },
  },
  {
    id: 3,
    type: 'note',
    cardVariant: 'default',
    quiz: {
      answer: '2',
      blankType: 'normal',
      choices: [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
      ],
    },
  },
  {
    id: 4,
    type: 'note',
    cardVariant: 'default',
    quiz: {
      answer: '4',
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
    id: 5,
    type: 'practice',
    cardVariant: 'white',
    quiz: {
      answer: '제곱인 수이다',
      blankType: 'normal',
      choices: [
        { label: '제곱인 수이다', value: '제곱인 수이다' },
        { label: '제곱인 수가 아니다', value: '제곱인 수가 아니다' },
      ],
    },
  },
  {
    id: 6,
    type: 'practice',
    cardVariant: 'white',
    quiz: {
      answer: 'interactive',
      blankType: 'normal',
      choices: [],
    },
  },
  {
    id: 7,
    type: 'summary',
    cardVariant: 'white',
    quiz: {
      answer: '짝수',
      blankType: 'normal',
      choices: [
        { label: '홀수', value: '홀수' },
        { label: '짝수', value: '짝수' },
        { label: '소수', value: '소수' },
        { label: '자연수', value: '자연수' },
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
