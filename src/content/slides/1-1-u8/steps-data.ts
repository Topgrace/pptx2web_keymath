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
      answer: '서로소',
      blankType: 'normal',
      choices: [
        { label: '서로소', value: '서로소' },
        { label: '공배수', value: '공배수' },
        { label: '공약수', value: '공약수' },
        { label: '배수', value: '배수' },
      ],
    },
  },
  {
    id: 2,
    type: 'note',
    cardVariant: 'default',
    quiz: {
      kind: 'multi',
      items: [
        {
          id: 'a-form',
          answer: 'G*a',
          answerLatex: 'G\\times a',
          blankType: 'normal',
          choices: [
            { label: '$G \\times a$', value: 'G*a', latex: 'G\\times a' },
            { label: '$G+a$', value: 'G+a', latex: 'G+a' },
            { label: '$a \\times b$', value: 'a*b', latex: 'a\\times b' },
            { label: '$G \\times b$', value: 'G*b', latex: 'G\\times b' },
          ],
        },
        {
          id: 'b-form',
          answer: 'G*b',
          answerLatex: 'G\\times b',
          blankType: 'normal',
          choices: [
            { label: '$G \\times a$', value: 'G*a', latex: 'G\\times a' },
            { label: '$G+b$', value: 'G+b', latex: 'G+b' },
            { label: '$a \\times b$', value: 'a*b', latex: 'a\\times b' },
            { label: '$G \\times b$', value: 'G*b', latex: 'G\\times b' },
          ],
        },
      ],
    },
  },
  {
    id: 3,
    type: 'concept',
    cardVariant: 'white',
    quiz: {
      answer: 'G*a*b',
      answerLatex: 'G\\times a\\times b',
      blankType: 'normal',
      choices: [
        { label: '$G \\times a$', value: 'G*a', latex: 'G\\times a' },
        { label: '$G \\times b$', value: 'G*b', latex: 'G\\times b' },
        { label: '$G \\times a \\times b$', value: 'G*a*b', latex: 'G\\times a\\times b' },
        { label: '$a \\times b$', value: 'a*b', latex: 'a\\times b' },
      ],
    },
  },
  {
    id: 4,
    type: 'law',
    cardVariant: 'default',
    quiz: {
      answer: 'L*G',
      answerLatex: 'L\\times G',
      blankType: 'normal',
      choices: [
        { label: '$G \\times a$', value: 'G*a', latex: 'G\\times a' },
        { label: '$G \\times a \\times b$', value: 'G*a*b', latex: 'G\\times a\\times b' },
        { label: '$L \\times G$', value: 'L*G', latex: 'L\\times G' },
        { label: '$a \\times b$', value: 'a*b', latex: 'a\\times b' },
      ],
    },
  },
  {
    id: 5,
    type: 'practice',
    cardVariant: 'white',
    quiz: {
      answer: '36',
      blankType: 'normal',
      choices: [
        { label: '18', value: '18' },
        { label: '24', value: '24' },
        { label: '30', value: '30' },
        { label: '36', value: '36' },
      ],
    },
  },
  {
    id: 6,
    type: 'practice',
    cardVariant: 'white',
    quiz: {
      answer: '30',
      blankType: 'normal',
      choices: [
        { label: '24', value: '24' },
        { label: '30', value: '30' },
        { label: '36', value: '36' },
        { label: '60', value: '60' },
      ],
    },
  },
  {
    id: 7,
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
    id: 8,
    type: 'complete',
    cardVariant: 'default',
  },
] satisfies Step[]

export const steps = rawSteps

export const quizStepIds: Set<number> = new Set(
  steps.filter((step) => step.quiz).map((step) => step.id),
)
