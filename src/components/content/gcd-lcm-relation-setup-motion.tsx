import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GcdLcmRelationSetupMotionProps {
  className?: string
}

export function GcdLcmRelationSetupMotion({
  className,
}: GcdLcmRelationSetupMotionProps) {
  return (
    <div
      className={cn(
        'rounded-xl border-2 border-[#F0DC45] bg-[#FFFDF2] p-4',
        className,
      )}
    >
      <div className="mb-3 flex flex-wrap justify-center gap-2 text-[12px] font-extrabold">
        <span className="rounded-full bg-[#1F4F8A] px-3 py-1 text-white">G = 최대공약수</span>
        <span className="rounded-full bg-[#1F8D74] px-3 py-1 text-white">L = 최소공배수</span>
      </div>

      <div className="rounded-2xl bg-white px-4 py-5 shadow-[0_1px_6px_rgba(0,0,0,0.08)]">
        <motion.div
          className="flex items-start justify-center gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-[56px] font-black leading-none text-[#2A2A2A]">G</div>

          <div className="flex flex-col items-center">
            <div className="flex items-end gap-7 border-b-[4px] border-[#333333] px-2 pb-2">
              <span className="text-[56px] font-black leading-none text-[#2A2A2A]">A</span>
              <span className="text-[56px] font-black leading-none text-[#2A2A2A]">B</span>
            </div>

            <div className="mt-2 flex items-center gap-8 px-2">
              <span className="text-[50px] font-black leading-none text-[#2A2A2A]">a</span>
              <span className="text-[50px] font-black leading-none text-[#2A2A2A]">b</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-4 grid gap-2"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.12 }}
        >
          <div className="rounded-xl bg-[#FFF4F1] px-4 py-2 text-center text-[13px] font-extrabold leading-[1.7] text-[#A34735]">
            G로 나누었으므로 A = G×a, B = G×b
          </div>
          <div className="rounded-xl bg-[#EEF6FF] px-4 py-2 text-center text-[13px] font-extrabold leading-[1.7] text-[#1F4F8A]">
            a와 b는 공통 약수가 1뿐인 서로소
          </div>
        </motion.div>
      </div>
    </div>
  )
}
