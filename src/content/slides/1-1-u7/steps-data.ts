import type { Step } from '@/schemas/step'

const rawSteps = [
  {
    id: 0,
    type: 'intro',
    cardVariant: 'default',
    quiz: {
      answer: '공배수',
      blankType: 'normal',
      choices: [
        { label: '공배수', value: '공배수' },
        { label: '최소공배수', value: '최소공배수' },
        { label: '공약수', value: '공약수' },
        { label: '최대공약수', value: '최대공약수' },
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
          id: 'status',
          answer: '아니다',
          blankType: 'normal',
          choices: [
            { label: '맞다', value: '맞다' },
            { label: '아니다', value: '아니다' },
          ],
        },
        {
          id: 'lcm',
          answer: '36',
          blankType: 'normal',
          choices: [
            { label: '18', value: '18' },
            { label: '24', value: '24' },
            { label: '36', value: '36' },
            { label: '72', value: '72' },
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
      kind: 'multi',
      items: [
        {
          id: 'lcm',
          answer: '123',
          blankType: 'normal',
          choices: [
            { label: '12', value: '12' },
            { label: '23', value: '23' },
            { label: '123', value: '123' },
            { label: '132', value: '132' },
          ],
        },
        {
          id: 'multiple',
          answer: '배수',
          blankType: 'normal',
          choices: [
            { label: '약수', value: '약수' },
            { label: '배수', value: '배수' },
            { label: '공배수', value: '공배수' },
            { label: '소인수', value: '소인수' },
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
      answer: '5^7',
      answerLatex: '5^7',
      blankType: 'normal',
      choices: [
        { label: '5³', value: '5^3', latex: '5^3' },
        { label: '5⁵', value: '5^5', latex: '5^5' },
        { label: '5⁷', value: '5^7', latex: '5^7' },
      ],
    },
  },
  {
    id: 4,
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
          id: 'lcm',
          answer: '2^3 \\times 3^2',
          answerLatex: '2^3 \\times 3^2',
          blankType: 'normal',
          choices: [
            { label: '2² × 3²', value: '2^2 \\times 3^2' },
            { label: '2³ × 3', value: '2^3 \\times 3' },
            { label: '2³ × 3²', value: '2^3 \\times 3^2' },
            { label: '2² × 3', value: '2^2 \\times 3' },
          ],
        },
        {
          id: 'common-multiples',
          answer: '72, 144, 216, ...',
          blankType: 'normal',
          choices: [
            { label: '36, 72, 108, ...', value: '36, 72, 108, ...' },
            { label: '72, 144, 216, ...', value: '72, 144, 216, ...' },
            { label: '24, 48, 72, ...', value: '24, 48, 72, ...' },
            { label: '72, 96, 120, ...', value: '72, 96, 120, ...' },
          ],
        },
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
          id: 'lcm',
          answer: '180',
          blankType: 'normal',
          choices: [
            { label: '90', value: '90' },
            { label: '120', value: '120' },
            { label: '180', value: '180' },
            { label: '360', value: '360' },
          ],
        },
        {
          id: 'common-multiples',
          answer: '180, 360, 540, ...',
          blankType: 'normal',
          choices: [
            { label: '90, 180, 270, ...', value: '90, 180, 270, ...' },
            { label: '120, 240, 360, ...', value: '120, 240, 360, ...' },
            { label: '180, 360, 540, ...', value: '180, 360, 540, ...' },
            { label: '180, 270, 360, ...', value: '180, 270, 360, ...' },
          ],
        },
      ],
    },
  },
  {
    id: 6,
    type: 'summary',
    cardVariant: 'white',
    quiz: {
      answer: '360',
      blankType: 'normal',
      choices: [
        { label: '120', value: '120' },
        { label: '180', value: '180' },
        { label: '360', value: '360' },
        { label: '720', value: '720' },
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
  steps.filter((step) => step.quiz).map((step) => step.id),
)
