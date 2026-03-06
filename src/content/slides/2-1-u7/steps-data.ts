import type { Step } from '@/schemas/step'

const rawSteps = [
    // Step 0 — intro: 다항식의 덧셈과 뺄셈
    {
        id: 0, type: 'intro', cardVariant: 'default',
        quiz: {
            answer: '동류항',
            blankType: 'normal',
            questionLabel: '문자의 종류와 차수가 같은 항끼리를 뭐라고 하지?',
            choices: [
                { label: '동류항', value: '동류항' },
                { label: '다항식', value: '다항식' },
                { label: '단항식', value: '단항식' },
                { label: '등식', value: '등식' },
            ],
        },
    },
    // Step 1 — concept: 동류항이란?
    {
        id: 1, type: 'concept', cardVariant: 'white',
        quiz: {
            answer: '차수',
            blankType: 'normal',
            questionLabel: '동류항이 되려면 문자의 종류와 무엇이 같아야 할까?',
            choices: [
                { label: '차수', value: '차수' },
                { label: '계수', value: '계수' },
                { label: '부호', value: '부호' },
                { label: '상수', value: '상수' },
            ],
        },
    },
    // Step 2 — concept: 동류항 판별 예시
    {
        id: 2, type: 'concept', cardVariant: 'default',
        quiz: {
            answer: '동류항 아님',
            blankType: 'normal',
            questionLabel: 'a와 2b는?',
            choices: [
                { label: '동류항 아님', value: '동류항 아님' },
                { label: '동류항', value: '동류항' },
                { label: '같은 식', value: '같은 식' },
                { label: '역원', value: '역원' },
            ],
        },
    },
    // Step 3 — concept: 동류항의 계산
    {
        id: 3, type: 'concept', cardVariant: 'default',
        quiz: {
            answer: '9x²',
            answerLatex: '9x^2',
            blankType: 'normal',
            questionLabel: '4x² + 5x² = ?',
            choices: [
                { label: '$9x^2$', value: '9x²', latex: '9x^2' },
                { label: '$20x^2$', value: '20x²', latex: '20x^2' },
                { label: '$9x$', value: '9x', latex: '9x' },
                { label: '$9x^4$', value: '9x⁴', latex: '9x^4' },
            ],
        },
    },
    // Step 4 — note: 일차식과 이차식
    {
        id: 4, type: 'note', cardVariant: 'default',
        quiz: {
            answer: '2',
            blankType: 'normal',
            questionLabel: '이차식은 한 문자에 대해 차수가 몇인 다항식?',
            choices: [
                { label: '2', value: '2' },
                { label: '1', value: '1' },
                { label: '3', value: '3' },
                { label: '0', value: '0' },
            ],
        },
    },
    // Step 5 — practice: 동류항 찾기 (1)
    {
        id: 5, type: 'practice', cardVariant: 'default',
        quiz: {
            answer: '5x, 4x',
            blankType: 'normal',
            questionLabel: '5x+y+3+4x-2y에서 x의 동류항은?',
            choices: [
                { label: '5x, 4x', value: '5x, 4x' },
                { label: '5x, y', value: '5x, y' },
                { label: 'y, 3', value: 'y, 3' },
                { label: '5x, -2y', value: '5x, -2y' },
            ],
        },
    },
    // Step 6 — law: 다항식의 덧셈 (괄호 풀기 → 동류항끼리 모으기)
    {
        id: 6, type: 'law', cardVariant: 'default',
        quiz: {
            answer: '5a²+a-3',
            answerLatex: '5a^2+a-3',
            blankType: 'normal',
            questionLabel: '(a²+2a-5)+(4a²-a+2) = ?',
            choices: [
                { label: '$5a^2+a-3$', value: '5a²+a-3', latex: '5a^2+a-3' },
                { label: '$5a^2+3a-3$', value: '5a²+3a-3', latex: '5a^2+3a-3' },
                { label: '$3a^2+a-3$', value: '3a²+a-3', latex: '3a^2+a-3' },
                { label: '$5a^2+a-7$', value: '5a²+a-7', latex: '5a^2+a-7' },
            ],
        },
    },
    // Step 7 — concept: 세로셈 덧셈
    {
        id: 7, type: 'concept', cardVariant: 'default',
    },
    // Step 8 — law: 다항식의 뺄셈 (부호 바꿔서 더하기)
    {
        id: 8, type: 'law', cardVariant: 'default',
        quiz: {
            answer: '-a-2b+7',
            answerLatex: '-a-2b+7',
            blankType: 'normal',
            questionLabel: '(2a-3b+7)-(3a-b) = ?',
            choices: [
                { label: '$-a-2b+7$', value: '-a-2b+7', latex: '-a-2b+7' },
                { label: '$-a+2b+7$', value: '-a+2b+7', latex: '-a+2b+7' },
                { label: '$5a-4b+7$', value: '5a-4b+7', latex: '5a-4b+7' },
                { label: '$-a-2b-7$', value: '-a-2b-7', latex: '-a-2b-7' },
            ],
        },
    },
    // Step 9 — note: 괄호 앞에 - 부호 있을 때 분배법칙
    {
        id: 9, type: 'note', cardVariant: 'default',
        quiz: {
            answer: '-3a+b',
            answerLatex: '-3a+b',
            blankType: 'normal',
            questionLabel: '-(3a-b) = ?',
            choices: [
                { label: '$-3a+b$', value: '-3a+b', latex: '-3a+b' },
                { label: '$-3a-b$', value: '-3a-b', latex: '-3a-b' },
                { label: '$3a-b$', value: '3a-b', latex: '3a-b' },
                { label: '$3a+b$', value: '3a+b', latex: '3a+b' },
            ],
        },
    },
    // Step 10 — concept: 세로셈 뺄셈
    {
        id: 10, type: 'concept', cardVariant: 'default',
    },
    // Step 11 — practice: 뺄셈 (1) (a+3b-10)-(5a-b)
    {
        id: 11, type: 'practice', cardVariant: 'default',
        quiz: {
            answer: '-4a+4b-10',
            answerLatex: '-4a+4b-10',
            blankType: 'normal',
            choices: [
                { label: '$-4a+4b-10$', value: '-4a+4b-10', latex: '-4a+4b-10' },
                { label: '$6a+2b-10$', value: '6a+2b-10', latex: '6a+2b-10' },
                { label: '$-4a-4b-10$', value: '-4a-4b-10', latex: '-4a-4b-10' },
                { label: '$-4a+4b+10$', value: '-4a+4b+10', latex: '-4a+4b+10' },
            ],
        },
    },
    // Step 12 — practice: 뺄셈 (2) (-4x²+2x-1)-(-x²+3)
    {
        id: 12, type: 'practice', cardVariant: 'default',
        quiz: {
            answer: '-3x²+2x-4',
            answerLatex: '-3x^2+2x-4',
            blankType: 'normal',
            choices: [
                { label: '$-3x^2+2x-4$', value: '-3x²+2x-4', latex: '-3x^2+2x-4' },
                { label: '$-5x^2+2x+2$', value: '-5x²+2x+2', latex: '-5x^2+2x+2' },
                { label: '$-3x^2+2x+4$', value: '-3x²+2x+4', latex: '-3x^2+2x+4' },
                { label: '$-3x^2-2x-4$', value: '-3x²-2x-4', latex: '-3x^2-2x-4' },
            ],
        },
    },
    // Step 13 — practice: 세로셈 덧셈 (3) (9a+b-8)+(a+4b-2)
    {
        id: 13, type: 'practice', cardVariant: 'default',
        quiz: {
            answer: '10a+5b-10',
            answerLatex: '10a+5b-10',
            blankType: 'normal',
            choices: [
                { label: '$10a+5b-10$', value: '10a+5b-10', latex: '10a+5b-10' },
                { label: '$8a+5b-10$', value: '8a+5b-10', latex: '8a+5b-10' },
                { label: '$10a-3b-10$', value: '10a-3b-10', latex: '10a-3b-10' },
                { label: '$10a+5b+10$', value: '10a+5b+10', latex: '10a+5b+10' },
            ],
        },
    },
    // Step 14 — practice: 세로셈 뺄셈 (4) (5a-b+6)-(3a+10b+2)
    {
        id: 14, type: 'practice', cardVariant: 'default',
        quiz: {
            answer: '2a-11b+4',
            answerLatex: '2a-11b+4',
            blankType: 'normal',
            choices: [
                { label: '$2a-11b+4$', value: '2a-11b+4', latex: '2a-11b+4' },
                { label: '$8a+9b+8$', value: '8a+9b+8', latex: '8a+9b+8' },
                { label: '$2a+11b+4$', value: '2a+11b+4', latex: '2a+11b+4' },
                { label: '$2a-11b-4$', value: '2a-11b-4', latex: '2a-11b-4' },
            ],
        },
    },
    // Step 15 — practice: 동류항 찾기 심화 (5) x²+2x+3+5x²-7x
    {
        id: 15, type: 'practice', cardVariant: 'default',
        quiz: {
            answer: '6x²-5x+3',
            answerLatex: '6x^2-5x+3',
            blankType: 'normal',
            questionLabel: 'x²+2x+3+5x²-7x를 동류항끼리 정리하면?',
            choices: [
                { label: '$6x^2-5x+3$', value: '6x²-5x+3', latex: '6x^2-5x+3' },
                { label: '$6x^2+9x+3$', value: '6x²+9x+3', latex: '6x^2+9x+3' },
                { label: '$4x^2-5x+3$', value: '4x²-5x+3', latex: '4x^2-5x+3' },
                { label: '$6x^2-5x-3$', value: '6x²-5x-3', latex: '6x^2-5x-3' },
            ],
        },
    },
    // Step 16 — practice: (6) 3a²-13-2a+7a²+1
    {
        id: 16, type: 'practice', cardVariant: 'default',
        quiz: {
            answer: '10a²-2a-12',
            answerLatex: '10a^2-2a-12',
            blankType: 'normal',
            questionLabel: '3a²-13-2a+7a²+1을 정리하면?',
            choices: [
                { label: '$10a^2-2a-12$', value: '10a²-2a-12', latex: '10a^2-2a-12' },
                { label: '$4a^2-2a-12$', value: '4a²-2a-12', latex: '4a^2-2a-12' },
                { label: '$10a^2+2a-12$', value: '10a²+2a-12', latex: '10a^2+2a-12' },
                { label: '$10a^2-2a+12$', value: '10a²-2a+12', latex: '10a^2-2a+12' },
            ],
        },
    },
    // Step 17 — complete
    {
        id: 17, type: 'complete', cardVariant: 'default',
    },
] satisfies Step[]

export const steps = rawSteps
export const quizStepIds: Set<number> = new Set(
    steps.filter((s) => s.quiz).map((s) => s.id),
)
