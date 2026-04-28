import { useEffect, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type PracticeItem = {
  id: string
  label: string
  pointLabel: string
  pointValue: number
}

const PRACTICE_ITEMS: PracticeItem[] = [
  {
    id: 'q1',
    label: '(1)',
    pointLabel: 'A',
    pointValue: 1.5,
  },
  {
    id: 'q2',
    label: '(2)',
    pointLabel: 'B',
    pointValue: -2,
  },
  {
    id: 'q3',
    label: '(3)',
    pointLabel: 'C',
    pointValue: -0.5,
  },
]

const valueToX = (value: number) => 250 + value * 100

function NumberLineQuestion({ item }: { item: PracticeItem }) {
  const pointX = valueToX(item.pointValue)

  return (
    <div className="rounded-xl bg-white px-1 py-5 shadow-sm sm:px-3">
      <svg viewBox="0 0 500 120" className="mt-2 h-auto w-full overflow-visible sm:mt-3" role="img" aria-label={`${item.pointLabel}가 표시된 수직선`}>
        <line x1="20" y1="62" x2="480" y2="62" stroke="#334155" strokeWidth="3" />
        <polygon points="20,62 34,54 34,70" fill="#334155" />
        <polygon points="480,62 466,54 466,70" fill="#334155" />

        <g fontSize="22" fontWeight="800" fill="#475569" textAnchor="middle" fontFamily="sans-serif">
          {[-2, -1, 0, 1, 2].map((value) => {
            const x = valueToX(value)
            return (
              <g key={value}>
                <line x1={x} y1="50" x2={x} y2="74" stroke="#475569" strokeWidth="2.5" />
                <text x={x} y="108">
                  {value > 0 ? `+${value}` : value}
                </text>
              </g>
            )
          })}
        </g>

        <g textAnchor="middle" fontFamily="sans-serif">
          <line x1={pointX} y1="24" x2={pointX} y2="62" stroke="#f97316" strokeWidth="3" strokeDasharray="5 4" />
          <circle cx={pointX} cy="62" r="9" fill="#f97316" />
          <text x={pointX} y="18" fill="#111827" fontSize="28" fontWeight="900">
            {item.pointLabel}
          </text>
        </g>
      </svg>

      <div className="mt-4 text-center text-[18px] font-extrabold leading-[1.7] text-[#1F3554] sm:text-[21px]">
        점 {item.pointLabel}에 대응하는 수는?
      </div>
    </div>
  )
}

export function NumberLinePointPracticeCarousel({
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
        className="rounded-2xl border border-[#D6DDE5] bg-[#FFFDF5] px-2 py-6 shadow-[0_10px_24px_rgba(80,60,20,0.08)] sm:px-4"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="text-[18px] font-black text-[#1F3554]">{activeItem.label}</div>
          <div className="text-[13px] font-bold text-slate-500">대응하는 수 찾기</div>
        </div>

        <NumberLineQuestion item={activeItem} />

        <div className="mt-5 flex items-center justify-center gap-2 text-[18px] font-extrabold text-slide-gray">
          <span>{activeItem.pointLabel} =</span>
          {blank(activeItem.id)}
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
            : '수직선 위의 점에 대응하는 수를 고르세요.'}
      </div>
    </div>
  )
}
