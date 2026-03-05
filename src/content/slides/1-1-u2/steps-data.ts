import type { Step } from '@/schemas/step'
import { StepSchema } from '@/schemas/step'

const rawSteps: Step[] = [
  {
    id: 0, type: 'intro', cardVariant: 'default',
    quiz: {
      answer: '거듭제곱',
      blankType: 'normal',
      choices: [
        { label: '거듭제곱', value: '거듭제곱' },
        { label: '인수분해', value: '인수분해' },
        { label: '지수법칙', value: '지수법칙' },
        { label: '약수', value: '약수' },
      ],
    },
  },
  {
    id: 1, type: 'concept', cardVariant: 'white',
    quiz: {
      answer: '4',
      blankType: 'normal',
      choices: [
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
      ],
    },
  },
  {
    id: 2, type: 'concept', cardVariant: 'white',
    quiz: {
      answer: '4',
      blankType: 'exponent',
      choices: [
        { label: '$2$', value: '2', latex: '2' },
        { label: '$3$', value: '3', latex: '3' },
        { label: '$4$', value: '4', latex: '4' },
        { label: '$5$', value: '5', latex: '5' },
      ],
    },
  },
  {
    id: 3, type: 'definition', cardVariant: 'default',
    quiz: {
      answer: 'mul_n',
      answerLatex: '\\boldsymbol{n}\\text{번 곱한 것}',
      blankType: 'normal',
      choices: [
        { label: 'n번 곱한 것', value: 'mul_n', latex: '\\boldsymbol{n}\\text{번 곱한 것}' },
        { label: 'n번 나눈 것', value: 'div_n', latex: '\\boldsymbol{n}\\text{번 나눈 것}' },
        { label: 'a를 n으로 나눈 것', value: 'a_div_n', latex: '\\boldsymbol{a}\\text{를 }\\boldsymbol{n}\\text{으로 나눈 것}' },
        { label: 'a와 n의 합', value: 'a_plus_n', latex: '\\boldsymbol{a}\\text{와 }\\boldsymbol{n}\\text{의 합}' },
      ],
    },
  },
  {
    id: 4, type: 'concept', cardVariant: 'white',
  },
  {
    id: 5, type: 'note', cardVariant: 'default',
    quiz: {
      answer: '2의 세제곱',
      blankType: 'normal',
      choices: [
        { label: '2의 제곱', value: '2의 제곱' },
        { label: '2의 세제곱', value: '2의 세제곱' },
        { label: '2의 네제곱', value: '2의 네제곱' },
        { label: '2의 다섯제곱', value: '2의 다섯제곱' },
      ],
    },
  },
  {
    id: 6, type: 'concept', cardVariant: 'white',
    quiz: {
      answer: '2^2*7^2',
      answerLatex: '2^2 \\times 7^2',
      blankType: 'normal',
      choices: [
        { label: '$2^2 \\times 7^2$', value: '2^2*7^2', latex: '2^2 \\times 7^2' },        
        { label: '$2^7 \\times 7^2$', value: '2^7*7^2', latex: '2^7 \\times 7^2' },
        { label: '$2^2 \\times 7^4$', value: '2^2*7^4', latex: '2^2 \\times 7^4' },
      ],
    },
  },
  {
    id: 7, type: 'practice', cardVariant: 'white',
    quiz: {
      answer: '3^2*7^3',
      answerLatex: '3^2 \\times 7^3',
      blankType: 'normal',
      choices: [
        { label: '$3^2 \\times 7^3$', value: '3^2*7^3', latex: '3^2 \\times 7^3' },
        { label: '$3^3 \\times 7^2$', value: '3^3*7^2', latex: '3^3 \\times 7^2' },
        { label: '$3^7 \\times 2^3$', value: '3^7*2^3', latex: '3^7 \\times 2^3' },
      ],
    },
  },
  {
    id: 8, type: 'note', cardVariant: 'default',
    quiz: {
      answer: 'x',
      answerLatex: 'x',
      blankType: 'normal',
      choices: [
        { label: '$x$', value: 'x', latex: 'x' },
        { label: '$1$', value: '1', latex: '1' },
        { label: '$x^2$', value: 'x^2', latex: 'x^2' },
        { label: '$2x$', value: '2x', latex: '2x' },
      ],
    },
  },
  {
    id: 9, type: 'note', cardVariant: 'white',
    quiz: {
      answer: '1',
      blankType: 'normal',
      choices: [
        { label: '$0$', value: '0', latex: '0' },
        { label: '$1$', value: '1', latex: '1' },
        { label: '$100$', value: '100', latex: '100' },
        { label: '$n$', value: 'n', latex: 'n' },
      ],
    },
  },
  {
    id: 10, type: 'concept', cardVariant: 'white',
    quiz: {
      answer: '9/25',
      answerLatex: '\\frac{9}{25}',
      answerLatexFontSize: '1.8em',
      blankType: 'normal',
      choices: [
        { label: '$\\frac{3}{5}$', value: '3/5', latex: '\\frac{3}{5}' },
        { label: '$\\frac{9}{25}$', value: '9/25', latex: '\\frac{9}{25}' },
        { label: '$\\frac{9}{5}$', value: '9/5', latex: '\\frac{9}{5}' },
      ],
    },
  },
  {
    id: 11, type: 'practice', cardVariant: 'white',
    quiz: {
      answer: '(a/b)^3',
      answerLatex: '\\left(\\frac{a}{b}\\right)^3',
      answerLatexFontSize: '1.8em',
      blankType: 'normal',
      choices: [
        { label: '$\\left(\\frac{a}{b}\\right)^2$', value: '(a/b)^2', latex: '\\left(\\frac{a}{b}\\right)^2' },
        { label: '$\\left(\\frac{a}{b}\\right)^3$', value: '(a/b)^3', latex: '\\left(\\frac{a}{b}\\right)^3' },
        { label: '$\\frac{a^3}{b}$', value: 'a^3/b', latex: '\\frac{a^3}{b}' },
        { label: '$\\frac{a}{b^3}$', value: 'a/b^3', latex: '\\frac{a}{b^3}' },
      ],
    },
  },
  {
    id: 12, type: 'summary', cardVariant: 'white',
    quiz: {
      answer: '2^2*(3/5)^2',
      answerLatex: '2^2 \\times \\left(\\frac{3}{5}\\right)^2',
      answerLatexFontSize: '1.6em',
      blankType: 'normal',
      choices: [
        { label: '$2^2 \\times \\left(\\frac{3}{5}\\right)^2$', value: '2^2*(3/5)^2', latex: '2^2 \\times \\left(\\frac{3}{5}\\right)^2' },
        { label: '$2^2 \\times \\frac{3}{5^2}$', value: '2^2*3/5^2', latex: '2^2 \\times \\frac{3}{5^2}' },
        { label: '$2^3 \\times \\left(\\frac{3}{5}\\right)^2$', value: '2^3*(3/5)^2', latex: '2^3 \\times \\left(\\frac{3}{5}\\right)^2' },
        { label: '$2^2 \\times \\left(\\frac{3}{5}\\right)^3$', value: '2^2*(3/5)^3', latex: '2^2 \\times \\left(\\frac{3}{5}\\right)^3' },
      ],
    },
  },
  {
    id: 13, type: 'complete', cardVariant: 'default',
  },
]

export const steps: Step[] = rawSteps.map((s) => StepSchema.parse(s))

export const quizStepIds: Set<number> = new Set(
  [
    ...steps.filter((s) => s.quiz).map((s) => s.id),
    4,
  ],
)
