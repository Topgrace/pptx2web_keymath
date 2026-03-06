import type { Step } from '@/schemas/step'

const rawSteps = [
    // Step 0 — intro: 분수 모양의 식 계산 (2)
    {
        id: 0, type: 'intro', cardVariant: 'default',
        quiz: {
            answer: '분배법칙',
            blankType: 'normal',
            questionLabel: '분수 모양의 식에서 괄호를 풀 때 사용하는 법칙은?',
            choices: [
                { label: '분배법칙', value: '분배법칙' },
                { label: '결합법칙', value: '결합법칙' },
                { label: '교환법칙', value: '교환법칙' },
                { label: '지수법칙', value: '지수법칙' },
            ],
        },
    },
    // Step 1 — concept: 복잡한 분수식 → 전개 후 통분
    {
        id: 1, type: 'concept', cardVariant: 'white',
        quiz: {
            answer: '전개 먼저',
            blankType: 'normal',
            questionLabel: '분수 모양의 식에 괄호가 있으면 먼저 무엇을 해야 할까?',
            choices: [
                { label: '전개 먼저', value: '전개 먼저' },
                { label: '통분 먼저', value: '통분 먼저' },
                { label: '약분 먼저', value: '약분 먼저' },
                { label: '곱셈 먼저', value: '곱셈 먼저' },
            ],
        },
    },
    // Step 2 — law: 분수식 계산 순서
    {
        id: 2, type: 'law', cardVariant: 'default',
        quiz: {
            answer: '통분',
            blankType: 'normal',
            questionLabel: '전개 후 분모가 다르면?',
            choices: [
                { label: '통분', value: '통분' },
                { label: '약분', value: '약분' },
                { label: '인수분해', value: '인수분해' },
                { label: '전개', value: '전개' },
            ],
        },
    },
    // Step 3 — concept: 예시 2(a+b)/3 - (a-3b)/6
    {
        id: 3, type: 'concept', cardVariant: 'default',
        quiz: {
            answer: '(a+5b)/6',
            answerLatex: '\\frac{a+5b}{6}',
            blankType: 'normal',
            questionLabel: '2(a+b)/3 - (a-3b)/6 = ?',
            choices: [
                { label: '$\\frac{a+5b}{6}$', value: '(a+5b)/6', latex: '\\frac{a+5b}{6}' },
                { label: '$\\frac{a-5b}{6}$', value: '(a-5b)/6', latex: '\\frac{a-5b}{6}' },
                { label: '$\\frac{3a+5b}{6}$', value: '(3a+5b)/6', latex: '\\frac{3a+5b}{6}' },
                { label: '$\\frac{a+5b}{3}$', value: '(a+5b)/3', latex: '\\frac{a+5b}{3}' },
            ],
        },
    },
    // Step 4 — concept: 예시 (3x-y)/2 + (x+2y)/4
    {
        id: 4, type: 'concept', cardVariant: 'default',
        quiz: {
            answer: '(7x)/4',
            answerLatex: '\\frac{7x}{4}',
            blankType: 'normal',
            questionLabel: '(3x-y)/2 + (x+2y)/4 = ?',
            choices: [
                { label: '$\\frac{7x}{4}$', value: '(7x)/4', latex: '\\frac{7x}{4}' },
                { label: '$\\frac{7x-y}{4}$', value: '(7x-y)/4', latex: '\\frac{7x-y}{4}' },
                { label: '$\\frac{7x+y}{4}$', value: '(7x+y)/4', latex: '\\frac{7x+y}{4}' },
                { label: '$\\frac{5x}{4}$', value: '(5x)/4', latex: '\\frac{5x}{4}' },
            ],
        },
    },
    // Step 5 — note: 계산 순서 정리
    {
        id: 5, type: 'note', cardVariant: 'default',
    },
    // Step 6 — practice: (1) 3(2a-b)/4 + (a+b)/2
    {
        id: 6, type: 'practice', cardVariant: 'default',
        quiz: {
            answer: '(8a-b)/4',
            answerLatex: '\\frac{8a-b}{4}',
            blankType: 'normal',
            choices: [
                { label: '$\\frac{8a-b}{4}$', value: '(8a-b)/4', latex: '\\frac{8a-b}{4}' },
                { label: '$\\frac{8a+b}{4}$', value: '(8a+b)/4', latex: '\\frac{8a+b}{4}' },
                { label: '$\\frac{4a-b}{4}$', value: '(4a-b)/4', latex: '\\frac{4a-b}{4}' },
                { label: '$\\frac{8a-b}{6}$', value: '(8a-b)/6', latex: '\\frac{8a-b}{6}' },
            ],
        },
    },
    // Step 7 — practice: (2) (5x+y)/3 - 2(x-y)/9
    {
        id: 7, type: 'practice', cardVariant: 'default',
        quiz: {
            answer: '(13x+5y)/9',
            answerLatex: '\\frac{13x+5y}{9}',
            blankType: 'normal',
            choices: [
                { label: '$\\frac{13x+5y}{9}$', value: '(13x+5y)/9', latex: '\\frac{13x+5y}{9}' },
                { label: '$\\frac{13x-5y}{9}$', value: '(13x-5y)/9', latex: '\\frac{13x-5y}{9}' },
                { label: '$\\frac{3x+y}{9}$', value: '(3x+y)/9', latex: '\\frac{3x+y}{9}' },
                { label: '$\\frac{13x+5y}{3}$', value: '(13x+5y)/3', latex: '\\frac{13x+5y}{3}' },
            ],
        },
    },
    // Step 8 — practice: (3) (a-2b)/5 - (3a+b)/10
    {
        id: 8, type: 'practice', cardVariant: 'default',
        quiz: {
            answer: '(-a-5b)/10',
            answerLatex: '\\frac{-a-5b}{10}',
            blankType: 'normal',
            choices: [
                { label: '$\\frac{-a-5b}{10}$', value: '(-a-5b)/10', latex: '\\frac{-a-5b}{10}' },
                { label: '$\\frac{a-5b}{10}$', value: '(a-5b)/10', latex: '\\frac{a-5b}{10}' },
                { label: '$\\frac{-a+5b}{10}$', value: '(-a+5b)/10', latex: '\\frac{-a+5b}{10}' },
                { label: '$\\frac{-4a-3b}{10}$', value: '(-4a-3b)/10', latex: '\\frac{-4a-3b}{10}' },
            ],
        },
    },
    // Step 9 — concept: 정수 + 분수 모양 합치기
    {
        id: 9, type: 'concept', cardVariant: 'default',
        quiz: {
            answer: '정수를 분수로',
            blankType: 'normal',
            questionLabel: '정수와 분수 모양의 식을 계산하려면?',
            choices: [
                { label: '정수를 분수로', value: '정수를 분수로' },
                { label: '분수를 정수로', value: '분수를 정수로' },
                { label: '둘 다 곱하기', value: '둘 다 곱하기' },
                { label: '약분', value: '약분' },
            ],
        },
    },
    // Step 10 — practice: (4) 2x - (x+3)/4
    {
        id: 10, type: 'practice', cardVariant: 'default',
        quiz: {
            answer: '(7x-3)/4',
            answerLatex: '\\frac{7x-3}{4}',
            blankType: 'normal',
            choices: [
                { label: '$\\frac{7x-3}{4}$', value: '(7x-3)/4', latex: '\\frac{7x-3}{4}' },
                { label: '$\\frac{7x+3}{4}$', value: '(7x+3)/4', latex: '\\frac{7x+3}{4}' },
                { label: '$\\frac{x-3}{4}$', value: '(x-3)/4', latex: '\\frac{x-3}{4}' },
                { label: '$\\frac{3x-3}{4}$', value: '(3x-3)/4', latex: '\\frac{3x-3}{4}' },
            ],
        },
    },
    // Step 11 — practice: (5) (2a+b)/3 + a - b
    {
        id: 11, type: 'practice', cardVariant: 'default',
        quiz: {
            answer: '(5a-2b)/3',
            answerLatex: '\\frac{5a-2b}{3}',
            blankType: 'normal',
            choices: [
                { label: '$\\frac{5a-2b}{3}$', value: '(5a-2b)/3', latex: '\\frac{5a-2b}{3}' },
                { label: '$\\frac{5a+2b}{3}$', value: '(5a+2b)/3', latex: '\\frac{5a+2b}{3}' },
                { label: '$\\frac{2a-2b}{3}$', value: '(2a-2b)/3', latex: '\\frac{2a-2b}{3}' },
                { label: '$\\frac{5a-2b}{4}$', value: '(5a-2b)/4', latex: '\\frac{5a-2b}{4}' },
            ],
        },
    },
    // Step 12 — summary: 전체 정리
    {
        id: 12, type: 'concept', cardVariant: 'white',
        quiz: {
            answer: '전개 → 통분 → 분자 정리',
            blankType: 'normal',
            questionLabel: '분수 모양의 식 계산 순서는?',
            choices: [
                { label: '전개 → 통분 → 분자 정리', value: '전개 → 통분 → 분자 정리' },
                { label: '통분 → 전개 → 약분', value: '통분 → 전개 → 약분' },
                { label: '약분 → 전개 → 통분', value: '약분 → 전개 → 통분' },
                { label: '인수분해 → 통분', value: '인수분해 → 통분' },
            ],
        },
    },
    // Step 13 — complete
    {
        id: 13, type: 'complete', cardVariant: 'default',
    },
] satisfies Step[]

export const steps = rawSteps
export const quizStepIds: Set<number> = new Set(
    steps.filter((s) => s.quiz).map((s) => s.id),
)
