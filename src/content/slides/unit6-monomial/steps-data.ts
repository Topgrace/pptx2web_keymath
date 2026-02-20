import type { Step } from '@/schemas/step'
import { StepSchema } from '@/schemas/step'

const rawSteps: Step[] = [
  // Step 0 — intro: 단항식의 곱셈과 나눗셈
  {
    id: 0, type: 'intro', cardVariant: 'default',
    quiz: {
      answer: '단항식',
      blankType: 'normal',
      questionLabel: '단항식에서 수와 문자의 곱으로만 이루어진 식을 뭐라고 하지?',
      choices: [
        { label: '단항식', value: '단항식' },
        { label: '다항식', value: '다항식' },
        { label: '등식', value: '등식' },
        { label: '부등식', value: '부등식' },
      ],
    },
  },
  // Step 1 — law: 곱셈의 교환법칙
  {
    id: 1, type: 'law', cardVariant: 'default',
    quiz: {
      answer: 'yx',
      answerLatex: 'yx',
      blankType: 'normal',
      questionLabel: 'x × y = ?',
      choices: [
        { label: '$yx$', value: 'yx', latex: 'yx' },
        { label: '$xy$', value: 'xy', latex: 'xy' },
        { label: '$x+y$', value: 'x+y', latex: 'x+y' },
        { label: '$x-y$', value: 'x-y', latex: 'x-y' },
      ],
    },
  },
  // Step 2 — law: 곱셈의 결합법칙
  {
    id: 2, type: 'law', cardVariant: 'default',
    quiz: {
      answer: 'z',
      blankType: 'normal',
      questionLabel: 'x × (y × z) = (x × y) × ?',
      choices: [
        { label: 'z', value: 'z' },
        { label: 'x', value: 'x' },
        { label: 'y', value: 'y' },
        { label: 'xyz', value: 'xyz' },
      ],
    },
  },
  // Step 3 — concept: (단항식) × (단항식) 개념 설명
  {
    id: 3, type: 'concept', cardVariant: 'white',
  },
  // Step 4 — concept: -5a² × 4ab 풀이 과정
  {
    id: 4, type: 'concept', cardVariant: 'default',
    quiz: {
      answer: '-20a³b',
      answerLatex: '-20a^3b',
      blankType: 'normal',
      questionLabel: '-5a² × 4ab = ?',
      choices: [
        { label: '$-20a^3b$', value: '-20a³b', latex: '-20a^3b' },
        { label: '$20a^3b$', value: '20a³b', latex: '20a^3b' },
        { label: '$-20a^2b$', value: '-20a²b', latex: '-20a^2b' },
        { label: '$-9a^3b$', value: '-9a³b', latex: '-9a^3b' },
      ],
    },
  },
  // Step 5 — practice: 연습 (1) 4x × (-5y)
  {
    id: 5, type: 'practice', cardVariant: 'default',
    quiz: {
      answer: '-20xy',
      answerLatex: '-20xy',
      blankType: 'normal',
      choices: [
        { label: '$-20xy$', value: '-20xy', latex: '-20xy' },
        { label: '$20xy$', value: '20xy', latex: '20xy' },
        { label: '$-xy$', value: '-xy', latex: '-xy' },
        { label: '$9xy$', value: '9xy', latex: '9xy' },
      ],
    },
  },
  // Step 6 — practice: 연습 (2) 2a³ × 7a → 14a^□
  {
    id: 6, type: 'practice', cardVariant: 'default',
    quiz: {
      answer: '4',
      blankType: 'exponent',
      questionLabel: '2a³ × 7a = 14a^□',
      choices: [
        { label: '$4$', value: '4', latex: '4' },
        { label: '$3$', value: '3', latex: '3' },
        { label: '$7$', value: '7', latex: '7' },
        { label: '$21$', value: '21', latex: '21' },
      ],
    },
  },
  // Step 7 — practice: 연습 (3) 3ab × 10b
  {
    id: 7, type: 'practice', cardVariant: 'default',
    quiz: {
      answer: '30ab²',
      answerLatex: '30ab^2',
      blankType: 'normal',
      choices: [
        { label: '$30ab^2$', value: '30ab²', latex: '30ab^2' },
        { label: '$30b^2$', value: '30b²', latex: '30b^2' },
        { label: '$13ab^2$', value: '13ab²', latex: '13ab^2' },
        { label: '$30a^2b$', value: '30a²b', latex: '30a^2b' },
      ],
    },
  },
  // Step 8 — practice: 연습 (4) ½a × (-16b)
  {
    id: 8, type: 'practice', cardVariant: 'default',
    quiz: {
      answer: '-8ab',
      answerLatex: '-8ab',
      blankType: 'normal',
      choices: [
        { label: '$-8ab$', value: '-8ab', latex: '-8ab' },
        { label: '$8ab$', value: '8ab', latex: '8ab' },
        { label: '$-8a$', value: '-8a', latex: '-8a' },
        { label: '$-16ab$', value: '-16ab', latex: '-16ab' },
      ],
    },
  },
  // Step 9 — practice: 연습 (5) -5x² × (-⅔)x
  {
    id: 9, type: 'practice', cardVariant: 'default',
    quiz: {
      answer: '10/3 x³',
      answerLatex: '\\frac{10}{3}x^3',
      blankType: 'normal',
      choices: [
        { label: '$\\frac{10}{3}x^3$', value: '10/3 x³', latex: '\\frac{10}{3}x^3' },
        { label: '$-\\frac{10}{3}x^3$', value: '-10/3 x³', latex: '-\\frac{10}{3}x^3' },
        { label: '$\\frac{10}{3}x^2$', value: '10/3 x²', latex: '\\frac{10}{3}x^2' },
        { label: '$5x^3$', value: '5x³', latex: '5x^3' },
      ],
    },
  },
  // Step 10 — note: 나눗셈 → 분수의 곱셈으로 변환
  {
    id: 10, type: 'note', cardVariant: 'default',
    quiz: {
      answer: 'B',
      blankType: 'normal',
      questionLabel: 'A ÷ B = A × 1/?',
      choices: [
        { label: 'B', value: 'B' },
        { label: 'A', value: 'A' },
        { label: 'AB', value: 'AB' },
        { label: '1', value: '1' },
      ],
    },
  },
  // Step 11 — law: 나눗셈 분수 변환 법칙 총정리
  {
    id: 11, type: 'law', cardVariant: 'default',
    quiz: {
      answer: 'AC/BD',
      answerLatex: '\\frac{AC}{BD}',
      blankType: 'normal',
      questionLabel: 'A ÷ B × C ÷ D = ?',
      choices: [
        { label: '$\\frac{AC}{BD}$', value: 'AC/BD', latex: '\\frac{AC}{BD}' },
        { label: '$\\frac{AB}{CD}$', value: 'AB/CD', latex: '\\frac{AB}{CD}' },
        { label: '$\\frac{ACD}{B}$', value: 'ACD/B', latex: '\\frac{ACD}{B}' },
        { label: '$\\frac{A}{BCD}$', value: 'A/BCD', latex: '\\frac{A}{BCD}' },
      ],
    },
  },
  // Step 12 — concept: (단항식) ÷ (단항식) 두 가지 방법
  {
    id: 12, type: 'concept', cardVariant: 'default',
    quiz: {
      answer: '3y',
      answerLatex: '3y',
      blankType: 'normal',
      questionLabel: '12xy ÷ 4x = ?',
      choices: [
        { label: '$3y$', value: '3y', latex: '3y' },
        { label: '$3xy$', value: '3xy', latex: '3xy' },
        { label: '$12y$', value: '12y', latex: '12y' },
        { label: '$4y$', value: '4y', latex: '4y' },
      ],
    },
  },
  // Step 13 — note: 약분 팁
  {
    id: 13, type: 'note', cardVariant: 'default',
  },
  // Step 14 — practice: 연습 (1) 15a²b ÷ 5ab
  {
    id: 14, type: 'practice', cardVariant: 'default',
    quiz: {
      answer: '3a',
      answerLatex: '3a',
      blankType: 'normal',
      choices: [
        { label: '$3a$', value: '3a', latex: '3a' },
        { label: '$3ab$', value: '3ab', latex: '3ab' },
        { label: '$5a$', value: '5a', latex: '5a' },
        { label: '$3a^2$', value: '3a²', latex: '3a^2' },
      ],
    },
  },
  // Step 15 — practice: 연습 (2) 12x⁴ ÷ 10x²y²
  {
    id: 15, type: 'practice', cardVariant: 'default',
    quiz: {
      answer: '6x²/(5y²)',
      answerLatex: '\\frac{6x^2}{5y^2}',
      blankType: 'normal',
      choices: [
        { label: '$\\frac{6x^2}{5y^2}$', value: '6x²/(5y²)', latex: '\\frac{6x^2}{5y^2}' },
        { label: '$6x^2y^2$', value: '6x²y²', latex: '6x^2y^2' },
        { label: '$\\frac{12x^2}{10y^2}$', value: '12x²/(10y²)', latex: '\\frac{12x^2}{10y^2}' },
        { label: '$2x^2$', value: '2x²', latex: '2x^2' },
      ],
    },
  },
  // Step 16 — practice: 연습 (3) 80xy⁴ ÷ 16xy²
  {
    id: 16, type: 'practice', cardVariant: 'default',
    quiz: {
      answer: '5y²',
      answerLatex: '5y^2',
      blankType: 'normal',
      choices: [
        { label: '$5y^2$', value: '5y²', latex: '5y^2' },
        { label: '$5xy^2$', value: '5xy²', latex: '5xy^2' },
        { label: '$80y^2$', value: '80y²', latex: '80y^2' },
        { label: '$5y^4$', value: '5y⁴', latex: '5y^4' },
      ],
    },
  },
  // Step 17 — practice: 연습 (4) -4a⁴b³ ÷ (-2ab²)
  {
    id: 17, type: 'practice', cardVariant: 'default',
    quiz: {
      answer: '2a³b',
      answerLatex: '2a^3b',
      blankType: 'normal',
      choices: [
        { label: '$2a^3b$', value: '2a³b', latex: '2a^3b' },
        { label: '$-2a^3b$', value: '-2a³b', latex: '-2a^3b' },
        { label: '$2a^4b$', value: '2a⁴b', latex: '2a^4b' },
        { label: '$2ab$', value: '2ab', latex: '2ab' },
      ],
    },
  },
  // Step 18 — concept: 혼합계산 개요
  {
    id: 18, type: 'concept', cardVariant: 'white',
    quiz: {
      answer: '지수법칙 적용',
      blankType: 'normal',
      questionLabel: '혼합계산에서 거듭제곱이 있으면 먼저 무엇을 해야 할까?',
      choices: [
        { label: '지수법칙 적용', value: '지수법칙 적용' },
        { label: '약분', value: '약분' },
        { label: '곱셈으로 바꾸기', value: '곱셈으로 바꾸기' },
        { label: '나눗셈', value: '나눗셈' },
      ],
    },
  },
  // Step 19 — concept: 혼합계산 풀이 (-2ab)³ × 3a²b ÷ 4a⁴b²
  {
    id: 19, type: 'concept', cardVariant: 'default',
    quiz: {
      answer: '-6ab²',
      answerLatex: '-6ab^2',
      blankType: 'normal',
      questionLabel: '(-2ab)³ × 3a²b ÷ 4a⁴b² = ?',
      choices: [
        { label: '$-6ab^2$', value: '-6ab²', latex: '-6ab^2' },
        { label: '$6ab^2$', value: '6ab²', latex: '6ab^2' },
        { label: '$-6a^2b$', value: '-6a²b', latex: '-6a^2b' },
        { label: '$-8ab^2$', value: '-8ab²', latex: '-8ab^2' },
      ],
    },
  },
  // Step 20 — practice: 혼합계산 연습 100a⁵b⁷ ÷ (2ab²)²
  {
    id: 20, type: 'practice', cardVariant: 'default',
    quiz: {
      answer: '25a³b³',
      answerLatex: '25a^3b^3',
      blankType: 'normal',
      questionLabel: '100a⁵b⁷ ÷ (2ab²)² = ?',
      choices: [
        { label: '$25a^3b^3$', value: '25a³b³', latex: '25a^3b^3' },
        { label: '$25a^2b^3$', value: '25a²b³', latex: '25a^2b^3' },
        { label: '$50a^3b^3$', value: '50a³b³', latex: '50a^3b^3' },
        { label: '$25a^5b^7$', value: '25a⁵b⁷', latex: '25a^5b^7' },
      ],
    },
  },
  // Step 21 — complete: 학습 완료
  {
    id: 21, type: 'complete', cardVariant: 'default',
  },
]

export const steps: Step[] = rawSteps.map((s) => StepSchema.parse(s))
export const quizStepIds: Set<number> = new Set(
  steps.filter((s) => s.quiz).map((s) => s.id),
)
