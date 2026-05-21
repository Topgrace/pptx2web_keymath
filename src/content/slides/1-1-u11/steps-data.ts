import type { Step } from '@/schemas/step'

const rawSteps = [
  {
    id: 0,
    type: 'intro',
    cardVariant: 'default',
    quiz: {
      answer: '30',
      blankType: 'normal',
      questionLabel: '수직선 위의 두 점 A(-12), B(18) 사이의 거리는 얼마일까?',
      choices: [
        { label: '30', value: '30' },
        { label: '18', value: '18' },
        { label: '12', value: '12' },
        { label: '-30', value: '-30' },
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
    type: 'practice',
    cardVariant: 'white',
    quiz: {
      kind: 'multi',
      questionLabel: '절댓값에 맞는 수 찾기',
      items: [
        {
          id: 'abs5',
          answer: '+5, -5',
          blankType: 'normal',
          choices: [
            { label: '+5, -5', value: '+5, -5' },
            { label: '+5', value: '+5' },
            { label: '-5', value: '-5' },
            { label: '없음', value: '없음' },
          ],
        },
        {
          id: 'abs0',
          answer: '0',
          blankType: 'normal',
          choices: [
            { label: '0', value: '0' },
            { label: '+1, -1', value: '+1, -1' },
            { label: '+5, -5', value: '+5, -5' },
            { label: '없음', value: '없음' },
          ],
        },
        {
          id: 'absNegative',
          answer: '없음',
          blankType: 'normal',
          choices: [
            { label: '없음', value: '없음' },
            { label: '+1, -1', value: '+1, -1' },
            { label: '-1', value: '-1' },
            { label: '0', value: '0' },
          ],
        },
      ],
    },
  },
  {
    id: 4,
    type: 'concept',
    cardVariant: 'white',
  },
  {
    id: 5,
    type: 'concept',
    cardVariant: 'white',
    quiz: {
      answer: '-2',
      blankType: 'normal',
      questionLabel: '수직선에서 -5와 -2 중 더 큰 수는?',
      choices: [
        { label: '-2', value: '-2' },
        { label: '-5', value: '-5' },
        { label: '0', value: '0' },
      ],
    },
  },
  {
    id: 6,
    type: 'practice',
    cardVariant: 'white',
    quiz: {
      kind: 'multi',
      questionLabel: '절댓값과 수의 크기 비교',
      items: [
        {
          id: 'largerAbs',
          answer: '|-4|',
          blankType: 'normal',
          choices: [
            { label: '|-4|', value: '|-4|' },
            { label: '|+2|', value: '|+2|' },
            { label: '같다', value: '같다' },
          ],
        },
        {
          id: 'largerNegative',
          answer: '-2',
          blankType: 'normal',
          choices: [
            { label: '-5', value: '-5' },
            { label: '-2', value: '-2' },
            { label: '0', value: '0' },
          ],
        },
        {
          id: 'ascendingOrder',
          answer: '-3 < 0 < +2',
          blankType: 'normal',
          choices: [
            { label: '-3 < 0 < +2', value: '-3 < 0 < +2' },
            { label: '+2 < 0 < -3', value: '+2 < 0 < -3' },
            { label: '0 < -3 < +2', value: '0 < -3 < +2' },
          ],
        },
      ],
    },
  },
  {
    id: 7,
    type: 'complete',
    cardVariant: 'default',
  },
] satisfies Step[]

export const steps = rawSteps

export const quizStepIds: Set<number> = new Set(
  [2, ...steps.filter((step) => step.quiz).map((step) => step.id)],
)
