import { useEffect, useState, type ReactNode } from 'react'
import { motion, type PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type PracticeItem = {
  id: string
  label: string
  question: string
  hint: string
  solvedNote: string
}

const PRACTICE_ITEMS: PracticeItem[] = [
  {
    id: 'abs5',
    label: '1',
    question: '절댓값이 5인 수를 모두 찾으면?',
    hint: '0에서 같은 거리만큼 떨어진 수를 생각해요.',
    solvedNote: '+5와 -5는 모두 0에서 5만큼 떨어져 있어요.',
  },
  {
    id: 'abs0',
    label: '2',
    question: '절댓값이 0인 수를 모두 찾으면?',
    hint: '0에서 0만큼 떨어진 수는 하나뿐이에요.',
    solvedNote: '0은 원점에 있으므로 절댓값이 0이에요.',
  },
  {
    id: 'absNegative',
    label: '3',
    question: '절댓값이 -1인 수를 모두 찾으면?',
    hint: '절댓값은 0으로부터 떨어진 거리예요.',
    solvedNote: '거리는 음수가 될 수 없으므로 그런 수는 없어요.',
  },
]

export function AbsoluteValuePracticeCarousel({
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
  const isActiveSolved = Boolean(solvedAnswers[activeItem.id])
  const isShowingCorrectFeedback = recentCorrectBlankId === activeItem.id
  const canMovePrev = activeIndex > 0 && Boolean(solvedAnswers[PRACTICE_ITEMS[activeIndex - 1].id])
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
    if (info.offset.x > 55 || info.velocity.x > 500) {
      movePrev()
      return
    }

    if (info.offset.x < -55 || info.velocity.x < -500) {
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
            onClick={moveNext}
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
        drag={canMovePrev || canMoveNext ? 'x' : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.16}
        onDragEnd={handleDragEnd}
        className="rounded-2xl border border-[#D6DDE5] bg-[#FFFDF5] px-4 py-5 shadow-[0_10px_24px_rgba(80,60,20,0.08)] sm:px-5"
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="grid size-7 place-items-center rounded-full bg-[#8B5E16] text-[14px] font-black text-white">
            {activeItem.label}
          </div>
          <div className="text-[13px] font-bold text-slate-500">절댓값 확인</div>
        </div>

        <div className="rounded-xl bg-white px-4 py-5 text-center shadow-sm">
          <div className="break-keep text-[22px] font-black leading-[1.45] text-[#1F3554]">
            {activeItem.question}
          </div>
          <div className="mt-3 text-[14px] font-bold leading-[1.6] text-slate-500">
            {activeItem.hint}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 text-[18px] font-extrabold text-slide-gray">
          <span>답</span>
          {blank(activeItem.id)}
        </div>

        {(isShowingCorrectFeedback || isActiveSolved) && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="mt-4 rounded-xl border border-[#2E7D57]/20 bg-[#2E7D57]/10 px-4 py-2 text-center text-[15px] font-extrabold leading-[1.6] text-[#2E7D57]"
          >
            {activeItem.solvedNote}
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
