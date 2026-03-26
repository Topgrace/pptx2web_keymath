import { LayoutGroup, motion } from 'framer-motion'
import { MathInline } from '@/components/math'
import { cn } from '@/lib/utils'

type PrimeStep = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

interface GcdPrimeFactorizationMotionProps {
  className?: string
  step?: PrimeStep
}

type FactorChipData = {
  key: string
  base: string
  exponent?: string
  highlight?: boolean
  selected?: boolean
}

type FactorRow = {
  value: number
  chips: FactorChipData[]
}

const factorizationRows: FactorRow[] = [
  {
    value: 24,
    chips: [
      { key: '24-2', base: '2', exponent: '3', highlight: true },
      { key: '24-3', base: '3', highlight: true },
    ],
  },
  {
    value: 30,
    chips: [
      { key: '30-2', base: '2', highlight: true, selected: true },
      { key: '30-3', base: '3', highlight: true, selected: true },
      { key: '30-5', base: '5' },
    ],
  },
  {
    value: 60,
    chips: [
      { key: '60-2', base: '2', exponent: '2', highlight: true },
      { key: '60-3', base: '3', highlight: true },
      { key: '60-5', base: '5' },
    ],
  },
]

function isHighlightedChip(chip: FactorChipData, step: PrimeStep) {
  return step >= 4 && chip.highlight
}

function isDimmedChip(chip: FactorChipData, step: PrimeStep) {
  return step >= 4 && !chip.highlight
}

function FactorChip({
  chip,
  layoutId,
  className,
}: {
  chip: { base: string; exponent?: string }
  layoutId?: string
  className?: string
}) {
  return (
    <motion.div
      layoutId={layoutId}
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

export function GcdPrimeFactorizationMotion({
  className,
  step = 7,
}: GcdPrimeFactorizationMotionProps) {
  return (
    <LayoutGroup>
      <div
        className={cn(
          'rounded-[28px] border-2 border-[#F0DC45] bg-[linear-gradient(180deg,#fffef7_0%,#fff7d8_100%)] p-4 md:p-5',
          className,
        )}
      >
        <div className="flex flex-col gap-4">
            <div className="space-y-3">
              {factorizationRows.map((row, rowIndex) => {
                const rowsVisible = step >= rowIndex + 1
                return (
                  <motion.div
                    key={row.value}
                    className="rounded-2xl bg-[#F8FBFF] px-4 py-3"
                    animate={{
                      opacity: rowsVisible ? 1 : 0.45,
                      x: rowsVisible ? 0 : -6,
                      y: rowsVisible ? 0 : 6,
                    }}
                    transition={{ duration: 0.28, delay: rowIndex * 0.06 }}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="shrink-0 rounded-xl bg-[#1F4F8A] px-3 py-1.5 text-[13px] font-black text-white shadow-sm">
                        {row.value}
                      </span>
                      <span className="shrink-0 text-[16px] font-black text-[#37557A]">=</span>
                      <div className="flex min-w-0 flex-1 flex-nowrap items-center gap-1.5 sm:gap-2">
                        {rowsVisible ? (
                          row.chips.map((chip, chipIndex) => {
                            const movedToTray = false
                            const highlight = isHighlightedChip(chip, step)
                            const dimmed = isDimmedChip(chip, step)

                            return (
                              <motion.div
                                key={chip.key}
                                initial={false}
                                animate={{
                                  opacity: movedToTray ? 0 : dimmed ? 0.35 : 1,
                                  scale: highlight ? 1.03 : 1,
                                  y: dimmed ? 0 : highlight ? -2 : 0,
                                }}
                                transition={{ duration: 0.22, delay: chipIndex * 0.04 }}
                                className="flex shrink-0 items-center gap-1.5 sm:gap-2"
                              >
                                {!movedToTray ? (
                                  <FactorChip
                                    chip={chip}
                                    className={cn(
                                      highlight
                                        ? 'border-[#F0C419] bg-[linear-gradient(135deg,#fffef6_0%,#ffe98c_100%)] text-[#7A5600]'
                                        : 'border-[#d9e5f4] bg-white text-[#31425C]',
                                    )}
                                  />
                                    ) : (
                                  <div className="h-[44px] w-[42px] rounded-2xl border border-dashed border-[#bfd8f3] bg-[#eff6fd] sm:h-[48px] sm:w-[50px]" />
                                )}
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
              className="flex min-h-[52px] flex-wrap items-center gap-2 px-1 py-1"
              animate={{
                opacity: step >= 4 ? 1 : 0.72,
                y: step >= 4 ? 0 : 4,
              }}
              transition={{ duration: 0.24 }}
            >
              {step < 4 ? (
                null
              ) : (
                <>
                  {step <= 7 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.24 }}
                      className="flex flex-col items-start gap-1.5"
                    >
                      <span className="rounded-full bg-[#FFF7D6] px-3 py-1.5 text-[13px] font-black text-[#7A5600] shadow-[0_8px_18px_rgba(240,196,25,0.18)]">
                        공통인 소인수: 2, 3
                      </span>
                      {step >= 5 ? (
                        <span className="text-[13px] font-bold text-[#5D7392]">
                          2의 거듭제곱꼴의 공약수는{' '}
                          <MathInline
                            tex={'2^3,\\ 2^1,\\ 2^2 \\text{ 중 가장 작은 } 2^1 = 2'}
                            className="align-middle text-[#5D7392]"
                          />
                        </span>
                      ) : null}
                      {step >= 6 ? (
                        <span className="text-[13px] font-bold text-[#5D7392]">
                          3의 거듭제곱꼴의 공약수는{' '}
                          <MathInline
                            tex={'3^1,\\ 3^1,\\ 3^1 \\text{ 중 가장 작은 } 3^1 = 3'}
                            className="align-middle text-[#5D7392]"
                          />
                        </span>
                      ) : null}
                    </motion.div>
                    ) : null}
                  {step === 7 ? (
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[13px] font-black text-[#5D7392]">(최대공약수) =</span>
                      <FactorChip
                        chip={{ base: '2' }}
                        className="border-[#F0C419] bg-[linear-gradient(135deg,#fffce8_0%,#ffe07d_100%)] text-[#805800]"
                      />
                      <span className="text-[18px] font-black text-[#90A4BF]">×</span>
                      <FactorChip
                        chip={{ base: '3' }}
                        className="border-[#F0C419] bg-[linear-gradient(135deg,#fffce8_0%,#ffe07d_100%)] text-[#805800]"
                      />
                      <span className="text-[13px] font-black text-[#5D7392]">= 6</span>
                    </div>
                  ) : null}
                  {step === 7 ? (
                    <span className="rounded-full bg-[#EEF6FF] px-3 py-1 text-[12px] font-black text-[#3C679A]">
                      공약수의 곱                    </span>
                  ) : null}
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </LayoutGroup>
  )
}
