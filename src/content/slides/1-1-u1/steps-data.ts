import type { Step } from '@/schemas/step'
import { StepSchema } from '@/schemas/step'

const rawSteps: Step[] = [
  {
    id: 0, type: 'intro', cardVariant: 'default',
    quiz: {
      answer: '소수',
      blankType: 'normal',
      choices: [
        { label: '소수', value: '소수' },
        { label: '합성수', value: '합성수' },
        { label: '둘 다 아님', value: '둘 다 아님' },
      ],
    },
  },
  {
    id: 1, type: 'concept', cardVariant: 'white',
  },
  {
    id: 2, type: 'concept', cardVariant: 'white',
    quiz: {
      answer: '2개',
      blankType: 'normal',
      choices: [
        { label: '1개', value: '1개' },
        { label: '2개', value: '2개' },
        { label: '3개', value: '3개' },
        { label: '4개 이상', value: '4개 이상' },
      ],
    },
  },
  {
    id: 3, type: 'concept', cardVariant: 'default',
    quiz: {
      answer: '3개 이상',
      blankType: 'normal',
      choices: [
        { label: '1개', value: '1개' },
        { label: '2개', value: '2개' },
        { label: '3개 이상', value: '3개 이상' },
        { label: '항상 4개', value: '항상 4개' },
      ],
    },
  },
  {
    id: 4, type: 'note', cardVariant: 'default',
    quiz: {
      answer: '홀수',
      blankType: 'normal',
      choices: [
        { label: '4의 배수', value: '4의 배수' },
        { label: '3의 배수', value: '3의 배수' },
        { label: '짝수', value: '짝수' },
        { label: '홀수', value: '홀수' },
      ],
    },
  },
  {
    id: 5, type: 'concept', cardVariant: 'white',
    quiz: {
      answer: '합성수',
      blankType: 'normal',
      choices: [
        { label: '소수', value: '소수' },
        { label: '합성수', value: '합성수' },
        { label: '둘 다 아님', value: '둘 다 아님' },
      ],
    },
  },
  {
    id: 6, type: 'note', cardVariant: 'default',
    quiz: {
      answer: '1개',
      blankType: 'normal',
      choices: [
        { label: '1개', value: '1개' },
        { label: '2개', value: '2개' },
        { label: '3개 이상', value: '3개 이상' },
      ],
    },
  },
  {
    id: 7, type: 'note', cardVariant: 'white',
    quiz: {
      answer: '소수(小數)',
      blankType: 'normal',
      choices: [
        { label: '소수(素數)', value: '소수(素數)' },
        { label: '합성수', value: '합성수' },
        { label: '소수(小數)', value: '소수(小數)' },
        { label: '정수', value: '정수' },
      ],
    },
  },
  {
    id: 8, type: 'practice', cardVariant: 'white',
    quiz: {
      answer: '합성수',
      blankType: 'normal',
      choices: [
        { label: '소수', value: '소수' },
        { label: '합성수', value: '합성수' },
        { label: '둘 다 아님', value: '둘 다 아님' },
        { label: '소수(小數)', value: '소수(小數)' },
      ],
    },
  },
  {
    id: 9, type: 'practice', cardVariant: 'white',
    quiz: {
      answer: '합성수',
      blankType: 'normal',
      choices: [
        { label: '소수', value: '소수' },
        { label: '합성수', value: '합성수' },
        { label: '둘 다 아님', value: '둘 다 아님' },
        { label: '판단 불가', value: '판단 불가' },
      ],
    },
  },
  {
    id: 10, type: 'summary', cardVariant: 'white',
    quiz: {
      answer: '소수',
      blankType: 'normal',
      choices: [
        { label: '소수', value: '소수' },
        { label: '합성수', value: '합성수' },
        { label: '소수(小數)', value: '소수(小數)' },
        { label: '둘 다 아님', value: '둘 다 아님' },
      ],
    },
  },
  {
    id: 11, type: 'complete', cardVariant: 'default',
  },
]

export const steps: Step[] = rawSteps.map((s) => StepSchema.parse(s))

export const quizStepIds: Set<number> = new Set([0, 2, 3, 4, 5, 6, 7, 8, 9, 10])
