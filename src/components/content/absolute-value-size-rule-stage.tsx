import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { StepCard } from '@/components/cards/step-card'
import { StaggerItem, StaggerReveal } from '@/components/animations'
import { BlankButton, ChoicePanel, QuizFeedback } from '@/components/quiz'
import { useQuiz } from '@/hooks/use-quiz'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import type { SingleQuiz } from '@/schemas/step'

const ticks = [-4, -3, -2, -1, 0, 1, 2, 3, 4]
const valueToX = (value: number) => 44 + ((value + 4) / 8) * 412

const negativeSizeQuiz: SingleQuiz = {
  answer: '커진다',
  blankType: 'normal',
  choices: [
    { label: '커진다', value: '커진다' },
    { label: '작아진다', value: '작아진다' },
    { label: '같다', value: '같다' },
  ],
}

const zeroSmallestQuiz: SingleQuiz = {
  answer: '0',
  blankType: 'normal',
  choices: [
    { label: '0', value: '0' },
    { label: '1', value: '1' },
    { label: '-1', value: '-1' },
  ],
}

const positiveSizeQuiz: SingleQuiz = {
  answer: '클수록',
  blankType: 'normal',
  choices: [
    { label: '클수록', value: '클수록' },
    { label: '작을수록', value: '작을수록' },
    { label: '0일수록', value: '0일수록' },
  ],
}

const originDistanceQuiz: SingleQuiz = {
  answer: '원점',
  blankType: 'normal',
  choices: [
    { label: '원점', value: '원점' },
    { label: '왼쪽', value: '왼쪽' },
    { label: '오른쪽', value: '오른쪽' },
  ],
}

