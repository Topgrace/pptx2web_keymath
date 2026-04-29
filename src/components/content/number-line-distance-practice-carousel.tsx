import { useEffect, useState, type ReactNode } from 'react'
import { motion, type PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type DistancePracticeItem = {
  id: string
  pointA: string
  pointB: string
  valueA: number
  valueB: number
  min: number
  max: number
}

const DISTANCE_ITEMS: DistancePracticeItem[] = [
  {
    id: 'd1',
    pointA: 'A',
    pointB: 'B',
    valueA: -2,
    valueB: 1,
    min: -3,
    max: 3,
  },
  {
    id: 'd2',
    pointA: 'C',
    pointB: 'D',
    valueA: -1.5,
    valueB: 0.5,
    min: -3,
    max: 3,
  },
  {
    id: 'd3',
    pointA: 'E',
    pointB: 'F',
    valueA: -0.5,
    valueB: 2,
    min: -3,
    max: 3,
  },
]

const formatTick = (value: number) => (value > 0 ? `+${value}` : value)

const valueToX = (value: number, min: number, max: number) => {
  const startX = 40
  const endX = 460
  return startX + ((value - min) / (max - min)) * (endX - startX)
}

function DistanceNumberLine({ item }: { item: DistancePracticeItem }) {
  const xA = valueToX(item.valueA, item.min, item.max)
  const xB = valueToX(item.valueB, item.min, item.max)
  const segmentStart = Math.min(xA, xB)
  const segmentEnd = Math.max(xA, xB)
  const ticks = Array.from({ length: item.max - item.min + 1 }, (_, index) => item.min + index)

  return (
    <div className="rounded-xl bg-white px-1 py-5 shadow-sm sm:px-3">
      <svg
        viewBox="0 0 500 142"
        className="mt-2 h-auto w-full overflow-visible sm:mt-3"
        role="img"
        aria-label={`점 ${item.pointA}와 점 ${item.pointB}가 표시된 수직선`}
      >
        <line x1="20" y1="70" x2="480" y2="70" stroke="#334155" strokeWidth="3" />
        <polygon points="20,70 34,62 34,78" fill="#334155" />
        <polygon points="480,70 466,62 466,78" fill="#334155" />

        <line
          x1={segmentStart}
          y1="70"
          x2={segmentEnd}
          y2="70"
          stroke="#f97316"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.78"
        />

        <g fontSize="18" fontWeight="800" fill="#475569" textAnchor="middle" fontFamily="sans-serif">
          {ticks.map((value) => {
            const x = valueToX(value, item.min, item.max)

            return (
              <g key={value}>
                <line x1={x} y1="58" x2={x} y2="82" stroke="#475569" strokeWidth="2.5" />
                <text x={x} y="118">
                  {formatTick(value)}
                </text>
              </g>
            )
          })}
        </g>

        <g textAnchor="middle" fontFamily="sans-serif">
          {[
            { label: item.pointA, x: xA, color: '#2563eb' },
            { label: item.pointB, x: xB, color: '#2E7D57' },
          ].map((point) => (
            <g key={point.label}>
              <line
                x1={point.x}
                y1="28"
                x2={point.x}
                y2="70"
                stroke={point.color}
                strokeWidth="3"
                strokeDasharray="5 4"
              />
              <circle cx={point.x} cy="70" r="9" fill={point.color} />
              <text x={point.x} y="22" fill="#111827" fontSize="28" fontWeight="900">
                {point.label}
              </text>
            </g>
          ))}
        </g>

        <text
          x={(segmentStart + segmentEnd) / 2}
          y="48"
          fill="#9a3412"
          fontSize="16"
          fontWeight="900"
          textAnchor="middle"
          fontFamily="sans-serif"
        >
          거리
        </text>
      </svg>

      <div className="mt-4 text-center text-[18px] font-extrabold leading-[1.7] text-[#1F3554] sm:text-[21px]">
        두 점 {item.pointA}, {item.pointB} 사이의 거리는?
      </div>
    </div>
  )
}

export function NumberLineDistancePracticeCarousel({
  blank,
  solvedAnswers,
  recentCorrectBlankId,
}: {
  blank: (id: string) => ReactNode
  solvedAnswers: Record<string, string>
  recentCorrectBlankId: string | null
}) {
  const currentIndex = DISTANCE_ITEMS.findIndex((item) => !solvedAnswers[item.id])
  const recentCorrectIndex = recentCorrectBlankId
    ? DISTANCE_ITEMS.findIndex((item) => item.id === recentCorrectBlankId)
    : -1
  const defaultIndex =
    recentCorrectIndex >= 0
      ? recentCorrectIndex
      : currentIndex === -1
        ? DISTANCE_ITEMS.length - 1
        : currentIndex
  const [viewIndex, setViewIndex] = useState(defaultIndex)
  const solvedCount = Object.keys(solvedAnswers).length
  const isComplete = solvedCount === DISTANCE_ITEMS.length
  const activeIndex = Math.min(viewIndex, defaultIndex)
  const activeItem = DISTANCE_ITEMS[activeIndex]
  const isShowingCorrectFeedback = recentCorrectBlankId === activeItem.id
  const canMovePrev = activeIndex > 0 && Boolean(solvedAnswers[DISTANCE_ITEMS[activeIndex - 1].id])
  const canMoveNext = activeIndex < defaultIndex

  useEffect(() => {
    setViewIndex(defaultIndex)
  }, [defaultIndex])

  const movePrev = () => {
    if (!canMovePrev) return
    setViewIndex((index) => Math.max(0, index - 1))
  }

  const moveNext = () => {
    if (!canMoveNext) return
    setViewIndex((index) => Math.min(defaultIndex, index + 1))
  }

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeDistance = info.offset.x
    const swipeVelocity = info.velocity.x

    if (swipeDistance > 55 || swipeVelocity > 500) {
      movePrev()
      return
    }

    if (swipeDistance < -55 || swipeVelocity < -500) {
      moveNext()
    }
  }

  return (
    <div className="text-left">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={movePrev}
            disabled={!canMovePrev}
            aria-label="이전 거리 퀴즈 보기"
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
            {isComplete ? '완료' : `${activeIndex + 1} / ${DISTANCE_ITEMS.length}`}
          </div>
          <button
            type="button"
            onClick={moveNext}
            disabled={!canMoveNext}
            aria-label="다음 거리 퀴즈 보기"
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
          {DISTANCE_ITEMS.map((item, index) => (
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
        drag={canMovePrev || canMoveNext ? 'x' : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.16}
        onDragEnd={handleDragEnd}
        className="rounded-2xl border border-[#D6DDE5] bg-[#FFFDF5] px-2 py-6 shadow-[0_10px_24px_rgba(80,60,20,0.08)] sm:px-4"
      >
        <DistanceNumberLine item={activeItem} />

        <div className="mt-5 flex justify-center">
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
    </div>
  )
}
