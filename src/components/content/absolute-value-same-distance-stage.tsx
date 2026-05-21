import { motion } from 'framer-motion'
import { StepCard } from '@/components/cards/step-card'
import { StaggerItem, StaggerReveal } from '@/components/animations'
import { BlankButton, ChoicePanel, QuizFeedback } from '@/components/quiz'
import { useQuiz } from '@/hooks/use-quiz'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import type { SingleQuiz } from '@/schemas/step'

const tickValues = [-3, -2, -1, 0, 1, 2, 3]
const pointValues = [-3, 0, 3]
const valueToX = (value: number) => 46 + ((value + 3) / 6) * 328

const originLabelQuiz: SingleQuiz = {
  answer: '0',
  blankType: 'normal',
  choices: [
    { label: '0', value: '0' },
    { label: '-3', value: '-3' },
    { label: '+3', value: '+3' },
  ],
}

export function AbsoluteValueSameDistanceStage({
  visible = false,
}: {
  visible?: boolean
}) {
  const { advanceStep, currentStep, markSolved, totalSteps } = useSlideProgress()
  const { isOpen, isSolved, feedback, feedbackType, toggleOpen, checkAnswer, solvedAnswer } =
    useQuiz(originLabelQuiz)

  const handleOriginAnswer = (value: string) => {
    const correct = checkAnswer(value)
    if (correct) {
      markSolved(2)
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
            <div className="text-[24px] font-black leading-[1.3] text-[#1F3554] sm:text-[32px]">
              절댓값이 같은 두 수
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-6 rounded-2xl bg-[#FFF6BF] px-4 py-5 shadow-sm sm:px-6">
            <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
              <div className="rounded-xl bg-white px-3 py-4 shadow-sm">
                <svg
                  viewBox="0 0 420 170"
                  className="h-auto w-full overflow-visible"
                  role="img"
                  aria-label="-3과 +3이 원점 0에서 같은 거리만큼 떨어져 있는 수직선"
                >
                  <text
                    x="16"
                    y="26"
                    fill="#9A3412"
                    fontFamily="sans-serif"
                    fontSize="17"
                    fontWeight="800"
                  >
                    -3과 +3은 0에서부터 같은 거리만큼 떨어져 있지!
                  </text>

                  <defs>
                    <marker
                      id="absolute-same-distance-arrow"
                      viewBox="0 0 10 10"
                      refX="8"
                      refY="5"
                      markerWidth="5"
                      markerHeight="5"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                    </marker>
                  </defs>

                  <line x1="34" y1="112" x2="386" y2="112" stroke="#334155" strokeWidth="2.2" />
                  <polygon points="34,112 47,105 47,119" fill="#334155" />
                  <polygon points="386,112 373,105 373,119" fill="#334155" />

                  <motion.path
                    d={`M ${valueToX(0)} 94 Q ${valueToX(-1.5)} 42 ${valueToX(-3)} 94`}
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2.2"
                    strokeDasharray="4 4"
                    markerEnd="url(#absolute-same-distance-arrow)"
                    initial={{ pathLength: 0 }}
                    animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 0.75, delay: 0.45, ease: 'easeOut' }}
                  />
                  <motion.path
                    d={`M ${valueToX(0)} 94 Q ${valueToX(1.5)} 42 ${valueToX(3)} 94`}
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2.2"
                    strokeDasharray="4 4"
                    markerEnd="url(#absolute-same-distance-arrow)"
                    initial={{ pathLength: 0 }}
                    animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 0.75, delay: 0.8, ease: 'easeOut' }}
                  />

                  <g fontFamily="sans-serif" textAnchor="middle">
                    {tickValues.map((value) => {
                      const x = valueToX(value)
                      const isPoint = pointValues.includes(value)

                      return (
                        <g key={value}>
                          <line x1={x} y1="101" x2={x} y2="123" stroke="#475569" strokeWidth="2" />
                          {isPoint && (
                            <>
                              <circle
                                cx={x}
                                cy="112"
                                r={value === 0 ? 6 : 7}
                                fill={value === 0 ? '#334155' : '#ef4444'}
                              />
                              {value === 0 ? (
                                <foreignObject x={x - 28} y="128" width="56" height="40">
                                  <div className="flex h-full items-center justify-center">
                                    <BlankButton
                                      onClick={toggleOpen}
                                      solved={isSolved}
                                      solvedAnswer={solvedAnswer}
                                      active={isOpen}
                                      blankType="normal"
                                      className="min-h-[34px] min-w-[42px] px-2 py-1 text-[15px]"
                                    />
                                  </div>
                                </foreignObject>
                              ) : (
                                <text x={x} y="149" fill="#1F2937" fontSize="23" fontWeight="900">
                                  {value === 3 ? '+3' : value}
                                </text>
                              )}
                            </>
                          )}
                        </g>
                      )
                    })}
                  </g>

                  <g stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round">
                    <line x1={valueToX(-1.5) - 3} y1="61" x2={valueToX(-1.5) - 3} y2="73" />
                    <line x1={valueToX(-1.5) + 3} y1="61" x2={valueToX(-1.5) + 3} y2="73" />
                    <line x1={valueToX(1.5) - 3} y1="61" x2={valueToX(1.5) - 3} y2="73" />
                    <line x1={valueToX(1.5) + 3} y1="61" x2={valueToX(1.5) + 3} y2="73" />
                  </g>
                </svg>
                <ChoicePanel
                  choices={originLabelQuiz.choices}
                  isOpen={isOpen}
                  onSelect={handleOriginAnswer}
                  disabled={isSolved}
                  className="mt-2"
                />
                <QuizFeedback message={feedback} type={feedbackType} />
              </div>

              <div className="flex justify-center">
                <motion.div
                  className="whitespace-nowrap text-[38px] font-black leading-none text-[#111827] sm:text-[52px]"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.45, delay: 1.1, ease: 'easeOut' }}
                >
                  |-3| = |+3| = 3
                </motion.div>
              </div>
            </div>
          </div>
        </StaggerItem>
      </StaggerReveal>
    </StepCard>
  )
}
