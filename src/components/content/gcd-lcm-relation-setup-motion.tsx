import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { MathInline } from '@/components/math'

interface GcdLcmRelationSetupMotionProps {
  className?: string
  renderBlank: (id: string) => ReactNode
  solvedAnswers: Record<string, string>
}

export function GcdLcmRelationSetupMotion({
  className,
  renderBlank,
  solvedAnswers,
}: GcdLcmRelationSetupMotionProps) {
  const isBSolved = Boolean(solvedAnswers.b)
  const isLSolved = Boolean(solvedAnswers.L)

  return (
    <div
      className={cn(
        'rounded-xl border-2 border-[#F0DC45] bg-[#FFFDF2] p-4',
        className,
      )}
    >
      <div className="mb-3 text-center text-[14px] font-bold leading-[1.6] text-slide-gray">
        두 자연수 A, B의 최대공약수를 G라고 하면<br />아래처럼 쓸 수 있다.
      </div>

      <div className="rounded-2xl bg-white px-4 py-5 shadow-[0_1px_6px_rgba(0,0,0,0.08)]">
        <motion.div
          className="mx-auto flex w-fit flex-col gap-y-1 text-center text-[31px] font-black leading-none text-[#2A2A2A]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative grid grid-cols-[48px_20px_72px_72px] items-center pb-1">
            <div className="flex justify-center text-[31px] font-black text-[#2A2A2A]">
              G
            </div>
            <div className="text-[28px]">)</div>
            <div>A</div>
            <div>B</div>
            <div className="pointer-events-none absolute bottom-2 left-13 right-0 border-b-2 border-[#666666]" />
          </div>

          <div className="grid grid-cols-[48px_20px_72px_72px] items-center -mt-2">
            <div />
            <div />
            <div className="text-[28px] font-black italic text-[#2A2A2A] font-serif">a</div>
            <div className="text-[28px] font-black italic text-[#2A2A2A] font-serif">b</div>
          </div>
        </motion.div>

        <motion.div
          className="mt-4 grid gap-2"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.12 }}
        >
          <div className="rounded-xl bg-[#FFF4F1] px-4 py-2 text-center text-[13px] font-extrabold leading-[1.7] text-[#A34735]">
            최소공배수 <MathInline tex={'L=G\\times a\\times b'} className="align-middle text-[#A34735]" />
          </div>
          <div className="rounded-xl bg-[#EEF6FF] px-4 py-2 text-center text-[13px] font-extrabold leading-[1.7] text-[#1F4F8A]">
            <div>
              <MathInline tex={'A=G\\times a'} className="align-middle text-[#1F4F8A]" />
            </div>
            <div className="mt-1 flex items-center justify-center gap-1">
              <MathInline tex={'B=G\\times'} className="align-middle text-[#1F4F8A]" />
              {renderBlank('b')}
            </div>

            {isBSolved && (
              <div className="mx-auto mt-3 flex w-fit flex-col gap-1 text-left text-[#1F4F8A]">
                <div className="grid grid-cols-[auto_14px_auto] items-center gap-x-0.5 whitespace-nowrap">
                  <MathInline tex={'A\\times B'} className="whitespace-nowrap text-[#1F4F8A]" />
                  <div className="flex justify-center">
                    <MathInline tex={'='} className="whitespace-nowrap text-[#1F4F8A]" />
                  </div>
                  <MathInline tex={'(G\\times a)\\times(G\\times b)'} className="whitespace-nowrap text-[#1F4F8A]" />
                </div>
                <div className="grid grid-cols-[auto_14px_auto] items-center gap-x-0.5 whitespace-nowrap">
                  <div />
                  <div className="flex justify-center">
                    <MathInline tex={'='} className="whitespace-nowrap text-[#1F4F8A]" />
                  </div>
                  <MathInline tex={'G\\times a\\times b\\times G'} className="whitespace-nowrap text-[#1F4F8A]" />
                </div>
                <div className="grid grid-cols-[auto_14px_auto] items-center gap-x-0.5 whitespace-nowrap">
                  <div />
                  <div className="flex justify-center">
                    <MathInline tex={'='} className="whitespace-nowrap text-[#1F4F8A]" />
                  </div>
                  <div className="flex items-center gap-0.5 whitespace-nowrap">
                    {renderBlank('L')}
                    <MathInline tex={'\\times G'} className="whitespace-nowrap text-[#1F4F8A]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {isLSolved && (
            <div className="rounded-xl bg-[#F5FAFF] px-4 py-3 text-center text-[13px] font-extrabold leading-[1.8] text-[#1F4F8A]">
              <div>
                정리하면 <MathInline tex={'A\\times B=L\\times G'} className="align-middle text-[#1F4F8A]" />
              </div>
              <div className="mt-2">
                두 수의 곱은 최소공배수와 {renderBlank('gcdWord')}의 {renderBlank('productWord')}
                이다.
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
