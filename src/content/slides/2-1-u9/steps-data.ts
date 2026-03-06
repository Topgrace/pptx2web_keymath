import type { Step } from '@/schemas/step'

const rawSteps = [
    // Step 0 — intro: (단항식) × (다항식)
    {
        id: 0, type: 'intro', cardVariant: 'default',
        quiz: {
            answer: '분배법칙',
            blankType: 'normal',
            questionLabel: '단항식과 다항식의 곱은 어떤 법칙으로 계산하지?',
            choices: [
                { label: '분배법칙', value: '분배법칙' },
                { label: '교환법칙', value: '교환법칙' },
                { label: '결합법칙', value: '결합법칙' },
                { label: '지수법칙', value: '지수법칙' },
            ],
        },
    },
    // Step 1 — law: 분배법칙
    {
        id: 1, type: 'law', cardVariant: 'default',
        quiz: {
            answer: 'ab+ac',
            answerLatex: 'ab+ac',
            blankType: 'normal',
            questionLabel: 'a(b+c) = ?',
            choices: [
                { label: '$ab+ac$', value: 'ab+ac', latex: 'ab+ac' },
                { label: '$abc$', value: 'abc', latex: 'abc' },
                { label: '$a+bc$', value: 'a+bc', latex: 'a+bc' },
                { label: '$ab+c$', value: 'ab+c', latex: 'ab+c' },
            ],
        },
    },
    // Step 2 — concept: 전개의 뜻
    {
        id: 2, type: 'concept', cardVariant: 'white',
        quiz: {
            answer: '전개',
            blankType: 'normal',
            questionLabel: '분배법칙으로 괄호를 푸는 것을 뭐라고 하지?',
            choices: [
                { label: '전개', value: '전개' },
                { label: '약분', value: '약분' },
                { label: '통분', value: '통분' },
                { label: '인수분해', value: '인수분해' },
            ],
        },
    },
    // Step 3 — concept: 2a(4a+b) 전개 예시
    {
        id: 3, type: 'concept', cardVariant: 'default',
        quiz: {
            answer: '8a²+2ab',
            answerLatex: '8a^2+2ab',
            blankType: 'normal',
            questionLabel: '2a(4a+b) = ?',
            choices: [
                { label: '$8a^2+2ab$', value: '8a²+2ab', latex: '8a^2+2ab' },
                { label: '$8a+2ab$', value: '8a+2ab', latex: '8a+2ab' },
                { label: '$6a^2+2ab$', value: '6a²+2ab', latex: '6a^2+2ab' },
                { label: '$8a^2+2b$', value: '8a²+2b', latex: '8a^2+2b' },
            ],
        },
    },
    // Step 4 — note: (다항식)×(단항식)도 똑같이!
    {
        id: 4, type: 'note', cardVariant: 'default',
        quiz: {
            answer: '8a²+2ab',
            answerLatex: '8a^2+2ab',
            blankType: 'normal',
            questionLabel: '(4a+b)×2a = ?',
            choices: [
                { label: '$8a^2+2ab$', value: '8a²+2ab', latex: '8a^2+2ab' },
                { label: '$6a^2+2ab$', value: '6a²+2ab', latex: '6a^2+2ab' },
                { label: '$8a^2-2ab$', value: '8a²-2ab', latex: '8a^2-2ab' },
                { label: '$8a+2b$', value: '8a+2b', latex: '8a+2b' },
            ],
        },
    },
    // Step 5 — concept: 음수 × 다항식
    {
        id: 5, type: 'concept', cardVariant: 'default',
        quiz: {
            answer: '-8a²-2ab',
            answerLatex: '-8a^2-2ab',
            blankType: 'normal',
            questionLabel: '(4a+b)×(-2a) = ?',
            choices: [
                { label: '$-8a^2-2ab$', value: '-8a²-2ab', latex: '-8a^2-2ab' },
                { label: '$-8a^2+2ab$', value: '-8a²+2ab', latex: '-8a^2+2ab' },
                { label: '$8a^2+2ab$', value: '8a²+2ab', latex: '8a^2+2ab' },
                { label: '$-8a^2-2b$', value: '-8a²-2b', latex: '-8a^2-2b' },
            ],
        },
    },
    // Step 6 — practice: (1) 4x(6x+3y)
    {
        id: 6, type: 'practice', cardVariant: 'default',
        quiz: {
            answer: '24x²+12xy',
            answerLatex: '24x^2+12xy',
            blankType: 'normal',
            choices: [
                { label: '$24x^2+12xy$', value: '24x²+12xy', latex: '24x^2+12xy' },
                { label: '$24x^2+3y$', value: '24x²+3y', latex: '24x^2+3y' },
                { label: '$10x^2+12xy$', value: '10x²+12xy', latex: '10x^2+12xy' },
                { label: '$24x+12xy$', value: '24x+12xy', latex: '24x+12xy' },
            ],
        },
    },
    // Step 7 — practice: (2) -a(ab+2b)
    {
        id: 7, type: 'practice', cardVariant: 'default',
        quiz: {
            answer: '-a²b-2ab',
            answerLatex: '-a^2b-2ab',
            blankType: 'normal',
            choices: [
                { label: '$-a^2b-2ab$', value: '-a²b-2ab', latex: '-a^2b-2ab' },
                { label: '$-a^2b+2ab$', value: '-a²b+2ab', latex: '-a^2b+2ab' },
                { label: '$a^2b+2ab$', value: 'a²b+2ab', latex: 'a^2b+2ab' },
                { label: '$-ab-2ab$', value: '-ab-2ab', latex: '-ab-2ab' },
            ],
        },
    },
    // Step 8 — practice: (3) (7x-3)×2x
    {
        id: 8, type: 'practice', cardVariant: 'default',
        quiz: {
            answer: '14x²-6x',
            answerLatex: '14x^2-6x',
            blankType: 'normal',
            choices: [
                { label: '$14x^2-6x$', value: '14x²-6x', latex: '14x^2-6x' },
                { label: '$14x^2+6x$', value: '14x²+6x', latex: '14x^2+6x' },
                { label: '$14x-6x$', value: '14x-6x', latex: '14x-6x' },
                { label: '$9x^2-6x$', value: '9x²-6x', latex: '9x^2-6x' },
            ],
        },
    },
    // Step 9 — concept: 전개식이란
    {
        id: 9, type: 'concept', cardVariant: 'white',
        quiz: {
            answer: '전개식',
            blankType: 'normal',
            questionLabel: '전개하여 얻은 다항식을 뭐라고 하지?',
            choices: [
                { label: '전개식', value: '전개식' },
                { label: '인수', value: '인수' },
                { label: '공식', value: '공식' },
                { label: '등식', value: '등식' },
            ],
        },
    },
    // Step 10 — summary: 정리
    {
        id: 10, type: 'concept', cardVariant: 'default',
        quiz: {
            answer: '각 항에 곱하기',
            blankType: 'normal',
            questionLabel: '분배법칙에서 괄호 밖의 단항식을 괄호 안의?',
            choices: [
                { label: '각 항에 곱하기', value: '각 항에 곱하기' },
                { label: '첫 항에만 곱하기', value: '첫 항에만 곱하기' },
                { label: '마지막 항에 곱하기', value: '마지막 항에 곱하기' },
                { label: '더하기', value: '더하기' },
            ],
        },
    },
    // Step 11 — complete
    {
        id: 11, type: 'complete', cardVariant: 'default',
    },
] satisfies Step[]

export const steps = rawSteps
export const quizStepIds: Set<number> = new Set(
    steps.filter((s) => s.quiz).map((s) => s.id),
)
