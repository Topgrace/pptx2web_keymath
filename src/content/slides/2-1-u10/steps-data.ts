import type { Step } from '@/schemas/step'

const rawSteps = [
    // Step 0 — intro: (다항식) ÷ (단항식)
    {
        id: 0, type: 'intro', cardVariant: 'default',
        quiz: {
            answer: '분수 꼴',
            blankType: 'normal',
            questionLabel: '다항식 ÷ 단항식은 어떤 꼴로 바꿔서 계산하지?',
            choices: [
                { label: '분수 꼴', value: '분수 꼴' },
                { label: '괄호 꼴', value: '괄호 꼴' },
                { label: '거듭제곱 꼴', value: '거듭제곱 꼴' },
                { label: '소수 꼴', value: '소수 꼴' },
            ],
        },
    },
    // Step 1 — law: 나눗셈 방법 (분수 꼴 또는 곱셈으로)
    {
        id: 1, type: 'law', cardVariant: 'default',
        quiz: {
            answer: '4y+3',
            answerLatex: '4y+3',
            blankType: 'normal',
            questionLabel: '(8xy+6x) ÷ 2x = ?',
            choices: [
                { label: '$4y+3$', value: '4y+3', latex: '4y+3' },
                { label: '$4xy+3x$', value: '4xy+3x', latex: '4xy+3x' },
                { label: '$4y+6$', value: '4y+6', latex: '4y+6' },
                { label: '$8y+3$', value: '8y+3', latex: '8y+3' },
            ],
        },
    },
    // Step 2 — concept: 방법1 — 분수 꼴로 바꾸기
    {
        id: 2, type: 'concept', cardVariant: 'default',
    },
    // Step 3 — concept: 방법2 — 곱셈으로 바꾸기
    {
        id: 3, type: 'concept', cardVariant: 'default',
    },
    // Step 4 — note: 어떤 방법으로 계산해도 결과는 같다
    {
        id: 4, type: 'note', cardVariant: 'default',
        quiz: {
            answer: '곱셈으로 바꿔서',
            blankType: 'normal',
            questionLabel: '(분수 꼴)÷(단항식)은 어떻게 계산하면 좋을까?',
            choices: [
                { label: '곱셈으로 바꿔서', value: '곱셈으로 바꿔서' },
                { label: '통분해서', value: '통분해서' },
                { label: '약분만 해서', value: '약분만 해서' },
                { label: '전개해서', value: '전개해서' },
            ],
        },
    },
    // Step 5 — practice: (1) (6a²b+9ab) ÷ 3a
    {
        id: 5, type: 'practice', cardVariant: 'default',
        quiz: {
            answer: '2ab+3b',
            answerLatex: '2ab+3b',
            blankType: 'normal',
            choices: [
                { label: '$2ab+3b$', value: '2ab+3b', latex: '2ab+3b' },
                { label: '$2a^2b+3ab$', value: '2a²b+3ab', latex: '2a^2b+3ab' },
                { label: '$2ab+9b$', value: '2ab+9b', latex: '2ab+9b' },
                { label: '$6ab+3b$', value: '6ab+3b', latex: '6ab+3b' },
            ],
        },
    },
    // Step 6 — practice: (2) (12x³-8x²) ÷ 4x
    {
        id: 6, type: 'practice', cardVariant: 'default',
        quiz: {
            answer: '3x²-2x',
            answerLatex: '3x^2-2x',
            blankType: 'normal',
            choices: [
                { label: '$3x^2-2x$', value: '3x²-2x', latex: '3x^2-2x' },
                { label: '$3x^3-2x^2$', value: '3x³-2x²', latex: '3x^3-2x^2' },
                { label: '$3x-2$', value: '3x-2', latex: '3x-2' },
                { label: '$12x^2-8x$', value: '12x²-8x', latex: '12x^2-8x' },
            ],
        },
    },
    // Step 7 — practice: (3) (2x²+5x) ÷ 3x (분수형 답)
    {
        id: 7, type: 'practice', cardVariant: 'default',
        quiz: {
            answer: '(2x+5)/3',
            answerLatex: '\\frac{2x+5}{3}',
            blankType: 'normal',
            choices: [
                { label: '$\\frac{2x+5}{3}$', value: '(2x+5)/3', latex: '\\frac{2x+5}{3}' },
                { label: '$\\frac{2x^2+5x}{3}$', value: '(2x²+5x)/3', latex: '\\frac{2x^2+5x}{3}' },
                { label: '$2x+5$', value: '2x+5', latex: '2x+5' },
                { label: '$\\frac{2x+5}{3x}$', value: '(2x+5)/3x', latex: '\\frac{2x+5}{3x}' },
            ],
        },
    },
    // Step 8 — concept: 정리
    {
        id: 8, type: 'concept', cardVariant: 'white',
        quiz: {
            answer: '각 항을 나누기',
            blankType: 'normal',
            questionLabel: '(다항식)÷(단항식)은 다항식의?',
            choices: [
                { label: '각 항을 나누기', value: '각 항을 나누기' },
                { label: '첫 항만 나누기', value: '첫 항만 나누기' },
                { label: '마지막 항만 나누기', value: '마지막 항만 나누기' },
                { label: '모든 항 더하기', value: '모든 항 더하기' },
            ],
        },
    },
    // Step 9 — complete
    {
        id: 9, type: 'complete', cardVariant: 'default',
    },
] satisfies Step[]

export const steps = rawSteps
export const quizStepIds: Set<number> = new Set(
    steps.filter((s) => s.quiz).map((s) => s.id),
)
