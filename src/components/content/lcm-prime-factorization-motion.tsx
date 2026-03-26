import { LayoutGroup, motion } from 'framer-motion'
import { MathInline } from '@/components/math'
import { cn } from '@/lib/utils'

export type LcmPrimeStep = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

interface LcmPrimeFactorizationMotionProps {
  className?: string
  step?: LcmPrimeStep
}

type FactorChipData = {
  key: string
  base: string
  exponent?: string
  highlight?: boolean
  selected?: boolean
  alignColumn?: 1 | 2 | 3
}

type FactorRow = {
  value: number
  chips: FactorChipData[]
}

const factorizationRows: FactorRow[] = [
  {
    value: 18,
    chips: [
      { key: '18-2', base: '2', highlight: true },
      { key: '18-3', base: '3', exponent: '2', highlight: true, selected: true, alignColumn: 2 },
    ],
  },
  {
    value: 36,
    chips: [
      { key: '36-2', base: '2', exponent: '2', highlight: true, selected: true, alignColumn: 1 },
      { key: '36-3', base: '3', exponent: '2', highlight: true, alignColumn: 2 },
    ],
  },
  {
    value: 45,
    chips: [
      { key: '45-3', base: '3', exponent: '2', highlight: true, alignColumn: 2 },
      { key: '45-5', base: '5', highlight: true, selected: true, alignColumn: 3 },
    ],
  },
]

function FactorChip({
  chip,
  className,
}: {
  chip: { base: string; exponent?: string }
  className?: string
}) {
  return (
    <motion.div
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      className={cn(
        'relative inline-flex min-w-[40px] items-center justify-center rounded-2xl border px-2.5 py-1.5',
        'text-[17px] font-black leading-none shadow-[0_10px_24px_rgba(31,79,138,0.12)] sm:min-w-[46px] sm:px-3 sm:py-2 sm:text-[18px]',
        className,
      )}
    >
      <span>{chip.base}</span>
      {chip.exponent ? (
        <span className="absolute -right-1.5 -top-1.5 rounded-full bg-white/95 px-1.5 py-0.5 text-[9px] font-black text-[#1F4F8A] shadow-sm sm:text-[10px]">
          {chip.exponent}
        </span>
      ) : null}
    </motion.div>
  )
}

