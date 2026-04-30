import { motion } from 'framer-motion'
import { StepCard } from '@/components/cards/step-card'
import { StaggerItem, StaggerReveal } from '@/components/animations'

const ticks = [-4, -3, -2, -1, 0, 1]

const valueToX = (value: number) => 54 + ((value + 4) / 5) * 390

const xNegativeThree = valueToX(-3)
const xZero = valueToX(0)

export function AbsoluteValueMeaningStage({
  visible = false,
}: {
  visible?: boolean
}) {
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
                <line
                  x1={xNegativeThree}
                  y1="25"
                  x2={xNegativeThree}
                  y2="72"
                  stroke="#ef4444"
                  strokeWidth="3"
                  strokeDasharray="5 4"
                />
                <motion.circle
                  cx={xNegativeThree}
                  cy="72"
                  r="9"
                  fill="#ef4444"
                  initial={{ scale: 0 }}
                  animate={visible ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.35, delay: 0.35 }}
                />
                <text x={xNegativeThree} y="22" fill="#111827" fontSize="22" fontWeight="900">
                  -3
                </text>

                <line
                  x1={xZero}
                  y1="25"
                  x2={xZero}
                  y2="72"
                  stroke="#2563eb"
                  strokeWidth="3"
                  strokeDasharray="5 4"
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
                <text x={xZero} y="22" fill="#111827" fontSize="22" fontWeight="900">
                  0
                </text>
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
              <div className="break-keep text-[17px] font-extrabold leading-[1.55] text-[#1F2937]">
                -3이 0으로부터 떨어진 거리
              </div>
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
      </StaggerReveal>
    </StepCard>
  )
}
