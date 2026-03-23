import { motion } from 'framer-motion'
import { MathInline } from '@/components/math'
import { cn } from '@/lib/utils'

export type DivisionStep = 0 | 1 | 2 | 3 | 4 | 5 | 6

interface GcdDivisionTableMotionProps {
  className?: string
  step?: DivisionStep
}

const divisionRows = [
  { divisor: '2', values: ['24', '30', '60'], showLine: true },
  { divisor: '3', values: ['12', '15', '30'], showLine: true },
  { divisor: '', values: ['4', '5', '10'], showLine: false },
] as const

const stepDescriptions: Record<DivisionStep, string> = {
  0: '세 수를 공약수로 차례차례 나누며 최대공약수를 찾아보자.',
  1: '24를 2로 나누면 12이므로 첫 칸에 12를 적는다.',
  2: '30을 2로 나누면 15이므로 다음 칸에 15를 적는다.',
  3: '60을 2로 나누면 30이므로 마지막 칸에 30을 적는다.',
  4: '이제 12, 15, 30을 공약수 3으로 다시 나눈다.',
  5: '마지막 몫 4, 5, 10의 공약수는 1뿐이므로 더 이상 나눌 수 없다.',
  6: '왼쪽의 공약수 2와 3을 곱한 값 6이 최대공약수이다.',
}

export function GcdDivisionTableMotion({
  className,
  step = 6,
}: GcdDivisionTableMotionProps) {
  return (
    <div
      className={cn(
        'rounded-xl border-2 border-[#F0DC45] bg-[#FFFDF2] p-4',
        className,
      )}
    >
      <div className="mb-3 flex min-h-[64px] items-center justify-center text-center text-sm leading-[1.45] font-extrabold text-[#1F4F8A] sm:min-h-[48px]">
        {stepDescriptions[step]}
      </div>

      <div className="rounded-2xl bg-white px-3 py-4 shadow-[0_1px_6px_rgba(0,0,0,0.08)]">
        <div className="mx-auto flex w-fit flex-col gap-y-2 text-center text-[31px] font-black leading-none text-[#2A2A2A]">
          {divisionRows.map((row, rowIndex) => {
            const rowVisible =
              rowIndex === 0 ? true
              : rowIndex === 1 ? step >= 1
              : step >= 4
            const showBracket =
              rowIndex === 0 ? true
              : rowIndex === 1 ? step >= 3
              : false
            const showDivisor =
              rowIndex === 0 ? step >= 1 && Boolean(row.divisor)
              : rowIndex === 1 ? step >= 4 && Boolean(row.divisor)
              : false
            const showUnderline =
              rowIndex === 0
                ? row.showLine && (step >= rowIndex + 1 || (step === 0 && rowIndex === 0))
                : rowIndex === 1
                  ? row.showLine && step >= 3
                  : false
            return (
              <motion.div
                key={`row-${rowIndex}`}
                className="relative grid grid-cols-[40px_18px_56px_56px_56px] items-center pb-1"
                initial={false}
                animate={{
                  opacity: rowVisible ? 1 : 0,
                  x: rowVisible ? 0 : -6,
                }}
                transition={{ duration: 0.24, delay: rowVisible ? rowIndex * 0.08 : 0 }}
              >
                {showUnderline ? (
                  <div className="pointer-events-none absolute bottom-[8px] left-[43px] right-0 border-b-2 border-[#666666]" />
                ) : null}
                <div className={cn('flex justify-center', !rowVisible && 'invisible')}>
                  {showDivisor ? (
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFE65C] text-[24px] text-[#8A5A00]">
                      {row.divisor}
                    </span>
                  ) : (
                    <span className="h-9 w-9" />
                  )}
                </div>
                <div className={cn('text-[28px]', (!rowVisible || !showBracket) && 'invisible')}>
                  )
                </div>
                {row.values.map((value, valueIndex) => {
                  const valueVisible =
                    rowIndex === 0 ? true
                    : rowIndex === 1 ? step >= valueIndex + 1
                    : step >= 4

                  return (
                  <div
                    key={`${rowIndex}-${value}`}
                    className={cn(
                      'transition-opacity',
                      (!rowVisible || !valueVisible) && 'invisible',
                    )}
                  >
                    {value}
                  </div>
                  )
                })}
              </motion.div>
            )
          })}
        </div>
      </div>

      {step >= 6 ? (
        <motion.div
          className="mt-3 rounded-xl bg-[#1F4F8A] px-4 py-3 text-center text-[16px] font-extrabold text-white"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.28 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span>최대공약수 =</span>
            <span className="flex h-9 min-w-[36px] items-center justify-center rounded-full bg-[#FFE65C] px-3 text-[22px] text-[#8A5A00] shadow-sm">
              2
            </span>
            <span className="text-[20px]">×</span>
            <span className="flex h-9 min-w-[36px] items-center justify-center rounded-full bg-[#FFE65C] px-3 text-[22px] text-[#8A5A00] shadow-sm">
              3
            </span>
            <span>=</span>
            <MathInline tex={'6'} className="align-middle text-white" />
          </div>
        </motion.div>
      ) : null}
    </div>
  )
}
