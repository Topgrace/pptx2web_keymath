import type { Step } from '@/schemas/step'

const rawSteps = [
  {
    id: 0,
    type: 'intro',
    cardVariant: 'default',
    quiz: {
      answer: '+',
      blankType: 'normal',
      questionLabel: '같은 부호의 두 수 (+2)+(+1)의 계산 결과는 어떤 부호일까?',
      choices: [
        { label: '+', value: '+' },
        { label: '−', value: '−' },
        { label: '0', value: '0' },
      ],
    },
  },
  {
    id: 1,
    type: 'concept',
    cardVariant: 'white',
    quiz: {
      answer: '+3',
      blankType: 'normal',
      questionLabel: '양수끼리 더하기의 최종 계산 결과',
      choices: [
        { label: '+3', value: '+3' },
        { label: '+1', value: '+1' },
        { label: '−3', value: '−3' },
      ],
    },
  },
  {
    id: 2,
    type: 'concept',
    cardVariant: 'white',
    quiz: {
      answer: '−3',
      blankType: 'normal',
      questionLabel: '음수끼리 더하기의 최종 계산 결과',
      choices: [
        { label: '−3', value: '−3' },
        { label: '−1', value: '−1' },
        { label: '+3', value: '+3' },
      ],
    },
  },
  {
    id: 3,
    type: 'concept',
    cardVariant: 'white',
    quiz: {
      answer: '+2',
      blankType: 'normal',
      questionLabel: '수직선에서 처음 오른쪽으로 이동한 양',
      choices: [
        { label: '+2', value: '+2' },
        { label: '+1', value: '+1' },
        { label: '+3', value: '+3' },
      ],
    },
  },
  {
    id: 4,
    type: 'concept',
    cardVariant: 'white',
    quiz: {
      answer: '−3',
      blankType: 'normal',
      questionLabel: '수직선에서 전체 왼쪽 이동량',
      choices: [
        { label: '−3', value: '−3' },
        { label: '−2', value: '−2' },
        { label: '+3', value: '+3' },
      ],
    },
  },
  {
    id: 5,
    type: 'concept',
    cardVariant: 'white',
    quiz: {
      kind: 'multi',
      questionLabel: '양수끼리 더하는 공식 정리',
      items: [
        {
          id: 'commonSign',
          answer: '+',
          blankType: 'normal',
          choices: [
            { label: '+', value: '+' },
            { label: '−', value: '−' },
            { label: '0', value: '0' },
          ],
        },
        {
          id: 'absoluteSum',
          answer: 'a+b',
          blankType: 'normal',
          choices: [
            { label: 'a+b', value: 'a+b' },
            { label: 'a−b', value: 'a−b' },
            { label: 'ab', value: 'ab' },
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
      kind: 'multi',
      questionLabel: '음수끼리 더하는 공식 정리',
      items: [
        {
          id: 'commonSign',
          answer: '−',
          blankType: 'normal',
          choices: [
            { label: '−', value: '−' },
            { label: '+', value: '+' },
            { label: '0', value: '0' },
          ],
        },
        {
          id: 'absoluteSum',
          answer: 'a+b',
          blankType: 'normal',
          choices: [
            { label: 'a+b', value: 'a+b' },
            { label: 'a−b', value: 'a−b' },
            { label: 'ab', value: 'ab' },
          ],
        },
      ],
    },
  },
  {
    id: 7,
    type: 'practice',
    cardVariant: 'white',
    quiz: {
      kind: 'multi',
      questionLabel: '같은 부호의 덧셈 확인문제',
      items: [
        {
          id: 'positiveSum',
          answer: '+7',
          blankType: 'normal',
          choices: [
            { label: '+7', value: '+7' },
            { label: '−7', value: '−7' },
            { label: '+1', value: '+1' },
          ],
        },
        {
          id: 'negativeSum',
          answer: '−7',
          blankType: 'normal',
          choices: [
            { label: '−7', value: '−7' },
            { label: '+7', value: '+7' },
            { label: '−3', value: '−3' },
          ],
        },
        {
          id: 'sameSignRule',
          answer: '공통의 부호',
          blankType: 'normal',
          choices: [
            { label: '공통의 부호', value: '공통의 부호' },
            { label: '큰 수의 절댓값', value: '큰 수의 절댓값' },
            { label: '부호 바꾸기', value: '부호 바꾸기' },
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

export const quizStepIds: Set<number> = new Set(
  steps.filter((step) => step.quiz).map((step) => step.id),
)
