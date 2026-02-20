import type { Step } from '@/schemas/step'
import { StepSchema } from '@/schemas/step'

const rawSteps: Step[] = [
  {
    id: 0, type: 'intro', cardVariant: 'default',
    quiz: {
      answer: '곱하는 것',
      blankType: 'normal',
      choices: [
        { label: '곱하는 것', value: '곱하는 것' },
        { label: '나누는 것', value: '나누는 것' },
        { label: '더하는 것', value: '더하는 것' },
        { label: '빼는 것', value: '빼는 것' },
      ],
    },
  },
  {
    id: 1, type: 'concept', cardVariant: 'white',
    quiz: {
      answer: '8',
      blankType: 'normal',
      choices: [
        { label: '8', value: '8' },
        { label: '6', value: '6' },
        { label: '9', value: '9' },
        { label: '12', value: '12' },
      ],
    },
  },
  {
    id: 2, type: 'concept', cardVariant: 'default',
    quiz: {
      answer: '지수',
      blankType: 'normal',
      choices: [
        { label: '지수', value: '지수' },
        { label: '밑', value: '밑' },
        { label: '계수', value: '계수' },
        { label: '차수', value: '차수' },
      ],
    },
  },
  {
    id: 3, type: 'definition', cardVariant: 'default',
    quiz: {
      answer: '수나 문자',
      blankType: 'normal',
      choices: [
        { label: '수나 문자', value: '수나 문자' },
        { label: '횟수', value: '횟수' },
        { label: '결과', value: '결과' },
        { label: '합', value: '합' },
      ],
    },
  },
  {
    id: 4, type: 'practice', cardVariant: 'white',
    quiz: {
      answer: '25',
      blankType: 'normal',
      choices: [
        { label: '25', value: '25' },
        { label: '10', value: '10' },
        { label: '15', value: '15' },
        { label: '32', value: '32' },
      ],
    },
  },
  {
    id: 5, type: 'concept', cardVariant: 'default',
    quiz: {
      answer: 'aⁿ',
      answerLatex: 'a^n',
      blankType: 'normal',
      choices: [
        { label: '$a^n$', value: 'aⁿ', latex: 'a^n' },
        { label: '$a + n$', value: 'a+n', latex: 'a + n' },
        { label: '$a \\times n$', value: 'a×n', latex: 'a \\times n' },
        { label: '$n \\times a$', value: 'n×a', latex: 'n \\times a' },
      ],
    },
  },
  {
    id: 6, type: 'note', cardVariant: 'default',
    quiz: {
      answer: '7',
      blankType: 'normal',
      choices: [
        { label: '$7$', value: '7', latex: '7' },
        { label: '$1$', value: '1', latex: '1' },
        { label: '$0$', value: '0', latex: '0' },
        { label: '$49$', value: '49', latex: '49' },
      ],
    },
  },
  {
    id: 7, type: 'law', cardVariant: 'default',
    quiz: {
      answer: '7',
      blankType: 'exponent',
      choices: [
        { label: '$7$', value: '7', latex: '7' },
        { label: '$12$', value: '12', latex: '12' },
        { label: '$1$', value: '1', latex: '1' },
        { label: '$34$', value: '34', latex: '34' },
      ],
    },
  },
  {
    id: 8, type: 'law', cardVariant: 'default',
    quiz: {
      answer: '10',
      blankType: 'exponent',
      choices: [
        { label: '$10$', value: '10', latex: '10' },
        { label: '$7$', value: '7', latex: '7' },
        { label: '$32$', value: '32', latex: '32' },
        { label: '$25$', value: '25', latex: '25' },
      ],
    },
  },
  {
    id: 9, type: 'practice', cardVariant: 'white',
    quiz: {
      answer: '4',
      blankType: 'exponent',
      choices: [
        { label: '$4$', value: '4', latex: '4' },
        { label: '$10$', value: '10', latex: '10' },
        { label: '$21$', value: '21', latex: '21' },
        { label: '$3$', value: '3', latex: '3' },
      ],
    },
  },
  {
    id: 10, type: 'note', cardVariant: 'default',
    quiz: {
      answer: '3',
      blankType: 'normal',
      choices: [
        { label: '$3$', value: '3', latex: '3' },
        { label: '$3a$', value: '3a', latex: '3a' },
        { label: '$a$', value: 'a', latex: 'a' },
        { label: '$0$', value: '0', latex: '0' },
      ],
    },
  },
  {
    id: 11, type: 'law', cardVariant: 'default',
    quiz: {
      answer: '2',
      blankType: 'exponent',
      choices: [
        { label: '$2$', value: '2', latex: '2' },
        { label: '$8$', value: '8', latex: '8' },
        { label: '$15$', value: '15', latex: '15' },
        { label: '$3$', value: '3', latex: '3' },
      ],
    },
  },
  {
    id: 12, type: 'law', cardVariant: 'default',
    quiz: {
      answer: '3',
      blankType: 'exponent',
      choices: [
        { label: '$3$', value: '3', latex: '3' },
        { label: '$7$', value: '7', latex: '7' },
        { label: '$10$', value: '10', latex: '10' },
        { label: '$2$', value: '2', latex: '2' },
      ],
    },
  },
  {
    id: 13, type: 'law', cardVariant: 'default',
    quiz: {
      answer: '1',
      blankType: 'normal',
      choices: [
        { label: '$1$', value: '1', latex: '1' },
        { label: '$0$', value: '0', latex: '0' },
        { label: '$a$', value: 'a', latex: 'a' },
        { label: '$a^4$', value: 'a⁴', latex: 'a^4' },
      ],
    },
  },
  {
    id: 14, type: 'summary', cardVariant: 'white',
    quiz: {
      answer: '3',
      blankType: 'exponent',
      choices: [
        { label: '$3$', value: '3', latex: '3' },
        { label: '$4$', value: '4', latex: '4' },
        { label: '$5$', value: '5', latex: '5' },
        { label: '$28$', value: '28', latex: '28' },
      ],
    },
  },
  {
    id: 15, type: 'law', cardVariant: 'default',
    quiz: {
      answer: '9a²',
      answerLatex: '9a^2',
      blankType: 'normal',
      choices: [
        { label: '$9a^2$', value: '9a²', latex: '9a^2' },
        { label: '$-9a^2$', value: '-9a²', latex: '-9a^2' },
        { label: '$6a^2$', value: '6a²', latex: '6a^2' },
        { label: '$-6a^2$', value: '-6a²', latex: '-6a^2' },
      ],
    },
  },
  {
    id: 16, type: 'law', cardVariant: 'default',
    quiz: {
      answer: '9',
      blankType: 'normal',
      choices: [
        { label: '$9$', value: '9', latex: '9' },
        { label: '$6$', value: '6', latex: '6' },
        { label: '$3$', value: '3', latex: '3' },
        { label: '$a^2$', value: 'a²', latex: 'a^2' },
      ],
    },
  },
  {
    id: 17, type: 'practice', cardVariant: 'white',
    quiz: {
      answer: '2',
      blankType: 'exponent',
      choices: [
        { label: '$2$', value: '2', latex: '2' },
        { label: '$6$', value: '6', latex: '6' },
        { label: '$8$', value: '8', latex: '8' },
        { label: '$3$', value: '3', latex: '3' },
      ],
    },
  },
  {
    id: 18, type: 'practice', cardVariant: 'white',
    quiz: {
      answer: '6',
      blankType: 'exponent',
      choices: [
        { label: '$6$', value: '6', latex: '6' },
        { label: '$5$', value: '5', latex: '5' },
        { label: '$8$', value: '8', latex: '8' },
        { label: '$23$', value: '23', latex: '23' },
      ],
    },
  },
  {
    id: 19, type: 'practice', cardVariant: 'white',
    quiz: {
      answer: '6',
      blankType: 'exponent',
      choices: [
        { label: '$6$', value: '6', latex: '6' },
        { label: '$5$', value: '5', latex: '5' },
        { label: '$9$', value: '9', latex: '9' },
        { label: '$32$', value: '32', latex: '32' },
      ],
    },
  },
  {
    id: 20, type: 'complete', cardVariant: 'default',
  },
]

// Validate all steps against the Zod schema
export const steps: Step[] = rawSteps.map((s) => StepSchema.parse(s))

// Collect step IDs that have quizzes
export const quizStepIds: Set<number> = new Set(
  steps.filter((s) => s.quiz).map((s) => s.id),
)
