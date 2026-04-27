import { useEffect, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type PracticeItem = {
  id: string
  label: string
  numbers: ReactNode
}

function Fraction({
  numerator,
  denominator,
  sign,
}: {
  numerator: string
  denominator: string
  sign?: string
}) {
  return (
    <span className="inline-flex translate-y-[3px] items-center align-middle">
      {sign && <span className="mr-1">{sign}</span>}
      <span className="inline-flex flex-col items-center">
        <span className="border-b-[2px] border-[#1F3554] px-1 text-[0.86em] leading-[1.05]">{numerator}</span>
        <span className="px-1 text-[0.86em] leading-[1.05]">{denominator}</span>
      </span>
    </span>
  )
}

const PRACTICE_ITEMS: PracticeItem[] = [
  {
    id: 'q1',
    label: '(1)',
    numbers: '+1, +2, +3, +4',
  },
  {
    id: 'q2',
    label: '(2)',
    numbers: '0',
  },
  {
    id: 'q3',
    label: '(3)',
    numbers: (
      <>
        <Fraction numerator="6" denominator="2" sign="-" />, -10, -11, -12, -13
      </>
    ),
  },
  {
    id: 'q4',
    label: '(4)',
    numbers: (
      <>
        <Fraction numerator="1" denominator="5" sign="+" />,{' '}
        <Fraction numerator="3" denominator="2" sign="-" />, -0.3
      </>
    ),
  },
  {
    id: 'q5',
    label: '(5)',
    numbers: (
      <>
        +50, <Fraction numerator="1" denominator="4" sign="-" />, -12
      </>
    ),
  },
  {
    id: 'q6',
    label: '(6)',
    numbers: (
      <>
        +13, <Fraction numerator="6" denominator="5" />, 3.5
      </>
    ),
  },
]

export function ClassificationPracticeCarousel({
  blank,
  solvedAnswers,
  recentCorrectBlankId,
}: {
  blank: (id: string) => ReactNode
  solvedAnswers: Record<string, string>
  recentCorrectBlankId: string | null
}) {
  const currentIndex = PRACTICE_ITEMS.findIndex((item) => !solvedAnswers[item.id])
  const recentCorrectIndex = recentCorrectBlankId
    ? PRACTICE_ITEMS.findIndex((item) => item.id === recentCorrectBlankId)
    : -1
  const defaultIndex =
    recentCorrectIndex >= 0
      ? recentCorrectIndex
      : currentIndex === -1
        ? PRACTICE_ITEMS.length - 1
        : currentIndex
  const [viewIndex, setViewIndex] = useState(defaultIndex)
  const solvedCount = Object.keys(solvedAnswers).length
  const isComplete = solvedCount === PRACTICE_ITEMS.length
  const activeIndex = Math.min(viewIndex, defaultIndex)
  const activeItem = PRACTICE_ITEMS[activeIndex]
  const isShowingCorrectFeedback = recentCorrectBlankId === activeItem.id
  const canMovePrev = activeIndex > 0 && Boolean(solvedAnswers[PRACTICE_ITEMS[activeIndex - 1].id])
  const canMoveNext = activeIndex < defaultIndex

  useEffect(() => {
    setViewIndex(defaultIndex)
  }, [defaultIndex])

  return (
    <div className="text-left">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setViewIndex((index) => Math.max(0, index - 1))}
            disabled={!canMovePrev}
            aria-label="이전 퀴즈 보기"
            className={cn(
              'grid size-8 place-items-center rounded-full border text-[#1F3554] transition',
              canMovePrev
                ? 'border-[#BFCBDA] bg-white shadow-sm hover:bg-[#F5F8FC]'
                : 'cursor-not-allowed border-[#D7DCE2] bg-[#F3F5F7] text-slate-300',
            )}
          >
            <ChevronLeft className="size-4" strokeWidth={3} />
          </button>
          <div className="rounded-full bg-[#2E7D57]/10 px-3 py-1 text-[13px] font-extrabold text-[#2E7D57]">
            {isComplete ? '완료' : `${activeIndex + 1} / ${PRACTICE_ITEMS.length}`}
          </div>
          <button
            type="button"
            onClick={() => setViewIndex((index) => Math.min(defaultIndex, index + 1))}
            disabled={!canMoveNext}
            aria-label="다음 퀴즈 보기"
            className={cn(
              'grid size-8 place-items-center rounded-full border text-[#1F3554] transition',
              canMoveNext
                ? 'border-[#BFCBDA] bg-white shadow-sm hover:bg-[#F5F8FC]'
                : 'cursor-not-allowed border-[#D7DCE2] bg-[#F3F5F7] text-slate-300',
            )}
          >
            <ChevronRight className="size-4" strokeWidth={3} />
          </button>
        </div>
        <div className="flex items-center gap-1.5">
          {PRACTICE_ITEMS.map((item, index) => (
            <span
              key={item.id}
              className={cn(
                'h-2.5 rounded-full transition-all duration-300',
                solvedAnswers[item.id]
                  ? 'w-6 bg-[#2E7D57]'
                  : index === activeIndex
                    ? 'w-6 bg-[#D38A2C]'
                    : 'w-2.5 bg-[#D7DCE2]',
              )}
            />
          ))}
        </div>
      </div>

      <motion.div
        key={activeItem.id}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="rounded-2xl border border-[#D6DDE5] bg-[#FFFDF5] px-5 py-6 shadow-[0_10px_24px_rgba(80,60,20,0.08)]"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="text-[18px] font-black text-[#1F3554]">{activeItem.label}</div>
          <div className="text-[13px] font-bold text-slate-500">알맞은 분류 고르기</div>
        </div>

        <div className="mb-5 rounded-xl bg-white px-4 py-4 text-[22px] font-black leading-[1.7] text-[#1F3554] shadow-sm">
          {activeItem.numbers}
        </div>

        <div className="flex items-center justify-center gap-2 text-[18px] font-extrabold text-slide-gray">
          <span>(</span>
          {blank(activeItem.id)}
          <span>)</span>
        </div>

        {isShowingCorrectFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="mt-4 rounded-xl border border-[#2E7D57]/20 bg-[#2E7D57]/10 px-4 py-2 text-center text-[16px] font-extrabold text-[#2E7D57]"
          >
            맞았어요! 다음 문제로 넘어갑니다.
          </motion.div>
        )}
      </motion.div>

      <div className="mt-3 text-center text-[13px] font-bold leading-[1.6] text-slate-500">
        {isShowingCorrectFeedback
          ? '잠시 후 다음 문항이 나옵니다.'
          : canMoveNext
            ? '이전 문항을 확인하는 중입니다.'
            : '정답을 고르면 다음 문항으로 넘어갑니다.'}
      </div>
    </div>
  )
}
