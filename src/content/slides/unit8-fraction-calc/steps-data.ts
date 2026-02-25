import type { Step } from '@/schemas/step'
import { StepSchema } from '@/schemas/step'

const rawSteps: Step[] = [
    // Step 0 — intro: 분수 모양의 식 계산 (1)
    {
        id: 0, type: 'intro', cardVariant: 'default',
        quiz: {
            answer: '통분',
            blankType: 'normal',
            questionLabel: '분모가 다른 분수를 계산하려면 먼저 무엇을 해야 하지?',
            choices: [
                { label: '통분', value: '통분' },
                { label: '약분', value: '약분' },
                { label: '전개', value: '전개' },
                { label: '인수분해', value: '인수분해' },
            ],
        },
    },
    // Step 1 — concept: 분모가 같은 분수의 덧셈
    {
        id: 1, type: 'concept', cardVariant: 'white',
        quiz: {
            answer: '분자만 계산',
            blankType: 'normal',
            questionLabel: '분모가 같은 분수의 덧셈은?',
            choices: [
                { label: '분자만 계산', value: '분자만 계산' },
                { label: '분모도 더하기', value: '분모도 더하기' },
                { label: '뒤집어 곱하기', value: '뒤집어 곱하기' },
                { label: '교차 곱하기', value: '교차 곱하기' },
            ],
        },
    },
    // Step 2 — concept: 분모가 다르면? → 통분
    {
        id: 2, type: 'concept', cardVariant: 'default',
        quiz: {
            answer: '같게',
            blankType: 'normal',
            questionLabel: '분수 모양의 식도 분모가 어떻게 되어야 덧셈·뺄셈을 할 수 있어?',
            choices: [
                { label: '같게', value: '같게' },
                { label: '다르게', value: '다르게' },
                { label: '크게', value: '크게' },
                { label: '작게', value: '작게' },
            ],
        },
    },
    // Step 3 — law: 분수 모양의 식의 덧셈 원리
    {
        id: 3, type: 'law', cardVariant: 'default',
        quiz: {
            answer: 'A+C',
            answerLatex: 'A+C',
            blankType: 'normal',
            questionLabel: 'A/B + C/B = ?/B',
            choices: [
                { label: '$A+C$', value: 'A+C', latex: 'A+C' },
                { label: '$AC$', value: 'AC', latex: 'AC' },
                { label: '$A-C$', value: 'A-C', latex: 'A-C' },
                { label: '$A \\times C$', value: 'A×C', latex: 'A \\times C' },
            ],
        },
    },
    // Step 4 — concept: 통분하여 계산하기 예시
    {
        id: 4, type: 'concept', cardVariant: 'default',
        quiz: {
            answer: '-7x+y / 6',
            answerLatex: '\\frac{-7x+y}{6}',
            blankType: 'normal',
            questionLabel: '(x-y)/3 - (3x-y)/2 = ?',
            choices: [
                { label: '$\\frac{-7x+y}{6}$', value: '-7x+y / 6', latex: '\\frac{-7x+y}{6}' },
                { label: '$\\frac{7x-y}{6}$', value: '7x-y / 6', latex: '\\frac{7x-y}{6}' },
                { label: '$\\frac{-7x-y}{6}$', value: '-7x-y / 6', latex: '\\frac{-7x-y}{6}' },
                { label: '$\\frac{-7x+y}{5}$', value: '-7x+y / 5', latex: '\\frac{-7x+y}{5}' },
            ],
        },
    },
    // Step 5 — note: 통분 과정 상세설명
    {
        id: 5, type: 'note', cardVariant: 'default',
    },
    // Step 6 — practice: 통분 연습 (1) 분모를 6으로 통분
    {
        id: 6, type: 'practice', cardVariant: 'default',
        quiz: {
            answer: '2(x-y)',
            answerLatex: '2(x-y)',
            blankType: 'normal',
            questionLabel: '(x-y)/3 의 분모를 6으로 바꾸면 분자는?',
            choices: [
                { label: '$2(x-y)$', value: '2(x-y)', latex: '2(x-y)' },
                { label: '$3(x-y)$', value: '3(x-y)', latex: '3(x-y)' },
                { label: '$6(x-y)$', value: '6(x-y)', latex: '6(x-y)' },
                { label: '$(x-y)$', value: '(x-y)', latex: '(x-y)' },
            ],
        },
    },
    // Step 7 — practice: 통분 연습 (2) 분모를 10으로
    {
        id: 7, type: 'practice', cardVariant: 'default',
        quiz: {
            answer: '5a+2b',
            answerLatex: '\\frac{5a+2b}{10}',
            blankType: 'normal',
            questionLabel: 'a/2 + b/5 를 통분하면?',
            choices: [
                { label: '$\\frac{5a+2b}{10}$', value: '5a+2b', latex: '\\frac{5a+2b}{10}' },
                { label: '$\\frac{2a+5b}{10}$', value: '2a+5b', latex: '\\frac{2a+5b}{10}' },
                { label: '$\\frac{a+b}{10}$', value: 'a+b', latex: '\\frac{a+b}{10}' },
                { label: '$\\frac{5a+2b}{7}$', value: '5a+2b/7', latex: '\\frac{5a+2b}{7}' },
            ],
        },
    },
    // Step 8 — practice: 뺄셈 연습 (3) 분모 14로 통분
    {
        id: 8, type: 'practice', cardVariant: 'default',
        quiz: {
            answer: '(7a-2b)/14',
            answerLatex: '\\frac{7a-2b}{14}',
            blankType: 'normal',
            questionLabel: 'a/2 - b/7 = ?',
            choices: [
                { label: '$\\frac{7a-2b}{14}$', value: '(7a-2b)/14', latex: '\\frac{7a-2b}{14}' },
                { label: '$\\frac{2a-7b}{14}$', value: '(2a-7b)/14', latex: '\\frac{2a-7b}{14}' },
                { label: '$\\frac{7a+2b}{14}$', value: '(7a+2b)/14', latex: '\\frac{7a+2b}{14}' },
                { label: '$\\frac{a-b}{9}$', value: '(a-b)/9', latex: '\\frac{a-b}{9}' },
            ],
        },
    },
    // Step 9 — practice: (4) (3x-5)/1 의 분모를 3으로 통분
    {
        id: 9, type: 'practice', cardVariant: 'default',
        quiz: {
            answer: '3(3x-5)',
            answerLatex: '\\frac{3(3x-5)}{3}',
            blankType: 'normal',
            questionLabel: '(3x-5)를 분모 3으로 바꾸면?',
            choices: [
                { label: '$\\frac{3(3x-5)}{3}$', value: '3(3x-5)', latex: '\\frac{3(3x-5)}{3}' },
                { label: '$\\frac{3x-5}{3}$', value: '3x-5', latex: '\\frac{3x-5}{3}' },
                { label: '$\\frac{9x-5}{3}$', value: '9x-5', latex: '\\frac{9x-5}{3}' },
                { label: '$\\frac{9x-15}{3}$', value: '9x-15', latex: '\\frac{9x-15}{3}' },
            ],
        },
    },
    // Step 10 — summary: 분수 모양의 식 덧셈·뺄셈 정리
    {
        id: 10, type: 'concept', cardVariant: 'white',
        quiz: {
            answer: '최소공배수',
            blankType: 'normal',
            questionLabel: '통분할 때 분모는 무엇으로 맞추면 좋을까?',
            choices: [
                { label: '최소공배수', value: '최소공배수' },
                { label: '최대공약수', value: '최대공약수' },
                { label: '두 수의 곱', value: '두 수의 곱' },
                { label: '두 수의 합', value: '두 수의 합' },
            ],
        },
    },
    // Step 11 — complete
    {
        id: 11, type: 'complete', cardVariant: 'default',
    },
]

export const steps: Step[] = rawSteps.map((s) => StepSchema.parse(s))
export const quizStepIds: Set<number> = new Set(
    steps.filter((s) => s.quiz).map((s) => s.id),
)
