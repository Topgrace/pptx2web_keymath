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
    type: 'complete',
    cardVariant: 'default',
  },
] satisfies Step[]

export const steps = rawSteps

export const quizStepIds: Set<number> = new Set([0, 1, 2, 3, 4])
