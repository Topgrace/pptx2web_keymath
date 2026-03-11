import { motion } from 'framer-motion'
import { MathInline } from '@/components/math'
import { cn } from '@/lib/utils'

interface LcmPrimeFactorizationMotionProps {
  className?: string
}

const factorizationRows = [
  { value: 18, tex: '18 = 2 \\times 3^2' },
  { value: 36, tex: '36 = 2^2 \\times 3^2' },
  { value: 45, tex: '45 = 3^2 \\times 5' },
]

export function LcmPrimeFactorizationMotion({
  className,
}: LcmPrimeFactorizationMotionProps) {
  return (
    <div
      className={cn(
        'rounded-xl border-2 border-[#F0DC45] bg-[#FFFDF2] p-4',
        className,
      )}
    >
      <div className="mb-3 text-center text-sm font-extrabold text-[#1F4F8A]">
        공통 소인수와 공통이 아닌 소인수를 모두 곱한다.
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
          골라야 할 소인수:
          <span className="ml-2 rounded bg-[#FFE65C] px-2 py-0.5 text-[#8A5A00]">2^2</span>
          <span className="ml-1 rounded bg-[#FFE65C] px-2 py-0.5 text-[#8A5A00]">3^2</span>
          <span className="ml-1 rounded bg-[#FFE65C] px-2 py-0.5 text-[#8A5A00]">5</span>
        </div>
        <div className="mt-1 text-[13px] text-[#555A66]">
          공통 소인수의 지수가 다르면 큰 지수를 택하고, 공통이 아닌 소인수도 곱한다.
        </div>
      </motion.div>

      <motion.div
        className="mt-3 rounded-xl bg-[#1F4F8A] px-4 py-3 text-center text-[16px] font-extrabold text-white"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        최소공배수 = <MathInline tex={'2^2 \\times 3^2 \\times 5 = 180'} className="align-middle text-white" />
      </motion.div>
    </div>
  )
}
