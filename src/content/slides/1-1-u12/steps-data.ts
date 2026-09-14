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
          answer: '절댓값의 합',
          blankType: 'normal',
          choices: [
            { label: '절댓값의 합', value: '절댓값의 합' },
            { label: '절댓값의 차', value: '절댓값의 차' },
            { label: '절댓값의 곱', value: '절댓값의 곱' },
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
          answer: '절댓값의 합',
          blankType: 'normal',
          choices: [
            { label: '절댓값의 합', value: '절댓값의 합' },
            { label: '절댓값의 차', value: '절댓값의 차' },
            { label: '절댓값의 곱', value: '절댓값의 곱' },
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
    type: 'concept',
    cardVariant: 'white',
    quiz: {
      answer: '+2',
      blankType: 'normal',
      questionLabel: '(+3)+(−1)의 결과',
      choices: [{ label: '+2', value: '+2' }, { label: '−2', value: '−2' }, { label: '+4', value: '+4' }],
    },
  },
  {
    id: 9,
    type: 'concept',
    cardVariant: 'white',
    quiz: {
      answer: '−2',
      blankType: 'normal',
      questionLabel: '(−3)+(+1)의 결과',
      choices: [{ label: '−2', value: '−2' }, { label: '+2', value: '+2' }, { label: '−4', value: '−4' }],
    },
  },
  {
    id: 10,
    type: 'concept',
    cardVariant: 'white',
    quiz: {
      answer: '+2',
      blankType: 'normal',
      questionLabel: '전체 이동량',
      choices: [{ label: '+2', value: '+2' }, { label: '−2', value: '−2' }, { label: '+3', value: '+3' }],
    },
  },
  {
    id: 11,
    type: 'concept',
    cardVariant: 'white',
    quiz: {
      answer: '−2',
      blankType: 'normal',
      questionLabel: '전체 이동량',
      choices: [{ label: '−2', value: '−2' }, { label: '+2', value: '+2' }, { label: '−3', value: '−3' }],
    },
  },
  {
    id: 12,
    type: 'concept',
    cardVariant: 'white',
    quiz: {
      kind: 'multi',
      questionLabel: '다른 부호의 덧셈: a>b>0일 때 부호와 절댓값의 차',
      items: [
        { id: 'commonSign', answer: '+', blankType: 'normal',
          choices: [{ label: '+', value: '+' }, { label: '−', value: '−' }] },
        { id: 'absoluteSum', answer: '절댓값의 차', blankType: 'normal',
          choices: [{ label: '절댓값의 차', value: '절댓값의 차' }, { label: '절댓값의 합', value: '절댓값의 합' }, { label: '절댓값의 곱', value: '절댓값의 곱' }] },
      ],
    },
  },
  {
    id: 13,
    type: 'concept',
    cardVariant: 'white',
    quiz: {
      kind: 'multi',
      questionLabel: '다른 부호의 덧셈: a>b>0일 때 부호와 절댓값의 차',
      items: [
        { id: 'commonSign', answer: '−', blankType: 'normal',
          choices: [{ label: '+', value: '+' }, { label: '−', value: '−' }] },
        { id: 'absoluteSum', answer: '절댓값의 차', blankType: 'normal',
          choices: [{ label: '절댓값의 차', value: '절댓값의 차' }, { label: '절댓값의 합', value: '절댓값의 합' }, { label: '절댓값의 곱', value: '절댓값의 곱' }] },
      ],
    },
  },
  {
    id: 14,
    type: 'concept',
    cardVariant: 'white',
    quiz: {
      answer: '0',
      blankType: 'normal',
      questionLabel: '(+3)+(−3)의 결과',
      choices: [{ label: '0', value: '0' }, { label: '+6', value: '+6' }, { label: '−6', value: '−6' }],
    },
  },
  {
    id: 15,
    type: 'practice',
    cardVariant: 'white',
    quiz: {
      kind: 'multi',
      questionLabel: '다른 부호의 덧셈 확인문제',
      items: [
        { id: 'positive', answer: '+4', blankType: 'normal', choices: [
          { label: '+4', value: '+4' }, { label: '−4', value: '−4' }, { label: '+10', value: '+10' }] },
        { id: 'negative', answer: '−4', blankType: 'normal', choices: [
          { label: '−4', value: '−4' }, { label: '+4', value: '+4' }, { label: '−10', value: '−10' }] },
        { id: 'zero', answer: '0', blankType: 'normal', choices: [
          { label: '0', value: '0' }, { label: '+10', value: '+10' }, { label: '−10', value: '−10' }] },
      ],
    },
  },
  {
    id: 16,
    type: 'complete',
    cardVariant: 'default',
  },
] satisfies Step[]

export const steps = rawSteps

export const quizStepIds: Set<number> = new Set(
  steps.filter((step) => step.quiz).map((step) => step.id),
)
