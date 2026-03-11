import { motion } from 'framer-motion'
import { MathInline } from '@/components/math'
import { cn } from '@/lib/utils'

interface GcdPrimeFactorizationMotionProps {
  className?: string
}

const factorizationRows = [
  { value: 24, tex: '24 = 2^3 \\times 3' },
  { value: 30, tex: '30 = 2 \\times 3 \\times 5' },
  { value: 60, tex: '60 = 2^2 \\times 3 \\times 5' },
]

export function GcdPrimeFactorizationMotion({
  className,
}: GcdPrimeFactorizationMotionProps) {
  return (
    <div
      className={cn(
        'rounded-xl border-2 border-[#F0DC45] bg-[#FFFDF2] p-4',
        className,
      )}
    >
      <div className="mb-3 text-center text-sm font-extrabold text-[#1F4F8A]">
        각각 소인수분해한 뒤 공통 소인수만 고른다.
      </div>

      <div className="space-y-2.5 rounded-2xl bg-white px-3 py-4 shadow-[0_1px_6px_rgba(0,0,0,0.08)]">
        {factorizationRows.map((row, index) => (
          <motion.div
            key={row.value}
            className="rounded-xl bg-[#F8F8F8] px-3 py-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.28, delay: index * 0.08 }}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-lg bg-[#1F4F8A] px-2 py-1 text-xs font-extrabold text-white">
                {row.value}
              </span>
              <div className="min-w-0 flex-1 text-right text-[17px] font-extrabold text-[#263446]">
                <MathInline tex={row.tex} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-3 rounded-xl bg-[#EEF6FF] px-4 py-3 text-center text-[14px] font-bold leading-[1.8] text-[#263446]"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.28 }}
      >
        <div>
          공통 소인수:
          <span className="ml-2 rounded bg-[#FFE65C] px-2 py-0.5 text-[#8A5A00]">2</span>
          <span className="ml-1 rounded bg-[#FFE65C] px-2 py-0.5 text-[#8A5A00]">3</span>
        </div>
        <div className="mt-1 text-[13px] text-[#555A66]">
          2의 지수는 3, 1, 2이므로 가장 작은 1을 택한다.
        </div>
      </motion.div>

      <motion.div
        className="mt-3 rounded-xl bg-[#1F4F8A] px-4 py-3 text-center text-[16px] font-extrabold text-white"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        최대공약수 = <MathInline tex={'2 \\times 3 = 6'} className="align-middle text-white" />
      </motion.div>
    </div>
  )
}
