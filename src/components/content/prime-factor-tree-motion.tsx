import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PrimeFactorTreeMotionProps {
  className?: string
}

const PRIME_NODES = [
  { value: 2, x: 300, y: 45 },
  { value: 3, x: 300, y: 115 },
  { value: 2, x: 300, y: 220 },
  { value: 2, x: 300, y: 290 },
]

export function PrimeFactorTreeMotion({
  className,
}: PrimeFactorTreeMotionProps) {
  return (
    <div
      className={cn(
        'rounded-xl border-2 border-[#f0dc45] bg-[#fffdf2] p-3',
        className,
      )}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-md bg-[#2d67a8] px-2 py-1 text-xs font-extrabold text-white">
          방법 2
        </span>
        <span className="text-base font-extrabold text-[#263446]">두 수의 곱으로 가르기</span>
      </div>

      <div className="rounded-lg bg-white px-2 py-2 shadow-[0_1px_6px_rgba(0,0,0,0.08)]">
        <svg viewBox="0 0 340 340" className="h-auto w-full">
          <g stroke="#2a2a2a" strokeWidth="4" strokeLinecap="round">
            <line x1="42" y1="170" x2="122" y2="95" />
            <line x1="42" y1="170" x2="122" y2="245" />
            <line x1="138" y1="95" x2="245" y2="45" />
            <line x1="138" y1="95" x2="245" y2="115" />
            <line x1="138" y1="245" x2="245" y2="220" />
            <line x1="138" y1="245" x2="245" y2="290" />
          </g>

          <g className="fill-[#2a2a2a] text-[52px] font-black">
            <text x="10" y="186">24</text>
            <text x="124" y="111">6</text>
            <text x="124" y="262">4</text>
          </g>

          {PRIME_NODES.map((node, index) => (
            <motion.g
              key={`${node.value}-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.28, delay: 0.12 + index * 0.08 }}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r="31"
                fill="#f8d3df"
                stroke="#ffffff"
                strokeWidth="4"
              />
              <text
                x={node.x}
                y={node.y + 12}
                textAnchor="middle"
                className="fill-[#2a2a2a] text-[40px] font-black"
              >
                {node.value}
              </text>
            </motion.g>
          ))}
        </svg>
      </div>

      <div className="mt-3 text-center text-sm font-bold text-[#e25555]">
        가지 끝이 소수가 될 때까지 나누기!
      </div>
    </div>
  )
}
