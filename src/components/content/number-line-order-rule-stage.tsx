import { motion } from 'framer-motion'
import { StaggerItem, StaggerReveal } from '@/components/animations'
import { StepCard } from '@/components/cards/step-card'

const ticks = [-4, -3, -2, -1, 0, 1, 2, 3, 4]
const keyPointColors = new Map([
  [-3, '#38BDF8'],
  [0, '#64748B'],
  [2, '#F472B6'],
])
const valueToX = (value: number) => 40 + ((value + 4) / 8) * 420

export function NumberLineOrderRuleStage({
  visible = false,
}: {
  visible?: boolean
}) {
  return (
    <StepCard visible={visible} variant="white" className="px-4 py-6 sm:px-6">
      <StaggerReveal enabled={visible} staggerChildren={0.16}>
        <StaggerItem>
          <div className="text-center text-[24px] font-black leading-[1.35] text-[#1F3554] sm:text-[32px]">
            수직선에서 오른쪽에 있는 수일수록 크다
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-6 rounded-2xl border border-[#D9E2EC] bg-[#F8FBFF] px-4 py-5 shadow-sm">
            <svg
              viewBox="0 0 500 168"
              className="h-auto w-full overflow-visible"
              role="img"
              aria-label="오른쪽에 있을수록 큰 수를 나타내는 수직선"
            >
              <defs>
                <marker
                  id="number-line-order-arrow"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  markerUnits="userSpaceOnUse"
                  orient="auto"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#2E7D57" />
                </marker>
              </defs>

              <line x1="24" y1="78" x2="476" y2="78" stroke="#334155" strokeWidth="2.6" />
              <polygon points="24,78 37,71 37,85" fill="#334155" />
              <polygon points="476,78 463,71 463,85" fill="#334155" />

              <motion.line
                x1={valueToX(-3)}
                y1="38"
                x2={valueToX(4)}
                y2="38"
                stroke="#2E7D57"
                strokeWidth="9"
                strokeLinecap="round"
                markerEnd="url(#number-line-order-arrow)"
                initial={{ pathLength: 0 }}
                animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.75, delay: 0.35, ease: 'easeOut' }}
              />
              <text
                x="292"
                y="26"
                fill="#2E7D57"
                fontFamily="sans-serif"
                fontSize="18"
                fontWeight="900"
              >
                점점 커진다
              </text>

              <g fontFamily="sans-serif" textAnchor="middle">
                {ticks.map((value) => {
                  const x = valueToX(value)
                  const keyPointColor = keyPointColors.get(value)

                  return (
                    <g key={value}>
                      <line
                        x1={x}
                        y1="65"
                        x2={x}
                        y2="91"
                        stroke="#475569"
                        strokeWidth="2.2"
                      />
                      <text
                        x={x}
                        y="117"
                        fill={keyPointColor ? '#111827' : '#64748B'}
                        fontSize={keyPointColor ? '21' : '17'}
                        fontWeight={keyPointColor ? '900' : '800'}
                      >
                        {value > 0 ? `+${value}` : value}
                      </text>
                      {keyPointColor ? <circle cx={x} cy="78" r="7" fill={keyPointColor} /> : null}
                    </g>
                  )
                })}
              </g>
            </svg>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl bg-[#F8FAFC] px-4 py-4 text-center shadow-sm">
              <div className="mb-2 text-[13px] font-black text-[#64748B]">크기 순서</div>
              <div className="text-[26px] font-black text-[#1F2937]">-3 &lt; 0 &lt; +2</div>
            </div>
            <div className="rounded-2xl bg-[#FFF7D6] px-4 py-4 text-center shadow-sm">
              <div className="mb-2 text-[13px] font-black text-[#A16207]">핵심 정리</div>
              <div className="break-keep text-[19px] font-extrabold leading-[1.45] text-[#1F2937]">
                음수 &lt; 0 &lt; 양수
              </div>
            </div>
          </div>
        </StaggerItem>
      </StaggerReveal>
    </StepCard>
  )
}
