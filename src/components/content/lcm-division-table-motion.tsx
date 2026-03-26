import { motion } from 'framer-motion'
import { MathInline } from '@/components/math'
import { cn } from '@/lib/utils'

export type LcmDivisionStep = 0 | 1 | 2 | 3 | 4 | 5 | 6

interface LcmDivisionTableMotionProps {
  className?: string
  step?: LcmDivisionStep
}

const divisionRows = [
  { divisor: '3', values: ['18', '36', '45'], showLine: true },
  { divisor: '3', values: ['6', '12', '15'], showLine: true },
  { divisor: '2', values: ['2', '4', '5'], showLine: true },
  { divisor: '', values: ['1', '2', '5'], showLine: false },
] as const

const stepDescriptions: Record<LcmDivisionStep, string> = {
  0: '세 수를 차례차례 나누며 최소공배수를 찾아보자.',
  1: '18을 3으로 나누면 6이므로 첫 칸에 6을 적는다.',
  2: '36을 3으로 나누면 12가 된다.',
  3: '45를 3으로 나누면 15가 되어 첫 번째 나눗셈이 끝난다.',
  4: '이제 6, 12, 15를 다시 3으로 나누면 2, 4, 5가 된다.',
  5: '2와 4는 2로 나누고 5는 그대로 내려서 마지막 몫 1, 2, 5를 만든다.',
  6: '왼쪽의 수와 마지막 몫을 모두 곱한 값 180이 최소공배수이다.',
}

export function LcmDivisionTableMotion({
  className,
  step = 6,
}: LcmDivisionTableMotionProps) {
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
              : rowIndex === 2 ? step >= 4
              : step >= 5

            const showBracket =
              rowIndex === 0 ? true
              : rowIndex === 1 ? step >= 3
              : rowIndex === 2 ? step >= 5
              : false

            const showDivisor =
              rowIndex === 0 ? step >= 1 && Boolean(row.divisor)
              : rowIndex === 1 ? step >= 4 && Boolean(row.divisor)
              : rowIndex === 2 ? step >= 5 && Boolean(row.divisor)
              : false

            const showUnderline =
              rowIndex === 0
                ? row.showLine
                : rowIndex === 1
                  ? row.showLine && step >= 3
                  : rowIndex === 2
                    ? row.showLine && step >= 5
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
                    rowIndex === 0
                      ? true
                      : rowIndex === 1
                        ? step >= valueIndex + 1
                        : rowIndex === 2
                          ? step >= 4
                          : step >= 5

                  return (
                    <div
                      key={`${rowIndex}-${value}`}
                      className={cn(
                        'transition-opacity',
                        (!rowVisible || !valueVisible) && 'invisible',
                        rowIndex === 2 && value === '5' && 'rounded-full bg-[#F9D0DD]',
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

      {step >= 5 ? (
        <motion.div
          className="mt-3 rounded-xl bg-[#FFF4F1] px-4 py-3 text-center text-[13px] font-extrabold leading-[1.7] text-[#A34735]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.12 }}
        >
          세 수의 공약수가 없으면 두 수의 공약수로 나누고, 나누어지지 않는 수는 그대로 아래로 내린다.
        </motion.div>
      ) : null}

      {step >= 6 ? (
        <motion.div
          className="mt-3 rounded-xl bg-[#1F4F8A] px-4 py-3 text-center text-[16px] font-extrabold text-white"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          최소공배수 = <MathInline tex={'3 \\times 3 \\times 2 \\times 1 \\times 2 \\times 5 = 180'} className="align-middle text-white" />
        </motion.div>
      ) : null}
    </div>
  )
}