export function LcmPrimeFactorizationMotion({
  className,
  step = 7,
}: LcmPrimeFactorizationMotionProps) {
  return (
    <LayoutGroup>
      <div
        className={cn(
          'rounded-[28px] border-2 border-[#F0DC45] bg-[linear-gradient(180deg,#fffef7_0%,#fff7d8_100%)] p-4 md:p-5',
          className,
        )}
      >
        <div className="mb-3 text-center text-sm font-extrabold text-[#1F4F8A]">
          공통 소인수와 공통이 아닌 소인수를 모두 곱한다.
        </div>

        <div className="space-y-3">
          {factorizationRows.map((row, rowIndex) => {
            const rowVisible = step >= rowIndex + 1

            return (
              <motion.div
                key={row.value}
                className="rounded-2xl bg-[#F8FBFF] px-4 py-3"
                animate={{
                  opacity: rowVisible ? 1 : 0.45,
                  x: rowVisible ? 0 : -6,
                  y: rowVisible ? 0 : 6,
                }}
                transition={{ duration: 0.28, delay: rowIndex * 0.06 }}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="shrink-0 rounded-xl bg-[#1F4F8A] px-3 py-1.5 text-[13px] font-black text-white shadow-sm">
                    {row.value}
                  </span>
                  <span className="shrink-0 text-[16px] font-black text-[#37557A]">=</span>
                  <div
                    className={cn(
                      'min-w-0 flex-1',
                      step >= 4
                        ? 'grid grid-cols-3 items-center gap-2 sm:gap-3'
                        : 'flex flex-nowrap items-center gap-1.5 sm:gap-2',
                    )}
                  >
                    {rowVisible ? (
                      row.chips.map((chip, chipIndex) => {
                        const highlight = step >= 4 && chip.highlight
                        const selected = step >= 7 && chip.selected

                        return (
                          <motion.div
                            key={chip.key}
                            layout
                            initial={false}
                            animate={{
                              opacity: highlight ? 1 : 0.86,
                              scale: selected ? 1.04 : highlight ? 1.02 : 1,
                              y: selected ? -2 : 0,
                            }}
                            transition={{ duration: 0.22, delay: chipIndex * 0.04 }}
                            className={cn(
                              'flex shrink-0 items-center gap-1.5 sm:gap-2',
                              step >= 4 && chip.alignColumn ? 'justify-center' : undefined,
                            )}
                            style={step >= 4 && chip.alignColumn ? { gridColumn: `${chip.alignColumn}` } : undefined}
                          >
                            <FactorChip
                              chip={chip}
                              className={cn(
                                selected
                                  ? 'border-[#F0C419] bg-[linear-gradient(135deg,#fffce8_0%,#ffe07d_100%)] text-[#805800]'
                                  : highlight
                                    ? 'border-[#F0C419] bg-[linear-gradient(135deg,#fffef6_0%,#ffe98c_100%)] text-[#7A5600]'
                                    : 'border-[#d9e5f4] bg-white text-[#31425C]',
                              )}
                            />
                            {chipIndex < row.chips.length - 1 ? (
                              <span className="shrink-0 text-[17px] font-black text-[#90A4BF] sm:text-[18px]">×</span>
                            ) : null}
                          </motion.div>
                        )
                      })
                    ) : (
                      <div className="text-[14px] font-bold text-[#8A96AB]">
                        분해 결과가 여기에 펼쳐집니다.
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}

          <motion.div
            className="flex min-h-[56px] flex-wrap items-center gap-2 px-1 py-1"
            animate={{
              opacity: step >= 4 ? 1 : 0.72,
              y: step >= 4 ? 0 : 4,
            }}
            transition={{ duration: 0.24 }}
          >
            {step >= 4 ? (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.24 }}
                  className="flex flex-col items-start gap-1.5"
                >
                  <span className="rounded-full bg-[#FFF7D6] px-3 py-1.5 text-[13px] font-black text-[#7A5600] shadow-[0_8px_18px_rgba(240,196,25,0.18)]">
                    같은 소인수끼리 세로로 정렬해 보자.
                  </span>
                  {step >= 5 ? (
                    <span className="text-[13px] font-bold text-[#5D7392]">
                      필요한 소인수는{' '}
                      <MathInline tex={'2,\\ 3,\\ 5'} className="align-middle text-[#5D7392]" />
                      이다.
                    </span>
                  ) : null}
                  {step >= 6 ? (
                    <span className="text-[13px] font-bold text-[#5D7392]">
                      2의 지수는{' '}
                      <MathInline
                        tex={'2^1,\\ 2^2 \\text{ 중 가장 큰 } 2^2'}
                        className="align-middle text-[#5D7392]"
                      />
                      를 고른다.
                    </span>
                  ) : null}
                  {step >= 7 ? (
                    <span className="text-[13px] font-bold text-[#5D7392]">
                      3의 지수는 가장 큰{' '}
                      <MathInline tex={'3^2'} className="align-middle text-[#5D7392]" />
                      를 택하고, 공통이 아닌{' '}
                      <MathInline tex={'5'} className="align-middle text-[#5D7392]" />
                      도 함께 곱한다.
                    </span>
                  ) : null}
                </motion.div>

                {step === 8 ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[13px] font-black text-[#5D7392]">(최소공배수) =</span>
                    <FactorChip
                      chip={{ base: '2', exponent: '2' }}
                      className="border-[#F0C419] bg-[linear-gradient(135deg,#fffce8_0%,#ffe07d_100%)] text-[#805800]"
                    />
                    <span className="text-[18px] font-black text-[#90A4BF]">×</span>
                    <FactorChip
                      chip={{ base: '3', exponent: '2' }}
                      className="border-[#F0C419] bg-[linear-gradient(135deg,#fffce8_0%,#ffe07d_100%)] text-[#805800]"
                    />
                    <span className="text-[18px] font-black text-[#90A4BF]">×</span>
                    <FactorChip
                      chip={{ base: '5' }}
                      className="border-[#F0C419] bg-[linear-gradient(135deg,#fffce8_0%,#ffe07d_100%)] text-[#805800]"
                    />
                    <span className="text-[13px] font-black text-[#5D7392]">= 180</span>
                  </div>
                ) : null}
              </>
            ) : null}
          </motion.div>
        </div>
      </div>
    </LayoutGroup>
  )
}
