import type { Step } from '@/schemas/step'

const rawSteps = [
  {
    id: 0,
    type: 'intro',
    cardVariant: 'default',
    quiz: {
      answer: '공약수',
      blankType: 'normal',
      choices: [
        { label: '공약수', value: '공약수' },
        { label: '최대공약수', value: '최대공약수' },
        { label: '공배수', value: '공배수' },
        { label: '최소공배수', value: '최소공배수' },
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
          id: 'term',
          answer: '공약수',
          blankType: 'normal',
          choices: [
            { label: '공약수', value: '공약수' },
            { label: '공배수', value: '공배수' },
            { label: '약수', value: '약수' },
            { label: '배수', value: '배수' },
          ],
        },
        {
          id: 'values',
          answer: '1, 2, 3, 6',
          blankType: 'normal',
          choices: [
            { label: '1, 2, 3, 6', value: '1, 2, 3, 6' },
            { label: '1, 2, 6', value: '1, 2, 6' },
            { label: '2, 3, 6', value: '2, 3, 6' },
            { label: '1, 3, 6', value: '1, 3, 6' },
          ],
        },
      ],
    },
  },
  {
    id: 2,
    type: 'note',
    cardVariant: 'default',
    quiz: {
      answer: '약수',
      blankType: 'normal',
      choices: [
        { label: '약수', value: '약수' },
        { label: '배수', value: '배수' },
        { label: '공배수', value: '공배수' },
        { label: '소인수', value: '소인수' },
      ],
    },
  },
  {
    id: 3,
    type: 'concept',
    cardVariant: 'white',
    quiz: {
      answer: '작은 것',
      blankType: 'normal',
      choices: [
        { label: '큰 것', value: '큰 것' },
        { label: '작은 것', value: '작은 것' },
        { label: '모두', value: '모두' },
        { label: '아무거나', value: '아무거나' },
      ],
    },
  },
  {
    id: 4,
    type: 'concept',
    cardVariant: 'white',
    quiz: {
      answer: '6',
      blankType: 'normal',
      choices: [
        { label: '3', value: '3' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '12', value: '12' },
      ],
    },
  },
  {
    id: 5,
    type: 'practice',
      cardVariant: 'white',
      quiz: {
        kind: 'multi',
        items: [
          {
            id: 'factorization-36',
            answer: '2^2 \\times 3^2',
            answerLatex: '2^2 \\times 3^2',
            blankType: 'normal',
            choices: [
              { label: '2² × 3²', value: '2^2 \\times 3^2' },
              { label: '2³ × 3', value: '2^3 \\times 3' },
              { label: '2 × 3²', value: '2 \\times 3^2' },
              { label: '2² × 3', value: '2^2 \\times 3' },
            ],
          },
          {
            id: 'factorization-24',
            answer: '2^3 \\times 3',
            answerLatex: '2^3 \\times 3',
            blankType: 'normal',
            choices: [
              { label: '2² × 3²', value: '2^2 \\times 3^2' },
              { label: '2³ × 3', value: '2^3 \\times 3' },
              { label: '2 × 3²', value: '2 \\times 3^2' },
              { label: '2² × 3', value: '2^2 \\times 3' },
            ],
          },
          {
            id: 'gcd',
            answer: '2^2 \\times 3',
            answerLatex: '2^2 \\times 3',
            blankType: 'normal',
            choices: [
              { label: '2 × 3', value: '2 \\times 3' },
              { label: '2² × 3', value: '2^2 \\times 3' },
              { label: '2³ × 3', value: '2^3 \\times 3' },
              { label: '2² × 3²', value: '2^2 \\times 3^2' },
            ],
          },
          {
            id: 'common-divisors',
            answer: '1, 2, 3, 4, 6, 12',
            blankType: 'normal',
            choices: [
              { label: '1, 2, 3, 6', value: '1, 2, 3, 6' },
              { label: '1, 2, 6', value: '1, 2, 6' },
              { label: '1, 2, 3, 4, 6', value: '1, 2, 3, 4, 6' },
              { label: '1, 2, 3, 4, 6, 12', value: '1, 2, 3, 4, 6, 12' },
            ],
          },
        ],
    },
  },
  {
    id: 6,
    type: 'practice',
    cardVariant: 'white',
    quiz: {
      kind: 'multi',
      items: [
        {
          id: 'q30',
          answer: '30',
          blankType: 'square',
          choices: [
            { label: '15', value: '15' },
            { label: '20', value: '20' },
            { label: '30', value: '30' },
            { label: '45', value: '45' },
          ],
        },
        {
          id: 'q45',
          answer: '45',
          blankType: 'square',
          choices: [
            { label: '30', value: '30' },
            { label: '40', value: '40' },
            { label: '45', value: '45' },
            { label: '50', value: '50' },
          ],
        },
        {
          id: 'divisor-5',
          answer: '5',
          blankType: 'square',
          choices: [
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' },
            { label: '6', value: '6' },
          ],
        },
        {
          id: 'q10',
          answer: '10',
          blankType: 'square',
          choices: [
            { label: '5', value: '5' },
            { label: '10', value: '10' },
            { label: '15', value: '15' },
            { label: '20', value: '20' },
          ],
        },
        {
          id: 'q15',
          answer: '15',
          blankType: 'square',
          choices: [
            { label: '10', value: '10' },
            { label: '12', value: '12' },
            { label: '15', value: '15' },
            { label: '18', value: '18' },
          ],
        },
        {
          id: 'final-2',
          answer: '2',
          blankType: 'square',
          choices: [
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '5', value: '5' },
            { label: '10', value: '10' },
          ],
        },
        {
          id: 'final-3',
          answer: '3',
          blankType: 'square',
          choices: [
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '5', value: '5' },
            { label: '15', value: '15' },
          ],
        },
        {
          id: 'gcd',
          answer: '30',
          blankType: 'normal',
          choices: [
            { label: '15', value: '15' },
            { label: '20', value: '20' },
            { label: '30', value: '30' },
            { label: '45', value: '45' },
          ],
        },
        {
          id: 'common-divisors',
          answer: '1, 2, 3, 5, 6, 10, 15, 30',
          blankType: 'normal',
          choices: [
            { label: '1, 2, 3, 5, 6, 10, 15, 30', value: '1, 2, 3, 5, 6, 10, 15, 30' },
            { label: '1, 2, 3, 5, 6, 10, 15', value: '1, 2, 3, 5, 6, 10, 15' },
            { label: '1, 2, 3, 5, 10, 15, 30', value: '1, 2, 3, 5, 10, 15, 30' },
            { label: '1, 2, 3, 6, 10, 15, 30', value: '1, 2, 3, 6, 10, 15, 30' },
          ],
        },
      ],
    },
  },
  {
    id: 7,
    type: 'concept',
    cardVariant: 'white',
    quiz: {
      answer: '1',
      blankType: 'normal',
      choices: [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '5', value: '5' },
      ],
    },
  },
  {
    id: 8,
    type: 'summary',
    cardVariant: 'white',
    quiz: {
      answer: '서로소',
      blankType: 'normal',
      choices: [
        { label: '서로소', value: '서로소' },
        { label: '공배수', value: '공배수' },
        { label: '소인수', value: '소인수' },
        { label: '배수', value: '배수' },
      ],
    },
  },
  {
    id: 9,
    type: 'complete',
    cardVariant: 'default',
  },
] satisfies Step[]

export const steps = rawSteps

export const quizStepIds: Set<number> = new Set(
  steps.filter((step) => step.quiz).map((step) => step.id),
)
