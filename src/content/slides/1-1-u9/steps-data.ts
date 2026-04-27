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
  {
    id: 2,
    type: 'concept',
    cardVariant: 'white',
  },
  {
    id: 3,
    type: 'concept',
    cardVariant: 'white',
  },
  {
    id: 4,
    type: 'practice',
    cardVariant: 'white',
    quiz: {
      kind: 'multi',
      items: [
        {
          id: 'q1',
          answer: '양의 정수',
          blankType: 'normal',
          choices: [
            { label: '양의 정수', value: '양의 정수' },
            { label: '음의 정수', value: '음의 정수' },
          ],
        },
        {
          id: 'q2',
          answer: '정수',
          blankType: 'normal',
          choices: [
            { label: '자연수', value: '자연수' },
            { label: '정수', value: '정수' },
          ],
        },
        {
          id: 'q3',
          answer: '음의 정수',
          blankType: 'normal',
          choices: [
            { label: '자연수', value: '자연수' },
            { label: '음의 정수', value: '음의 정수' },
          ],
        },
        {
          id: 'q4',
          answer: '정수가 아닌 유리수',
          blankType: 'normal',
          choices: [
            { label: '정수', value: '정수' },
            { label: '정수가 아닌 유리수', value: '정수가 아닌 유리수' },
          ],
        },
        {
          id: 'q5',
          answer: '유리수',
          blankType: 'normal',
          choices: [
            { label: '정수', value: '정수' },
            { label: '유리수', value: '유리수' },
          ],
        },
        {
          id: 'q6',
          answer: '양의 유리수',
          blankType: 'normal',
          choices: [
            { label: '양의 유리수', value: '양의 유리수' },
            { label: '음의 유리수', value: '음의 유리수' },
          ],
        },
      ],
    },
  },
  {
    id: 5,
    type: 'concept',
    cardVariant: 'white',
  },
  {
    id: 6,
    type: 'concept',
    cardVariant: 'white',
  },
  {
    id: 7,
    type: 'practice',
    cardVariant: 'white',
    quiz: {
      kind: 'multi',
      items: [
        {
          id: 'q1',
          answer: '-6 ℃',
          blankType: 'normal',
          choices: [
            { label: '-6 ℃', value: '-6 ℃' },
            { label: '+6 ℃', value: '+6 ℃' },
          ],
        },
        {
          id: 'q2',
          answer: '+2년',
          blankType: 'normal',
          choices: [
            { label: '+2년', value: '+2년' },
            { label: '-2년', value: '-2년' },
          ],
        },
        {
          id: 'q3',
          answer: '-4 kg',
          blankType: 'normal',
          choices: [
            { label: '-4 kg', value: '-4 kg' },
            { label: '+4 kg', value: '+4 kg' },
          ],
        },
        {
          id: 'q4',
          answer: '+10 m',
          blankType: 'normal',
          choices: [
            { label: '+10 m', value: '+10 m' },
            { label: '-10 m', value: '-10 m' },
          ],
        },
        {
          id: 'q5',
          answer: '+10점',
          blankType: 'normal',
          choices: [
            { label: '+10점', value: '+10점' },
            { label: '-10점', value: '-10점' },
          ],
        },
        {
          id: 'q6',
          answer: '-200 m',
          blankType: 'normal',
          choices: [
            { label: '-200 m', value: '-200 m' },
            { label: '+200 m', value: '+200 m' },
          ],
        },
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

export const quizStepIds: Set<number> = new Set([0, 1, 2, 3, 4, 5, 6, 7])