export function AbsoluteValueSizeRuleStage({
  visible = false,
}: {
  visible?: boolean
}) {
  const { advanceStep, currentStep, isSolved: isStepSolved, markSolved, totalSteps } = useSlideProgress()
  const negativeQuiz = useQuiz(negativeSizeQuiz)
  const zeroQuiz = useQuiz(zeroSmallestQuiz)
  const positiveQuiz = useQuiz(positiveSizeQuiz)
  const originQuiz = useQuiz(originDistanceQuiz)
  const allSolved =
    negativeQuiz.isSolved && zeroQuiz.isSolved && positiveQuiz.isSolved && originQuiz.isSolved
  const stepSolved = isStepSolved(4)

  useEffect(() => {
    if (!allSolved || stepSolved) return

    const timer = window.setTimeout(() => {
      markSolved(4)
      if (currentStep < totalSteps - 1) {
        advanceStep()
      }
    }, 900)

    return () => window.clearTimeout(timer)
  }, [advanceStep, allSolved, currentStep, markSolved, stepSolved, totalSteps])

  return (
    <StepCard visible={visible} variant="white" className="px-4 py-6 sm:px-6">
      <StaggerReveal enabled={visible} staggerChildren={0.16}>
        <StaggerItem>
          <div className="text-center">
            <div className="inline-block border-y-4 border-[#2E7D57] px-5 py-1 text-[26px] font-black leading-none text-[#2E7D57] sm:text-[34px]">
              수의 크기 비교
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-6 rounded-2xl border border-[#D9E2EC] bg-[#F8FBFF] px-4 py-5 shadow-sm">
            <svg
              viewBox="0 0 500 240"
              className="h-auto w-full overflow-visible"
              role="img"
              aria-label="원점에서 멀어질수록 절댓값이 커지는 수직선"
            >
              <line x1="24" y1="96" x2="476" y2="96" stroke="#334155" strokeWidth="2.6" />
              <polygon points="24,96 37,89 37,103" fill="#334155" />
              <polygon points="476,96 463,89 463,103" fill="#334155" />

              <motion.line
                x1={valueToX(0)}
                y1="62"
                x2={valueToX(-4) + 18}
                y2="62"
                stroke="#38BDF8"
                strokeWidth="14"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.75, delay: 0.35, ease: 'easeOut' }}
              />
              <motion.polygon
                points={`${valueToX(-4) - 8},62 ${valueToX(-4) + 20},48 ${valueToX(-4) + 20},76`}
                fill="#38BDF8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.25, delay: 1.05, ease: 'easeOut' }}
                style={{ transformOrigin: `${valueToX(-4) + 6}px 62px` }}
              />
              <motion.line
                x1={valueToX(0)}
                y1="62"
                x2={valueToX(4) - 18}
                y2="62"
                stroke="#F472B6"
                strokeWidth="14"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.75, delay: 0.55, ease: 'easeOut' }}
              />
              <motion.polygon
                points={`${valueToX(4) + 8},62 ${valueToX(4) - 20},48 ${valueToX(4) - 20},76`}
                fill="#F472B6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.25, delay: 1.25, ease: 'easeOut' }}
                style={{ transformOrigin: `${valueToX(4) - 6}px 62px` }}
              />

              <text
                x="78"
                y="38"
                fill="#0284C7"
                fontFamily="sans-serif"
                fontSize="18"
                fontWeight="900"
              >
                절댓값이 커진다
              </text>
              <text
                x="342"
                y="38"
                fill="#DB2777"
                fontFamily="sans-serif"
                fontSize="18"
                fontWeight="900"
              >
                절댓값이 커진다
              </text>

              <foreignObject x="118" y="170" width="264" height="54">
                <div className="flex h-full items-center justify-center rounded-xl border border-[#CBD5E1] bg-white px-3 text-center text-[18px] font-black leading-[1.35] text-[#1F2937] shadow-sm">
                  원점에서 멀어질수록 절댓값이 커진다.
                </div>
              </foreignObject>
              <line
                x1={valueToX(0)}
                y1="145"
                x2={valueToX(0)}
                y2="170"
                stroke="#CBD5E1"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              <g fontFamily="sans-serif" textAnchor="middle">
                {ticks.map((value) => {
                  const x = valueToX(value)

                  return (
                    <g key={value}>
                      <line
                        x1={x}
                        y1="83"
                        x2={x}
                        y2="109"
                        stroke="#475569"
                        strokeWidth="2.2"
                      />
                      <text x={x} y="133" fill="#1F2937" fontSize="18" fontWeight="800">
                        {value > 0 ? `+${value}` : value}
                      </text>
                    </g>
                  )
                })}
              </g>

              <line
                x1={valueToX(0)}
                y1="145"
                x2={valueToX(0)}
                y2="160"
                stroke="#9CA3AF"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <polygon
                points={`${valueToX(0)},145 ${valueToX(0) - 5},154 ${valueToX(0) + 5},154`}
                fill="#9CA3AF"
              />
              <text
                x={valueToX(0) + 18}
                y="158"
                fill="#64748B"
                fontFamily="sans-serif"
                fontSize="17"
                fontWeight="900"
              >
                |0| = 0
              </text>
            </svg>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl bg-[#E0F2FE] px-4 py-4 text-center shadow-sm">
              <div className="mb-2 text-[14px] font-black text-[#0284C7]">음수</div>
              <div className="break-keep text-[18px] font-extrabold leading-[1.45] text-[#1F2937]">
                작을수록 절댓값이{' '}
                <BlankButton
                  onClick={negativeQuiz.toggleOpen}
                  solved={negativeQuiz.isSolved}
                  solvedAnswer={negativeQuiz.solvedAnswer}
                  active={negativeQuiz.isOpen}
                  blankType="normal"
                  className="min-w-[70px] px-2 align-middle"
                />
                .
              </div>
              <ChoicePanel
                choices={negativeSizeQuiz.choices}
                isOpen={negativeQuiz.isOpen}
                onSelect={negativeQuiz.checkAnswer}
                disabled={negativeQuiz.isSolved}
                className="mt-3"
              />
              <QuizFeedback message={negativeQuiz.feedback} type={negativeQuiz.feedbackType} />
            </div>
            <div className="rounded-2xl bg-[#FFF7D6] px-4 py-4 text-center shadow-sm">
              <div className="break-keep text-[18px] font-extrabold leading-[1.45] text-[#1F2937]">
                절댓값이 가장 작은 수는{' '}
                <BlankButton
                  onClick={zeroQuiz.toggleOpen}
                  solved={zeroQuiz.isSolved}
                  solvedAnswer={zeroQuiz.solvedAnswer}
                  active={zeroQuiz.isOpen}
                  blankType="normal"
                  className="min-w-[48px] px-2 align-middle"
                />
                이다.
              </div>
              <ChoicePanel
                choices={zeroSmallestQuiz.choices}
                isOpen={zeroQuiz.isOpen}
                onSelect={zeroQuiz.checkAnswer}
                disabled={zeroQuiz.isSolved}
                className="mt-3"
              />
              <QuizFeedback message={zeroQuiz.feedback} type={zeroQuiz.feedbackType} />
            </div>
            <div className="rounded-2xl bg-[#FCE7F3] px-4 py-4 text-center shadow-sm">
              <div className="mb-2 text-[14px] font-black text-[#DB2777]">양수</div>
              <div className="break-keep text-[18px] font-extrabold leading-[1.45] text-[#1F2937]">
                <BlankButton
                  onClick={positiveQuiz.toggleOpen}
                  solved={positiveQuiz.isSolved}
                  solvedAnswer={positiveQuiz.solvedAnswer}
                  active={positiveQuiz.isOpen}
                  blankType="normal"
                  className="min-w-[70px] px-2 align-middle"
                />{' '}
                절댓값이 커진다.
              </div>
              <ChoicePanel
                choices={positiveSizeQuiz.choices}
                isOpen={positiveQuiz.isOpen}
                onSelect={positiveQuiz.checkAnswer}
                disabled={positiveQuiz.isSolved}
                className="mt-3"
              />
              <QuizFeedback message={positiveQuiz.feedback} type={positiveQuiz.feedbackType} />
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-4 rounded-2xl border border-[#2E7D57]/20 bg-[#2E7D57]/10 px-4 py-3 text-center text-[16px] font-extrabold leading-[1.6] text-[#2E7D57]">
            절댓값은{' '}
            <BlankButton
              onClick={originQuiz.toggleOpen}
              solved={originQuiz.isSolved}
              solvedAnswer={originQuiz.solvedAnswer}
              active={originQuiz.isOpen}
              blankType="normal"
              className="min-w-[58px] px-2 align-middle"
            />
            으로부터 떨어진 거리이므로 언제나 0 이상이다.
            <ChoicePanel
              choices={originDistanceQuiz.choices}
              isOpen={originQuiz.isOpen}
              onSelect={originQuiz.checkAnswer}
              disabled={originQuiz.isSolved}
              className="mt-3"
            />
            <QuizFeedback message={originQuiz.feedback} type={originQuiz.feedbackType} />
          </div>
        </StaggerItem>
      </StaggerReveal>
    </StepCard>
  )
}
