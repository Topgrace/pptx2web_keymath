import { motion } from 'framer-motion'
import { MathInline } from '@/components/math'
import { cn } from '@/lib/utils'

interface GcdDivisionTableMotionProps {
  className?: string
}

const divisionRows = [
  { divisor: '2', values: ['24', '30', '60'], showLine: true },
  { divisor: '3', values: ['12', '15', '30'], showLine: true },
  { divisor: '', values: ['4', '5', '10'], showLine: false },
]

export function GcdDivisionTableMotion({
  className,
}: GcdDivisionTableMotionProps) {
  return (
    <div
      className={cn(
        'rounded-xl border-2 border-[#F0DC45] bg-[#FFFDF2] p-4',
        className,
      )}
    >
      <div className="mb-3 text-center text-sm font-extrabold text-[#1F4F8A]">
        공약수로 계속 나누다가 공약수가 1뿐이면 멈춘다.
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
              {row.values.map((value) => (
                <div
                  key={`${rowIndex}-${value}`}
                  className={cn(
                    'pb-1',
                    row.showLine && 'border-b-2 border-[#666666]',
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
        마지막 몫 4, 5, 10의 공약수는 1뿐이므로 여기서 멈춘다.
      </motion.div>

      <motion.div
        className="mt-3 rounded-xl bg-[#1F4F8A] px-4 py-3 text-center text-[16px] font-extrabold text-white"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.46 }}
      >
        최대공약수 = <MathInline tex={'2 \\times 3 = 6'} className="align-middle text-white" />
      </motion.div>
    </div>
  )
}
