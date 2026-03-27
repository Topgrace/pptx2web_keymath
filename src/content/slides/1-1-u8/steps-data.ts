import type { Step } from '@/schemas/step'

const rawSteps = [
  {
    id: 0,
    type: 'intro',
    cardVariant: 'default',
    quiz: {
      answer: '최소공배수',
      blankType: 'normal',
      choices: [
        { label: '최소공배수', value: '최소공배수' },
        { label: '최대공약수', value: '최대공약수' },
        { label: '공약수', value: '공약수' },
        { label: '공배수', value: '공배수' },
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
          id: 'q14',
          answer: '2',
          blankType: 'square',
          choices: [
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '7', value: '7' },
          ],
        },
        {
          id: 'q21',
          answer: '3',
          blankType: 'square',
          choices: [
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '7', value: '7' },
          ],
        },
        {
          id: 'lcm',
          answer: '7×2×3',
          blankType: 'normal',
          choices: [
            { label: '7×2', value: '7×2' },
            { label: '7×3', value: '7×3' },
            { label: '7×2×3', value: '7×2×3' },
            { label: '2×3', value: '2×3' },
          ],
        },
        {
          id: 'b',
          answer: 'b',
          answerLatex: 'b',
          blankType: 'square',
          choices: [
            { label: '$a$', value: 'a', latex: 'a' },
            { label: '$b$', value: 'b', latex: 'b' },
            { label: '$G$', value: 'G', latex: 'G' },
            { label: '$L$', value: 'L', latex: 'L' },
          ],
        },
        {
          id: 'L',
          answer: 'L',
          answerLatex: 'L',
          blankType: 'square',
          choices: [
            { label: '$a$', value: 'a', latex: 'a' },
            { label: '$b$', value: 'b', latex: 'b' },
            { label: '$G$', value: 'G', latex: 'G' },
            { label: '$L$', value: 'L', latex: 'L' },
          ],
        },
        {
          id: 'gcdWord',
          answer: '최대공약수',
          blankType: 'normal',
          choices: [
            { label: '최대공약수', value: '최대공약수' },
            { label: '최소공배수', value: '최소공배수' },
            { label: '공약수', value: '공약수' },
            { label: '공배수', value: '공배수' },
          ],
        },
        {
          id: 'productWord',
          answer: '곱',
          blankType: 'normal',
          choices: [
            { label: '합', value: '합' },
            { label: '차', value: '차' },
            { label: '몫', value: '몫' },
            { label: '곱', value: '곱' },
          ],
        },
      ],
    },
  },
  {
    id: 2,
    type: 'practice',
    cardVariant: 'white',
    quiz: {
      answer: '42',
      blankType: 'normal',
      choices: [
        { label: '28', value: '28' },
        { label: '35', value: '35' },
        { label: '42', value: '42' },
        { label: '56', value: '56' },
      ],
    },
  },
  {
    id: 3,
    type: 'summary',
    cardVariant: 'white',
    quiz: {
      answer: 'L*G',
      answerLatex: 'L\\times G',
      blankType: 'normal',
      choices: [
        { label: '$L \\times G$', value: 'L*G', latex: 'L\\times G' },
        { label: '$G \\times a$', value: 'G*a', latex: 'G\\times a' },
        { label: '$G \\times a \\times b$', value: 'G*a*b', latex: 'G\\times a\\times b' },
        { label: '$a \\times b$', value: 'a*b', latex: 'a\\times b' },
      ],
    },
  },
  {
    id: 4,
    type: 'complete',
    cardVariant: 'default',
  },
] satisfies Step[]

export const steps = rawSteps

export const quizStepIds: Set<number> = new Set(
  steps.filter((step) => step.quiz).map((step) => step.id),
)
