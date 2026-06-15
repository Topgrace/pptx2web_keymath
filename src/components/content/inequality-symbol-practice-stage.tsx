import { useEffect, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { StaggerItem, StaggerReveal } from '@/components/animations'
import { StepCard } from '@/components/cards/step-card'
import { BlankButton, ChoicePanel, QuizFeedback } from '@/components/quiz'
import { useQuiz } from '@/hooks/use-quiz'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import type { SingleQuiz } from '@/schemas/step'

const greaterTermQuiz: SingleQuiz = {
  answer: '초과',
  blankType: 'normal',
  choices: [
    { label: '초과', value: '초과' },
    { label: '미만', value: '미만' },
    { label: '이하', value: '이하' },
  ],
}

const lessSymbolQuiz: SingleQuiz = {
  answer: '<',
  blankType: 'normal',
  choices: [
    { label: '>', value: '>' },
    { label: '<', value: '<' },
    { label: '=', value: '=' },
  ],
}

const greaterEqualTermQuiz: SingleQuiz = {
  answer: '이상',
  blankType: 'normal',
  choices: [
    { label: '이상', value: '이상' },
    { label: '이하', value: '이하' },
    { label: '미만', value: '미만' },
  ],
}

const lessEqualSymbolQuiz: SingleQuiz = {
  answer: '≤',
  blankType: 'normal',
  choices: [
    { label: '≤', value: '≤' },
    { label: '≥', value: '≥' },
    { label: '<', value: '<' },
  ],
}

const learningCards = [
  {
    expression: 'a > b',
    tone: 'orange',
    lines: [
      { before: 'a는 b보다', highlight: '크다', after: '.' },
      { before: 'a는 b', highlight: '초과', after: '이다.' },
    ],
  },
  {
    expression: 'a < b',
    tone: 'sky',
    lines: [
      { before: 'a는 b보다', highlight: '작다', after: '.' },
      { before: 'a는 b', highlight: '미만', after: '이다.' },
    ],
  },
  {
    expression: 'a ≥ b',
    tone: 'green',
    lines: [
      { before: 'a는 b보다', highlight: '크거나 같다', after: '.' },
      { before: 'a는 b보다', highlight: '작지 않다', after: '.' },
      { before: 'a는 b', highlight: '이상', after: '이다.' },
    ],
  },
  {
    expression: 'a ≤ b',
    tone: 'purple',
    lines: [
      { before: 'a는 b보다', highlight: '작거나 같다', after: '.' },
      { before: 'a는 b보다', highlight: '크지 않다', after: '.' },
      { before: 'a는 b', highlight: '이하', after: '이다.' },
    ],
  },
] as const

const toneClassNames = {
  orange: {
    card: 'border-[#FDBA74] bg-[#FFF7ED]',
    expression: 'text-[#C2410C]',
    highlight: 'bg-[#FFE566]',
  },
  sky: {
    card: 'border-[#7DD3FC] bg-[#F0F9FF]',
    expression: 'text-[#0369A1]',
    highlight: 'bg-[#BAE6FD]',
  },
  green: {
    card: 'border-[#86EFAC] bg-[#F0FDF4]',
    expression: 'text-[#15803D]',
    highlight: 'bg-[#BBF7D0]',
  },
  purple: {
    card: 'border-[#D8B4FE] bg-[#FAF5FF]',
    expression: 'text-[#7E22CE]',
    highlight: 'bg-[#E9D5FF]',
  },
} as const

type QuizState = ReturnType<typeof useQuiz>

function LearningCard({ card }: { card: (typeof learningCards)[number] }) {
  const tone = toneClassNames[card.tone]

  return (
    <div className={`rounded-2xl border px-3 py-3 shadow-sm ${tone.card}`}>
      <div className={`mb-2 text-center text-[22px] font-black leading-none ${tone.expression}`}>
        {card.expression}
      </div>
      <div className="space-y-1.5 text-[14px] font-extrabold leading-[1.45] text-[#1F2937] sm:text-[15px]">
        {card.lines.map((line) => (
          <div key={`${card.expression}-${line.highlight}`} className="break-keep">
            {line.before}{' '}
            <span className={`rounded px-1 font-black ${tone.highlight}`}>{line.highlight}</span>
            {line.after}
          </div>
        ))}
      </div>
    </div>
  )
}

function PracticeBox({
  title,
  children,
  quiz,
  quizState,
  blankClassName,
}: {
  title: string
  children: (blank: ReactNode) => ReactNode
  quiz: SingleQuiz
  quizState: QuizState
  blankClassName?: string
}) {
  const blank = (
    <BlankButton
      onClick={quizState.toggleOpen}
      solved={quizState.isSolved}
      solvedAnswer={quizState.solvedAnswer}
      active={quizState.isOpen}
      blankType="normal"
      className={blankClassName}
    />
  )

  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white px-3 py-4 text-center shadow-sm">
      <div className="mb-2 text-[13px] font-black text-[#6E4A8E]">{title}</div>
      <div className="break-keep text-[17px] font-extrabold leading-[1.8] text-[#1F3554]">
        {children(blank)}
      </div>
      <ChoicePanel
        choices={quiz.choices}
        isOpen={quizState.isOpen}
        onSelect={quizState.checkAnswer}
        disabled={quizState.isSolved}
        className="mt-3"
      />
      <QuizFeedback message={quizState.feedback} type={quizState.feedbackType} />
    </div>
  )
}

