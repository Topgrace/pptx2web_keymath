import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import { cn } from '@/lib/utils'

export function StepViewToggle() {
  const { totalSteps, showAllSteps, toggleAllStepsView } = useSlideProgress()

  return (
    <div className="h-[76px]">
      <div className="pointer-events-none fixed top-3 left-1/2 z-[995] w-full max-w-[480px] -translate-x-1/2 px-4">
        <motion.button
          type="button"
          aria-pressed={showAllSteps}
          aria-label={showAllSteps ? '단계별 보기로 전환' : '현재 페이지의 모든 단계 표시'}
          whileTap={{ scale: 0.98 }}
          onClick={toggleAllStepsView}
          className={cn(
            'pointer-events-auto inline-flex flex-col items-start gap-1 rounded-[20px] border px-4 py-2.5 text-left backdrop-blur-md transition-colors',
            'shadow-[0_10px_28px_rgba(39,58,80,0.14)]',
            showAllSteps
              ? 'border-[#1F4F8A]/10 bg-[#1F4F8A]/92 text-white'
              : 'border-white/70 bg-white/78 text-[#5D6472]',
          )}
        >
          <span className={cn('text-[11px] font-bold leading-none', showAllSteps ? 'text-white/72' : 'text-[#7A8090]')}>
            현재 페이지 · {totalSteps}단계
          </span>
          <span className="flex items-center gap-1 text-[14px] font-black leading-none">
            {showAllSteps ? '단계별로 보기' : '모든 단계 표시'}
            {showAllSteps ? <ChevronUp className="size-4" strokeWidth={2.5} /> : <ChevronDown className="size-4" strokeWidth={2.5} />}
          </span>
        </motion.button>
      </div>
    </div>
  )
}
