import { motion } from 'framer-motion'
import { StepCard } from '@/components/cards/step-card'
import { StaggerItem, StaggerReveal } from '@/components/animations'

const ticks = [-4, -3, -2, -1, 0, 1, 2, 3, 4]
const valueToX = (value: number) => 44 + ((value + 4) / 8) * 412

export function AbsoluteValueSizeRuleStage({
  visible = false,
}: {
  visible?: boolean
}) {
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
              viewBox="0 0 500 210"
              className="h-auto w-full overflow-visible"
              role="img"
              aria-label="원점에서 멀어질수록 절댓값이 커지는 수직선"
            >
              <defs>
                <marker
                  id="abs-size-arrow-blue"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  markerUnits="userSpaceOnUse"
                  orient="auto"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#38BDF8" />
                </marker>
                <marker
                  id="abs-size-arrow-pink"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  markerUnits="userSpaceOnUse"
                  orient="auto"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#F472B6" />
                </marker>
              </defs>

              <line x1="24" y1="96" x2="476" y2="96" stroke="#334155" strokeWidth="2.6" />
              <polygon points="24,96 37,89 37,103" fill="#334155" />
              <polygon points="476,96 463,89 463,103" fill="#334155" />

              <motion.line
                x1={valueToX(0)}
                y1="62"
                x2={valueToX(-4)}
                y2="62"
                stroke="#38BDF8"
                strokeWidth="14"
                strokeLinecap="round"
                markerEnd="url(#abs-size-arrow-blue)"
                initial={{ pathLength: 0 }}
                animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.75, delay: 0.35, ease: 'easeOut' }}
              />
              <motion.line
                x1={valueToX(0)}
                y1="62"
                x2={valueToX(4)}
                y2="62"
                stroke="#F472B6"
                strokeWidth="14"
                strokeLinecap="round"
                markerEnd="url(#abs-size-arrow-pink)"
                initial={{ pathLength: 0 }}
                animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.75, delay: 0.55, ease: 'easeOut' }}
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

              <foreignObject x="146" y="4" width="208" height="58">
                <div className="flex h-full items-center justify-center rounded-xl border border-[#CBD5E1] bg-white px-3 text-center text-[15px] font-black leading-[1.35] text-[#1F2937] shadow-sm">
                  원점에서 멀어질수록 절댓값이 커진다.
                </div>
              </foreignObject>
              <line
                x1={valueToX(0)}
                y1="62"
                x2={valueToX(0)}
                y2="82"
                stroke="#CBD5E1"
                strokeWidth="2"
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
                y2="190"
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
                y="184"
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
                작을수록 절댓값이 커진다.
              </div>
            </div>
            <div className="rounded-2xl bg-[#FFF7D6] px-4 py-4 text-center shadow-sm">
              <div className="mb-2 text-[14px] font-black text-[#A16207]">0</div>
              <div className="break-keep text-[18px] font-extrabold leading-[1.45] text-[#1F2937]">
                절댓값이 가장 작은 수는 0이다.
              </div>
            </div>
            <div className="rounded-2xl bg-[#FCE7F3] px-4 py-4 text-center shadow-sm">
              <div className="mb-2 text-[14px] font-black text-[#DB2777]">양수</div>
              <div className="break-keep text-[18px] font-extrabold leading-[1.45] text-[#1F2937]">
                클수록 절댓값이 커진다.
              </div>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-4 rounded-2xl border border-[#2E7D57]/20 bg-[#2E7D57]/10 px-4 py-3 text-center text-[16px] font-extrabold leading-[1.6] text-[#2E7D57]">
            절댓값은 원점으로부터 떨어진 거리이므로 언제나 0 이상이다.
          </div>
        </StaggerItem>
      </StaggerReveal>
    </StepCard>
  )
}
