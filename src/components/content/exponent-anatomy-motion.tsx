import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import { MathInline } from '@/components/math'

interface ExponentAnatomyMotionProps {
  className?: string
  stepId?: number
}

export function ExponentAnatomyMotion({
  className,
  stepId = 3,
}: ExponentAnatomyMotionProps) {
  const { currentStep } = useSlideProgress()
  const enabled = currentStep >= stepId

  return (
    <motion.div
      className={cn(
        'rounded-xl border-2 border-[#d9dee7] bg-[#fbfcff] px-3 py-3',
        className,
      )}
      initial={{ opacity: 0, y: 16 }}
      animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-[160px] h-[142px] mx-auto">
          <motion.div
            className="absolute left-0 top-4 w-[124px] h-[124px] rounded-full bg-[#b8dda6]"
            initial={{ opacity: 0, scale: 0.72 }}
            animate={enabled ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.72 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          />

          <motion.div
            className="absolute left-0 top-4 w-[124px] h-[124px] flex items-center justify-center text-[108px] leading-[0.9] font-black text-[#1f1f24] italic"
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={enabled ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: 0.92 }}
            transition={{ duration: 0.35, delay: 0.2 }}
          >
            <MathInline tex={"\\boldsymbol{a}"} />
          </motion.div>

          <motion.div
            className="absolute left-[100px] top-[0px] w-[58px] h-[58px] rounded-full bg-[#ffe65c] flex items-center justify-center text-[56px] leading-none font-black text-[#1f1f24] italic"
            initial={{ opacity: 0, scale: 0.55, rotate: -10 }}
            animate={
              enabled
                ? {
                    opacity: 1,
                    scale: [0.55, 1.08, 1],
                    rotate: [0, -2, 0],
                  }
                : { opacity: 0, scale: 0.55, rotate: -10 }
            }
            transition={{ duration: 0.55, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
          >
            <MathInline tex={"\\boldsymbol{n}"} />
          </motion.div>

          <motion.div
            className="absolute left-[52px] top-[-42px] z-20"
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={enabled ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.28, delay: 0.64, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative whitespace-nowrap rounded-2xl border-2 border-[#b5bcc9] bg-white px-2.5 py-1.5 shadow-[0_4px_10px_rgba(31,31,36,0.08)]">
              <span className="inline-flex rounded-md bg-[#ffe65c] px-1.5 py-0.5 text-[13px] leading-none font-extrabold text-[#1f1f24]">
                지수
              </span>
              <span className="ml-1 text-[13px] leading-none font-extrabold text-[#2d2e35]">
                : 곱한 횟수
              </span>
              <span className="absolute left-[74px] -bottom-[11px] h-0 w-0 border-l-[9px] border-r-[9px] border-t-[11px] border-l-transparent border-r-transparent border-t-[#b5bcc9]" />
              <span className="absolute left-[75px] -bottom-[8px] h-0 w-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent border-t-white" />
            </div>
          </motion.div>

          <motion.div
            className="absolute left-[-8px] top-[126px] z-20"
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={enabled ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.28, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative whitespace-nowrap rounded-2xl border-2 border-[#b5bcc9] bg-white px-2.5 py-1.5 shadow-[0_4px_10px_rgba(31,31,36,0.08)]">
              <span className="inline-flex rounded-md bg-[#b8dda6] px-1.5 py-0.5 text-[13px] leading-none font-extrabold text-[#1f1f24]">
                밑
              </span>
              <span className="ml-1 text-[13px] leading-none font-extrabold text-[#2d2e35]">
                : 여러 번 곱한 수나 문자
              </span>
              <span className="absolute left-[66px] -top-[11px] h-0 w-0 border-l-[9px] border-r-[9px] border-b-[11px] border-l-transparent border-r-transparent border-b-[#b5bcc9]" />
              <span className="absolute left-[67px] -top-[8px] h-0 w-0 border-l-[8px] border-r-[8px] border-b-[10px] border-l-transparent border-r-transparent border-b-white" />
            </div>
          </motion.div>
        </div>

        <div className="w-full max-w-[360px] mt-6">
          <motion.div
            className="text-[15px] font-extrabold text-[#2d2e35] mt-1"
            initial={{ opacity: 0, y: 6 }}
            animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.24, delay: 0.9 }}
          >
            의미:
            <span className="ml-1.5 inline-flex items-center gap-1.5 align-middle">
              <TokenA enabled={enabled} delay={1.0} />
              <span className="text-[#2d2e35]">×</span>
              <TokenA enabled={enabled} delay={1.08} />
              <span className="text-[#2d2e35]">×</span>
              <TokenA enabled={enabled} delay={1.16} />
              <span className="text-[#2d2e35]">× ⋯ ×</span>
              <TokenA enabled={enabled} delay={1.24} />
            </span>
          </motion.div>

          <motion.div
            className="relative mt-2 ml-[44px] w-[176px]"
            initial={{ opacity: 0 }}
            animate={enabled ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.24, delay: 1.35 }}
          >
            <motion.div
              className="h-[11px] border-b-2 border-[#b5bcc9]"
              initial={{ scaleX: 0, transformOrigin: 'left center' }}
              animate={enabled ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.35, delay: 1.42 }}
            />
            <motion.div
              className="absolute left-0 top-0 h-[11px] border-l-2 border-[#b5bcc9]"
              initial={{ scaleY: 0, transformOrigin: 'top center' }}
              animate={enabled ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.22, delay: 1.53 }}
            />
            <motion.div
              className="absolute right-0 top-0 h-[11px] border-r-2 border-[#b5bcc9]"
              initial={{ scaleY: 0, transformOrigin: 'top center' }}
              animate={enabled ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.22, delay: 1.53 }}
            />
            <motion.div
              className="mt-1 text-center text-[14px] font-extrabold text-[#2d2e35]"
              initial={{ opacity: 0, y: 4 }}
              animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
              transition={{ duration: 0.22, delay: 1.62 }}
            >
              <span className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-full bg-[#ffe65c] text-[18px] leading-none font-black italic text-[#1f1f24] mr-0.5">
                <MathInline tex={"\\boldsymbol{n}"} />
              </span>
              번 곱
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

function TokenA({ enabled, delay }: { enabled: boolean; delay: number }) {
  return (
    <motion.span
      className="inline-flex items-center justify-center w-[24px] h-[24px] rounded-full bg-[#cce9b8] text-[20px] leading-none font-black italic text-[#1f1f24]"
      initial={{ opacity: 0, y: 6, scale: 0.86 }}
      animate={enabled ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 6, scale: 0.86 }}
      transition={{ duration: 0.22, delay }}
    >
      <MathInline tex={"\\boldsymbol{a}"} />
    </motion.span>
  )
}
