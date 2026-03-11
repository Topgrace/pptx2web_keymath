import { motion } from 'framer-motion'
import { MathInline } from '@/components/math'
import { cn } from '@/lib/utils'

interface LcmDivisionTableMotionProps {
  className?: string
}

const divisionRows = [
  { divisor: '3', values: ['18', '36', '45'], showLine: true },
  { divisor: '3', values: ['6', '12', '15'], showLine: true },
  { divisor: '2', values: ['2', '4', '5'], showLine: true },
  { divisor: '', values: ['1', '2', '5'], showLine: false },
]

export function LcmDivisionTableMotion({
  className,
}: LcmDivisionTableMotionProps) {
  return (
    <div
      className={cn(
        'rounded-xl border-2 border-[#F0DC45] bg-[#FFFDF2] p-4',
        className,
      )}
    >
      <div className="mb-3 text-center text-sm font-extrabold text-[#1F4F8A]">
        나눈 수와 마지막 몫까지 모두 곱하면 최소공배수이다.
      </div>

      <div className="rounded-2xl bg-white px-3 py-4 shadow-[0_1px_6px_rgba(0,0,0,0.08)]">
        <div className="mx-auto grid w-fit grid-cols-[40px_18px_56px_56px_56px] items-center gap-y-2 text-center text-[31px] font-black leading-none text-[#2A2A2A]">
          {divisionRows.map((row, rowIndex) => (
            <motion.div
              key={`row-${rowIndex}`}
              className="contents"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.28, delay: rowIndex * 0.1 }}
            >
              <div className="flex justify-center">
                {row.divisor ? (
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFE65C] text-[24px] text-[#8A5A00]">
                    {row.divisor}
                  </span>
                ) : (
                  <span className="h-9 w-9" />
                )}
              </div>
              <div className="text-[28px]">)</div>
              {row.values.map((value, valueIndex) => (
                <div
                  key={`${rowIndex}-${value}-${valueIndex}`}
                  className={cn(
                    'pb-1',
                    row.showLine && 'border-b-2 border-[#666666]',
                    rowIndex === 2 && value === '5' && 'rounded-full bg-[#F9D0DD]'
                  )}
                >
                  {value}
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="mt-3 rounded-xl bg-[#FFF4F1] px-4 py-3 text-center text-[13px] font-extrabold leading-[1.7] text-[#A34735]"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.34 }}
      >
        세 수의 공약수가 없으면 두 수의 공약수로 나누고, 공약수가 없는 수는 그대로 아래로 내린다.
      </motion.div>

      <motion.div
        className="mt-3 rounded-xl bg-[#1F4F8A] px-4 py-3 text-center text-[16px] font-extrabold text-white"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.46 }}
      >
        최소공배수 = <MathInline tex={'3 \\times 3 \\times 2 \\times 1 \\times 2 \\times 5 = 180'} className="align-middle text-white" />
      </motion.div>
    </div>
  )
}
