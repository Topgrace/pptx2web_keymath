import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PrimeDivisionLadderMotionProps {
  className?: string
}

const DIVISORS = [2, 2, 2, 3]
const VALUES = [24, 12, 6, 3]

export function PrimeDivisionLadderMotion({
  className,
}: PrimeDivisionLadderMotionProps) {
  return (
    <div
      className={cn(
        'rounded-xl border-2 border-[#f0dc45] bg-[#fffdf2] p-3',
        className,
      )}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-md bg-[#2d67a8] px-2 py-1 text-xs font-extrabold text-white">
          방법 1
        </span>
        <span className="text-base font-extrabold text-[#263446]">소수로 나누기</span>
      </div>

      <div className="mb-3 text-sm font-bold text-[#e25555]">
        2, 3, 5처럼 작은 소수부터 나누기!
      </div>

      <div className="rounded-lg bg-white px-3 py-3 shadow-[0_1px_6px_rgba(0,0,0,0.08)]">
        <div className="mx-auto grid w-fit grid-cols-[42px_18px_56px] items-center gap-y-2">
          {VALUES.map((value, index) => (
            <motion.div
              key={`${value}-${index}`}
              className="contents"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.28, delay: index * 0.08 }}
            >
              <div className="rounded-md bg-[#f9d0dd] py-1 text-center text-[30px] font-black leading-none text-[#2a2a2a]">
                {DIVISORS[index]}
              </div>
              <div className="text-center text-[28px] font-black leading-none text-[#2a2a2a]">)</div>
              <div className="border-b-2 border-[#666] text-center text-[42px] font-black leading-none text-[#2a2a2a]">
                {value}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-3 text-right text-sm font-bold text-[#e25555]">
        소수가 나오면 끝!
      </div>
    </div>
  )
}
