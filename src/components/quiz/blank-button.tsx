import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { BlankType } from '@/schemas/step'
import 'katex/dist/katex.min.css'
import katex from 'katex'
import { useRef, useEffect } from 'react'

export function BlankButton({
  onClick,
  solved,
  solvedAnswer,
  blankType = 'normal',
  isLatex = false,
}: {
  onClick: () => void
  solved: boolean
  solvedAnswer: string | null
  blankType?: BlankType
  /** true일 때만 KaTeX 렌더링, false면 일반 텍스트(주변 폰트 유지) */
  isLatex?: boolean
}) {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (solved && solvedAnswer && ref.current) {
      if (isLatex) {
        try {
          katex.render(solvedAnswer, ref.current, { throwOnError: false })
        } catch {
          ref.current.textContent = solvedAnswer
        }
      } else {
        ref.current.textContent = solvedAnswer
      }
    }
  }, [solved, solvedAnswer, isLatex])

  const isExp = blankType === 'exponent'

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      whileTap={!solved ? { scale: 0.95 } : undefined}
      className={cn(
        'inline-flex items-center justify-center font-extrabold cursor-pointer',
        'transition-all duration-300 font-[inherit]',
        isExp
          ? 'blank-exp min-w-[24px] h-[20px] px-[4px] py-0 text-[11px] leading-[18px] border-[1.5px] border-dashed rounded-[5px] align-super gap-[1px]'
          : 'min-w-[80px] px-3.5 py-1.5 text-[17px] border-[2.5px] border-dashed rounded-[10px] align-middle gap-1',
        solved
          ? 'border-solid border-slide-green text-slide-green bg-slide-green/5 cursor-default'
          : 'bg-white border-slide-accent text-slide-accent',
      )}
    >
      {!solved && <span className={isExp ? 'text-[11px] leading-none' : 'text-xl'}>❓</span>}
    </motion.button>
  )
}
