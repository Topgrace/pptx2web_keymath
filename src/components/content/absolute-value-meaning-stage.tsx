import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { StepCard } from '@/components/cards/step-card'
import { StaggerItem, StaggerReveal } from '@/components/animations'
import { BlankButton, ChoicePanel, QuizFeedback } from '@/components/quiz'
import { useQuiz } from '@/hooks/use-quiz'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import type { SingleQuiz } from '@/schemas/step'

const ticks = [-4, -3, -2, -1, 0, 1]
const positiveTicks = [-1, 0, 1, 2, 3, 4]

const valueToX = (value: number) => 54 + ((value + 4) / 5) * 390
const positiveValueToX = (value: number) => 54 + ((value + 1) / 5) * 390

const xNegativeThree = valueToX(-3)
const xZero = valueToX(0)
const xPositiveZero = positiveValueToX(0)
const xPositiveThree = positiveValueToX(3)

const originMeaningQuiz: SingleQuiz = {
  answer: '0',
  blankType: 'normal',
  choices: [
    { label: '0', value: '0' },
    { label: '-3', value: '-3' },
    { label: '3', value: '3' },
  ],
}

const positiveMeaningQuiz: SingleQuiz = {
  answer: '+3',
  blankType: 'normal',
  choices: [
    { label: '+3', value: '+3' },
    { label: '0', value: '0' },
    { label: '-3', value: '-3' },
  ],
}

