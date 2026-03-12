import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { MathInline } from '@/components/math'
import { cn } from '@/lib/utils'

type PrimeStep = 0 | 1 | 2 | 3

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

const resultChips = [
  { key: 'gcd-2', sourceKey: 'pick-2', base: '2' },
  { key: 'gcd-3', sourceKey: 'pick-3', base: '3' },
] as const

function isHighlightedChip(chip: FactorChipData, step: PrimeStep) {
  return step >= 2 && chip.highlight
}

function isDimmedChip(chip: FactorChipData, step: PrimeStep) {
  return step >= 2 && !chip.highlight
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
        'relative inline-flex min-w-[46px] items-center justify-center rounded-2xl border px-3 py-2',
        'text-[18px] font-black leading-none shadow-[0_10px_24px_rgba(31,79,138,0.12)]',
        className,
      )}
    >
      <span>{chip.base}</span>
      {chip.exponent ? (
        <span className="absolute -right-1.5 -top-1.5 rounded-full bg-white/95 px-1.5 py-0.5 text-[10px] font-black text-[#1F4F8A] shadow-sm">
          {chip.exponent}
        </span>
      ) : null}
    </motion.div>
  )
}

function ResultTray({ step }: { step: PrimeStep }) {
  return (
    <div className="rounded-[28px] border border-[#b8d9ff] bg-[linear-gradient(180deg,#f7fbff_0%,#e8f4ff_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] font-black uppercase tracking-[0.24em] text-[#6C88AD]">
            Result Tray
          </div>
          <div className="text-[15px] font-extrabold text-[#1F4F8A]">
            최대공약수 재료를 조립해 보자
          </div>
        </div>
        <div className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-black text-[#7C96B8] shadow-sm">
          step {step}
        </div>
      </div>

      <div className="flex min-h-[84px] flex-col justify-center rounded-[22px] border border-dashed border-[#9CC7FF] bg-white/75 px-4 py-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {step < 3 ? (
            <>
              <span className="rounded-full bg-[#d9ecff] px-3 py-1 text-[12px] font-black text-[#4A78A8]">
                아직 조립 전
              </span>
              <span className="text-center text-[13px] font-bold leading-[1.6] text-[#6C7893]">
                공통 소인수를 골라 아래 정답칸으로 보내 보세요.
              </span>
            </>
          ) : (
            <>
              {resultChips.map((chip, index) => (
                <motion.div
                  key={chip.key}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.24, delay: index * 0.08 }}
                >
                  <FactorChip
                    chip={chip}
                    layoutId={chip.sourceKey}
                    className="border-[#4F9BFF] bg-[linear-gradient(135deg,#ffffff_0%,#dff0ff_100%)] text-[#1A5FAE]"
                  />
                  {index === 0 ? <span className="text-[20px] font-black text-[#7AA7D8]">×</span> : null}
                </motion.div>
              ))}
            </>
          )}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {step >= 3 ? (
          <motion.div
            key="gcd-finale"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: [1, 1.08, 1],
              boxShadow: [
                '0 0 0 rgba(78,154,255,0)',
                '0 0 32px rgba(78,154,255,0.34)',
                '0 0 18px rgba(78,154,255,0.18)',
              ],
            }}
            exit={{ opacity: 0, y: 8 }}
            transition={{
              opacity: { duration: 0.25 },
              y: { duration: 0.25 },
              scale: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
              boxShadow: { duration: 1.1, repeat: Infinity, repeatType: 'mirror' },
            }}
            className="mt-4 rounded-[24px] border border-[#8EC5FF] bg-[radial-gradient(circle_at_top,#8ed0ff_0%,#1F4F8A_62%,#173a66_100%)] px-4 py-4 text-center text-white"
          >
            <div className="text-[12px] font-black uppercase tracking-[0.3em] text-[#D6EEFF]">
              Finale
            </div>
            <div className="mt-2 text-[14px] font-bold text-[#EDF7FF]">
              선택한 공통 소인수를 곱하면
            </div>
            <div className="mt-2 text-[30px] font-black leading-none">
              최대공약수 = 6
            </div>
            <div className="mt-2 text-[14px] font-bold text-[#DDF1FF]">
              <MathInline tex={'2 \\times 3 = 6'} className="align-middle text-white" />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export function GcdPrimeFactorizationMotion({
  className,
  step = 3,
}: GcdPrimeFactorizationMotionProps) {
  return (
    <LayoutGroup>
      <div
        className={cn(
          'rounded-[28px] border-2 border-[#F0DC45] bg-[linear-gradient(180deg,#fffef7_0%,#fff7d8_100%)] p-4 md:p-5',
          className,
        )}
      >
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.26em] text-[#7E6A00]">
              Prime Factory
            </div>
            <div className="mt-1 text-[15px] font-extrabold text-[#1F4F8A]">
              소인수 블록을 보고 공통 재료만 골라 보자
            </div>
          </div>
          <div className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-black text-[#876A00] shadow-sm">
            {step === 0 && '준비 중'}
            {step === 1 && '분해 확인'}
            {step === 2 && '공통 소인수 스캔'}
            {step === 3 && '최대공약수 조립'}
          </div>
        </div>

        <motion.div
          className="rounded-2xl bg-white/80 px-4 py-3 text-center text-[14px] font-bold leading-[1.8] text-[#5A667C] shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
          animate={{
            borderColor: step >= 2 ? '#F0DC45' : '#dbe8f5',
            backgroundColor: step >= 2 ? 'rgba(255,248,207,0.88)' : 'rgba(255,255,255,0.8)',
          }}
          transition={{ duration: 0.24 }}
        >
          {step === 0 && '버튼을 눌러 24, 30, 60을 소인수 블록으로 분해해 보세요.'}
          {step === 1 && '세 수를 소인수 블록으로 나란히 펼쳤어요. 이제 겹치는 재료를 찾아보세요.'}
          {step === 2 && '공통 소인수는 2와 3이고, 지수가 다르면 더 작은 것을 선택해요.'}
          {step === 3 && '선택한 재료 2와 3이 정답칸으로 이동해 최대공약수 6이 완성됩니다.'}
        </motion.div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
          <div className="rounded-[26px] bg-white/75 p-4 shadow-[0_12px_32px_rgba(31,79,138,0.08)]">
            <div className="mb-3 text-[12px] font-black uppercase tracking-[0.24em] text-[#6C88AD]">
              Number Breakdown
            </div>

            <div className="space-y-3">
              {factorizationRows.map((row, rowIndex) => {
                const rowsVisible = step >= 1
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
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-xl bg-[#1F4F8A] px-3 py-1.5 text-[13px] font-black text-white shadow-sm">
                        {row.value}
                      </span>
                      <span className="text-[16px] font-black text-[#37557A]">=</span>
                      <div className="flex flex-1 flex-wrap items-center gap-2">
                        {rowsVisible ? (
                          row.chips.map((chip, chipIndex) => {
                            const movedToTray = step >= 3 && row.value === 30 && chip.selected
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
                                className="flex items-center gap-2"
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
                                  <div className="h-[48px] w-[50px] rounded-2xl border border-dashed border-[#bfd8f3] bg-[#eff6fd]" />
                                )}
                                {chipIndex < row.chips.length - 1 ? (
                                  <span className="text-[18px] font-black text-[#90A4BF]">×</span>
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
            </div>

            <motion.div
              className="mt-4 rounded-2xl border border-[#D8E7F7] bg-[#F6FBFF] px-4 py-3"
              animate={{
                opacity: step >= 2 ? 1 : 0.72,
                y: step >= 2 ? 0 : 4,
              }}
              transition={{ duration: 0.24 }}
            >
              <div className="text-[12px] font-black uppercase tracking-[0.2em] text-[#6C88AD]">
                Scan Result
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {step < 2 ? (
                  <span className="text-[13px] font-bold text-[#6F7D93]">
                    공통 소인수를 찾으면 선택 카드가 여기 나타납니다.
                  </span>
                ) : (
                  <>
                    {step < 3 ? (
                      <>
                        <FactorChip
                          chip={{ base: '2' }}
                          layoutId="pick-2"
                          className="border-[#F0C419] bg-[linear-gradient(135deg,#fffce8_0%,#ffe07d_100%)] text-[#805800]"
                        />
                        <span className="text-[18px] font-black text-[#90A4BF]">×</span>
                        <FactorChip
                          chip={{ base: '3' }}
                          layoutId="pick-3"
                          className="border-[#F0C419] bg-[linear-gradient(135deg,#fffce8_0%,#ffe07d_100%)] text-[#805800]"
                        />
                      </>
                    ) : (
                      <span className="text-[13px] font-bold text-[#5D7392]">
                        선택 카드가 결과 트레이로 이동했어요.
                      </span>
                    )}
                    <span className="rounded-full bg-[#EEF6FF] px-3 py-1 text-[12px] font-black text-[#3C679A]">
                      작은 지수 선택
                    </span>
                  </>
                )}
              </div>
            </motion.div>
          </div>

          <ResultTray step={step} />
        </div>
      </div>
    </LayoutGroup>
  )
}
