import { useEffect, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type PracticeItem = {
  id: string
  label: string
  setup: ReactNode
  target: string
}

const PRACTICE_ITEMS: PracticeItem[] = [
  {
    id: 'q1',
    label: '(1)',
    setup: <>영상 15 ℃를 +15 ℃로 나타낼 때,</>,
    target: '영하 6 ℃',
  },
  {
    id: 'q2',
    label: '(2)',
    setup: <>10년 전을 -10년으로 나타낼 때,</>,
    target: '2년 후',
  },
  {
    id: 'q3',
    label: '(3)',
    setup: <>3 kg 증가를 +3 kg으로 나타낼 때,</>,
    target: '4 kg 감소',
  },
  {
    id: 'q4',
    label: '(4)',
    setup: <>지하 20 m를 -20 m로 나타낼 때,</>,
    target: '지상 10 m',
  },
  {
    id: 'q5',
    label: '(5)',
    setup: <>5점이 깎인 것을 -5점으로 나타낼 때,</>,
    target: '10점을 얻은 것',
  },
  {
    id: 'q6',
    label: '(6)',
    setup: <>동쪽 150 m를 +150 m로 나타낼 때,</>,
    target: '서쪽 200 m',
  },
]

export function SignedNumberPracticeCarousel({
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
          <div className="text-[13px] font-bold text-slate-500">부호로 나타내기</div>
        </div>

        <div className="rounded-xl bg-white px-4 py-4 text-[18px] font-extrabold leading-[1.85] text-[#1F3554] shadow-sm">
          <div>{activeItem.setup}</div>
          <div className="mt-2 inline-block border-b-2 border-[#1F3554] pb-0.5">
            {activeItem.target}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 text-[18px] font-extrabold text-slide-gray">
          <span>답</span>
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
            : '밑줄 친 부분을 부호가 있는 수로 나타내세요.'}
      </div>
    </div>
  )
}