export function InequalitySymbolPracticeStage({
  stepId = 5,
  visible = false,
}: {
  stepId?: number
  visible?: boolean
}) {
  const { advanceStep, currentStep, isSolved: isStepSolved, markSolved, totalSteps } = useSlideProgress()
  const greaterTerm = useQuiz(greaterTermQuiz)
  const lessSymbol = useQuiz(lessSymbolQuiz)
  const greaterEqualTerm = useQuiz(greaterEqualTermQuiz)
  const lessEqualSymbol = useQuiz(lessEqualSymbolQuiz)
  const allSolved =
    greaterTerm.isSolved && lessSymbol.isSolved && greaterEqualTerm.isSolved && lessEqualSymbol.isSolved
  const stepSolved = isStepSolved(stepId)

  useEffect(() => {
    if (!allSolved || stepSolved) return

    const timer = window.setTimeout(() => {
      markSolved(stepId)
      if (currentStep === stepId && currentStep < totalSteps - 1) {
        advanceStep()
      }
    }, 900)

    return () => window.clearTimeout(timer)
  }, [advanceStep, allSolved, currentStep, markSolved, stepId, stepSolved, totalSteps])

  return (
    <StepCard visible={visible} variant="white" className="px-4 py-6 sm:px-6">
      <StaggerReveal enabled={visible} staggerChildren={0.14}>
        <StaggerItem>
          <div className="text-center">
            <div className="inline-block border-y-4 border-[#6E4A8E] px-5 py-1 text-[25px] font-black leading-none text-[#6E4A8E] sm:text-[32px]">
              부등호 기호 익히기
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {learningCards.map((card) => (
              <LearningCard key={card.expression} card={card} />
            ))}
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-4 rounded-2xl border border-[#D9E2EC] bg-[#F8FBFF] px-4 py-3 text-[14px] font-extrabold leading-[1.6] text-[#475569] shadow-sm">
            <div className="flex flex-col gap-1 sm:flex-row sm:justify-center sm:gap-5">
              <span>
                부등호 ≤ 는 <span className="font-black text-[#6E4A8E]">{'<'} 또는 =</span>을 나타낸다.
              </span>
              <span>
                부등호 ≥ 는 <span className="font-black text-[#6E4A8E]">{'>'} 또는 =</span>을 나타낸다.
              </span>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <motion.div
            className="mt-5 grid gap-3 md:grid-cols-2"
            initial={{ opacity: 0, y: 12 }}
            animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <PracticeBox
              title="용어 빈칸"
              quiz={greaterTermQuiz}
              quizState={greaterTerm}
              blankClassName="min-w-[70px] px-2 align-middle"
            >
              {(blank) => (
                <>
                  <span className="font-black text-[#C2410C]">a {'>'} b</span>: a는 b {blank}이다.
                </>
              )}
            </PracticeBox>

            <PracticeBox
              title="기호 빈칸"
              quiz={lessSymbolQuiz}
              quizState={lessSymbol}
              blankClassName="min-w-[52px] px-2 align-middle"
            >
              {(blank) => (
                <>
                  a {blank} b: a는 b 미만이다.
                </>
              )}
            </PracticeBox>

            <PracticeBox
              title="용어 빈칸"
              quiz={greaterEqualTermQuiz}
              quizState={greaterEqualTerm}
              blankClassName="min-w-[70px] px-2 align-middle"
            >
              {(blank) => (
                <>
                  <span className="font-black text-[#15803D]">a ≥ b</span>: a는 b {blank}이다.
                </>
              )}
            </PracticeBox>

            <PracticeBox
              title="기호 빈칸"
              quiz={lessEqualSymbolQuiz}
              quizState={lessEqualSymbol}
              blankClassName="min-w-[52px] px-2 align-middle"
            >
              {(blank) => (
                <>
                  a {blank} b: a는 b 이하이다.
                </>
              )}
            </PracticeBox>
          </motion.div>
        </StaggerItem>
      </StaggerReveal>
    </StepCard>
  )
}
