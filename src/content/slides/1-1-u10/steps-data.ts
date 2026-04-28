import type { Step } from '@/schemas/step'

const rawSteps = [
  {
    id: 0,
    type: 'intro',
    cardVariant: 'default',
    quiz: {
      answer: '오른쪽',
      blankType: 'normal',
      questionLabel: '수직선에서 양수는 0의 어느 쪽에 있을까?',
      choices: [
        { label: '오른쪽', value: '오른쪽' },
        { label: '왼쪽', value: '왼쪽' },
        { label: '위쪽', value: '위쪽' },
        { label: '아래쪽', value: '아래쪽' },
      ],
    },
  },
  {
    id: 1,
    type: 'concept',
    cardVariant: 'white',
    quiz: {
      kind: 'multi',
      questionLabel: '점 O에서 어느 쪽으로 움직였는지 고르기',
      items: [
        {
          id: 'left',
          answer: '왼쪽',
          blankType: 'normal',
          choices: [
            { label: '왼쪽', value: '왼쪽' },
            { label: '오른쪽', value: '오른쪽' },
          ],
        },
        {
          id: 'right',
          answer: '오른쪽',
          blankType: 'normal',
          choices: [
            { label: '왼쪽', value: '왼쪽' },
            { label: '오른쪽', value: '오른쪽' },
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
      answer: '왼쪽',
      blankType: 'normal',
      choices: [
        { label: '왼쪽', value: '왼쪽' },
        { label: '오른쪽', value: '오른쪽' },
      ],
    },
  },
  {
    id: 3,
    type: 'practice',
    cardVariant: 'white',
    quiz: {
      kind: 'multi',
      questionLabel: '수직선 위의 점에 대응하는 수 찾기',
      items: [
        {
          id: 'q1',
          answer: '+1.5',
          blankType: 'normal',
          choices: [
            { label: '+1.5', value: '+1.5' },
            { label: '-1.5', value: '-1.5' },
            { label: '+2', value: '+2' },
          ],
        },
        {
          id: 'q2',
          answer: '-2',
          blankType: 'normal',
          choices: [
            { label: '-2', value: '-2' },
            { label: '+2', value: '+2' },
            { label: '-1', value: '-1' },
          ],
        },
        {
          id: 'q3',
          answer: '-0.5',
          blankType: 'normal',
          choices: [
            { label: '-0.5', value: '-0.5' },
            { label: '+0.5', value: '+0.5' },
            { label: '-1.5', value: '-1.5' },
          ],
        },
      ],
    },
  },
] satisfies Step[]

export const steps = rawSteps

export const quizStepIds: Set<number> = new Set(
  steps.filter((step) => step.quiz).map((step) => step.id),
)