export function AbsoluteValueMeaningStage({
  visible = false,
}: {
  visible?: boolean
}) {
  const { advanceStep, currentStep, markSolved, showAllSteps, totalSteps } = useSlideProgress()
  const {
    isOpen,
    isSolved,
    feedback,
    feedbackType,
    toggleOpen,
    checkAnswer,
    solvedAnswer,
  } =
    useQuiz(originMeaningQuiz)
  const [showPositiveSection, setShowPositiveSection] = useState(false)
  const positiveSectionRef = useRef<HTMLDivElement>(null)
  const shouldShowPositiveSection = showAllSteps || isSolved || showPositiveSection

  const handleOriginAnswer = (value: string) => {
    const correct = checkAnswer(value)
    if (correct) {
      setShowPositiveSection(true)
    }
    return correct
  }

  useEffect(() => {
    if (isSolved && !showPositiveSection) {
      setShowPositiveSection(true)
    }
  }, [isSolved, showPositiveSection])

  useEffect(() => {
    if (!showPositiveSection) return

    const timer = window.setTimeout(() => {
      positiveSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 350)

    return () => window.clearTimeout(timer)
  }, [showPositiveSection])
  const {
    isOpen: isPositiveOpen,
    isSolved: isPositiveSolved,
    feedback: positiveFeedback,
    feedbackType: positiveFeedbackType,
    toggleOpen: togglePositiveOpen,
    checkAnswer: checkPositiveAnswer,
    solvedAnswer: positiveSolvedAnswer,
  } =
    useQuiz(positiveMeaningQuiz)

  const handlePositiveAnswer = (value: string) => {
    const correct = checkPositiveAnswer(value)
    if (correct) {
      markSolved(1)
      window.setTimeout(() => {
        if (currentStep < totalSteps - 1) {
          advanceStep()
        }
      }, 900)
    }
    return correct
  }

  return (
    <StepCard visible={visible} variant="white" className="px-4 py-6 sm:px-6">
      <StaggerReveal enabled={visible} staggerChildren={0.18}>
        <StaggerItem>
          <div className="text-center">
            <div className="flex flex-col items-center">
              <span
                className="inline-block text-[44px] font-black leading-none text-[#1F3554] sm:text-[54px]"
                style={{
                  textShadow:
                    '4px 0 #FFE66B, -4px 0 #FFE66B, 0 4px #FFE66B, 0 -4px #FFE66B, 3px 3px #FFE66B, -3px 3px #FFE66B, 3px -3px #FFE66B, -3px -3px #FFE66B',
                }}
              >
                절댓값
              </span>
              <span className="mt-3 text-center text-[17px] font-extrabold leading-[1.45] text-[#28313D] sm:text-[21px]">
                원점으로부터 수에 대응하는 점까지 거리
              </span>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-6 rounded-2xl border border-[#E2E8F0] bg-[#F8FBFF] px-4 py-5 shadow-sm">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="rounded-xl bg-[#FFF3BC] px-4 py-2 text-[21px] font-black text-[#1F2937] shadow-sm">
                -3의 절댓값
              </div>
              <div className="rounded-full bg-white px-4 py-2 text-[14px] font-extrabold text-[#6E4A8E] shadow-sm">
                기준은 항상 0
              </div>
            </div>

            <svg
              viewBox="0 0 500 142"
              className="h-auto w-full overflow-visible"
              role="img"
              aria-label="-3과 원점 0 사이의 거리를 나타낸 수직선"
            >
              <line x1="24" y1="72" x2="476" y2="72" stroke="#334155" strokeWidth="3" />
              <polygon points="24,72 38,64 38,80" fill="#334155" />
              <polygon points="476,72 462,64 462,80" fill="#334155" />

              <motion.line
                x1={xZero}
                y1="72"
                x2={xNegativeThree}
                y2="72"
                stroke="#f97316"
                strokeWidth="10"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.9, delay: 0.55, ease: 'easeOut' }}
              />

              <g fontSize="16" fontWeight="800" fill="#475569" textAnchor="middle" fontFamily="sans-serif">
                {ticks.map((value) => {
                  const x = valueToX(value)

                  return (
                    <g key={value}>
                      <line x1={x} y1="61" x2={x} y2="83" stroke="#475569" strokeWidth="2.4" />
                      <text x={x} y="116">
                        {value}
                      </text>
                    </g>
                  )
                })}
              </g>

              <g textAnchor="middle" fontFamily="sans-serif">
                <motion.circle
                  cx={xNegativeThree}
                  cy="72"
                  r="9"
                  fill="#ef4444"
                  initial={{ scale: 0 }}
                  animate={visible ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.35, delay: 0.35 }}
                />

                <motion.circle
                  cx={xZero}
                  cy="72"
                  r="9"
                  fill="#2563eb"
                  initial={{ scale: 0 }}
                  animate={visible ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.35, delay: 0.45 }}
                />
              </g>
            </svg>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-stretch">
            <div className="rounded-2xl bg-[#F8FAFC] px-4 py-4 text-center shadow-sm">
              <div className="mb-1 text-[13px] font-extrabold text-[#6E4A8E]">기호</div>
              <div className="text-[28px] font-black text-[#111827]">|-3|</div>
            </div>
            <div className="rounded-2xl bg-[#F8FAFC] px-4 py-4 text-center shadow-sm">
              <div className="mb-1 text-[13px] font-extrabold text-[#6E4A8E]">뜻</div>
              <div className="break-keep text-[17px] font-extrabold leading-[1.8] text-[#1F2937]">
                -3이{' '}
                <BlankButton
                  onClick={toggleOpen}
                  solved={isSolved}
                  solvedAnswer={solvedAnswer}
                  active={isOpen}
                  blankType="normal"
                  className="min-w-[44px] px-2"
                />
                으로부터 떨어진 거리
              </div>
              <ChoicePanel
                choices={originMeaningQuiz.choices}
                isOpen={isOpen}
                onSelect={handleOriginAnswer}
                disabled={isSolved}
                className="mt-3"
              />
              <QuizFeedback message={feedback} type={feedbackType} />
            </div>
            <motion.div
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#FFF1F2] px-4 py-4 text-[#ef4444] shadow-sm"
              initial={{ scale: 0.86, opacity: 0 }}
              animate={visible ? { scale: 1, opacity: 1 } : { scale: 0.86, opacity: 0 }}
              transition={{ duration: 0.35, delay: 1.25, ease: 'easeOut' }}
            >
              <span className="text-[24px] font-black text-[#9CA3AF]">→</span>
              <span className="text-[42px] font-black leading-none">3</span>
            </motion.div>
          </div>
        </StaggerItem>

        {shouldShowPositiveSection && (
          <motion.div
            ref={positiveSectionRef}
            className="mt-6 rounded-2xl border border-[#E2E8F0] bg-[#F8FBFF] px-4 py-5 shadow-sm"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="rounded-xl bg-[#FFF3BC] px-4 py-2 text-[21px] font-black text-[#1F2937] shadow-sm">
                  +3의 절댓값
                </div>
                <div className="rounded-full bg-white px-4 py-2 text-[14px] font-extrabold text-[#6E4A8E] shadow-sm">
                  기준은 항상 0
                </div>
              </div>

              <svg
                viewBox="0 0 500 142"
                className="h-auto w-full overflow-visible"
                role="img"
                aria-label="+3과 원점 0 사이의 거리를 나타낸 수직선"
              >
                <line x1="24" y1="72" x2="476" y2="72" stroke="#334155" strokeWidth="3" />
                <polygon points="24,72 38,64 38,80" fill="#334155" />
                <polygon points="476,72 462,64 462,80" fill="#334155" />

                <motion.line
                  x1={xPositiveZero}
                  y1="72"
                  x2={xPositiveThree}
                  y2="72"
                  stroke="#f97316"
                  strokeWidth="10"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, delay: 0.25, ease: 'easeOut' }}
                />

                <g fontSize="16" fontWeight="800" fill="#475569" textAnchor="middle" fontFamily="sans-serif">
                  {positiveTicks.map((value) => {
                    const x = positiveValueToX(value)

                    return (
                      <g key={value}>
                        <line x1={x} y1="61" x2={x} y2="83" stroke="#475569" strokeWidth="2.4" />
                        <text x={x} y="116">
                          {value}
                        </text>
                      </g>
                    )
                  })}
                </g>

                <g textAnchor="middle" fontFamily="sans-serif">
                  <motion.circle
                    cx={xPositiveZero}
                    cy="72"
                    r="9"
                    fill="#2563eb"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.35, delay: 0.1 }}
                  />

                  <motion.circle
                    cx={xPositiveThree}
                    cy="72"
                    r="9"
                    fill="#0f766e"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.35, delay: 0.2 }}
                  />
                </g>
              </svg>

              <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-stretch">
                <div className="rounded-2xl bg-[#F8FAFC] px-4 py-4 text-center shadow-sm">
                  <div className="mb-1 text-[13px] font-extrabold text-[#6E4A8E]">기호</div>
                  <div className="text-[28px] font-black text-[#111827]">|+3|</div>
                </div>
                <div className="rounded-2xl bg-[#F8FAFC] px-4 py-4 text-center shadow-sm">
                  <div className="mb-1 text-[13px] font-extrabold text-[#6E4A8E]">뜻</div>
                  <div className="break-keep text-[17px] font-extrabold leading-[1.8] text-[#1F2937]">
                    <BlankButton
                      onClick={togglePositiveOpen}
                      solved={isPositiveSolved}
                      solvedAnswer={positiveSolvedAnswer}
                      active={isPositiveOpen}
                      blankType="normal"
                      className="min-w-[44px] px-2"
                    />
                    이 0으로부터 떨어진 거리
                  </div>
                  <ChoicePanel
                    choices={positiveMeaningQuiz.choices}
                    isOpen={isPositiveOpen}
                    onSelect={handlePositiveAnswer}
                    disabled={isPositiveSolved}
                    className="mt-3"
                  />
                  <QuizFeedback message={positiveFeedback} type={positiveFeedbackType} />
                </div>
                <motion.div
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#FFF1F2] px-4 py-4 text-[#ef4444] shadow-sm"
                  initial={{ scale: 0.86, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.35, delay: 0.45, ease: 'easeOut' }}
                >
                  <span className="text-[24px] font-black text-[#9CA3AF]">→</span>
                  <span className="text-[42px] font-black leading-none">3</span>
                </motion.div>
              </div>
          </motion.div>
        )}
      </StaggerReveal>
    </StepCard>
  )
}
