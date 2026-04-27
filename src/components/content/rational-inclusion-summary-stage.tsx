import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { StepCard } from '@/components/cards/step-card'
import { BlankButton } from '@/components/quiz/blank-button'
import { ChoicePanel } from '@/components/quiz/choice-panel'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import { cn } from '@/lib/utils'

const QUIZ_CHOICES = {
  positive: [
    { label: '+3', value: '+3' },
    { label: '0', value: '0' },
    { label: '-2', value: '-2' },
    { label: '-0.4', value: '-0.4' },
  ],
  negative: [
    { label: '-2', value: '-2' },
    { label: '0', value: '0' },
    { label: '+2', value: '+2' },
    { label: '+2.5', value: '+2.5' },
  ],
  fraction: [
    { label: '-1/2', value: '-1/2', latex: '-\\frac{1}{2}' },
    { label: '-1', value: '-1' },
    { label: '0', value: '0' },
    { label: '+2', value: '+2' },
  ],
} as const

function Fraction({
  num,
  den,
  sign = '',
  className,
}: {
  num: string
  den: string
  sign?: string
  className?: string
}) {
  return (
    <span className={cn('mx-[2px] inline-flex translate-y-[-2px] items-center align-middle', className)}>
      {sign && <span className="mr-[1px]">{sign}</span>}
      <span className="inline-flex flex-col items-center text-[0.85em]">
        <span className="border-b border-slate-700 px-0.5 leading-[1.2]">{num}</span>
        <span className="px-0.5 leading-[1.2]">{den}</span>
      </span>
    </span>
  )
}

function Highlight({ children }: { children: string }) {
  return (
    <span className="relative inline-block px-1">
      <span className="absolute inset-x-0 bottom-1 h-3 rounded-sm bg-[#ffe566] opacity-80" />
      <span className="relative z-10 font-bold text-lg text-slate-800">{children}</span>
    </span>
  )
}

function TreeItem({
  children,
  isLast,
}: {
  children: React.ReactNode
  isLast: boolean
}) {
  return (
    <div className="flex w-full">
      <div className="relative w-7 shrink-0 sm:w-8">
        <div className={cn('absolute left-1/2 top-0 w-[2px] -translate-x-1/2 bg-slate-300', isLast ? 'h-[22px]' : 'h-full')} />
        <div className="absolute left-1/2 top-[22px] h-[2px] w-1/2 bg-slate-300" />
      </div>
      <div className="min-w-0 flex-1 py-2.5">{children}</div>
    </div>
  )
}

export function RationalInclusionSummaryStage({
  stepId = 3,
  visible = false,
  className,
}: {
  stepId?: number
  visible?: boolean
  className?: string
}) {
  const { markSolved, advanceStep, currentStep, totalSteps } = useSlideProgress()
  const [activeBlank, setActiveBlank] = useState<'positive' | 'negative' | 'fraction' | null>(null)
  const [positiveSolved, setPositiveSolved] = useState(false)
  const [negativeSolved, setNegativeSolved] = useState(false)
  const [fractionSolved, setFractionSolved] = useState(false)
  const [showCompletionMessage, setShowCompletionMessage] = useState(false)
  const completionTimeoutRef = useRef<number | null>(null)
  const completionStartedRef = useRef(false)
  const allSolved = positiveSolved && negativeSolved && fractionSolved

  const handleChoiceSelect = (value: string) => {
    if (activeBlank === 'positive') {
      if (value !== '+3') return false
      setPositiveSolved(true)
      setActiveBlank(null)
      return true
    }

    if (activeBlank === 'negative') {
      if (value !== '-2') return false
      setNegativeSolved(true)
      setActiveBlank(null)
      return true
    }

    if (activeBlank === 'fraction') {
      if (value !== '-1/2') return false
      setFractionSolved(true)
      setActiveBlank(null)
      return true
    }

    return false
  }

  const renderChoiceToast = (target: 'positive' | 'negative' | 'fraction') => (
    <div className="mt-2 rounded-2xl border border-[#CFE1D4] bg-white/95 p-2.5 shadow-[0_10px_24px_rgba(46,87,68,0.12)] backdrop-blur-sm sm:p-3">
      <ChoicePanel
        choices={[...QUIZ_CHOICES[target]]}
        isOpen={activeBlank === target}
        onSelect={handleChoiceSelect}
        disabled={false}
        className="mt-0 justify-start gap-2"
      />
    </div>
  )

  useEffect(() => {
    if (!allSolved || completionStartedRef.current) return

    completionStartedRef.current = true
    setActiveBlank(null)
    setShowCompletionMessage(true)
    markSolved(stepId)

    completionTimeoutRef.current = window.setTimeout(() => {
      if (currentStep === stepId && currentStep < totalSteps - 1) {
        advanceStep()
      }
    }, 2200)
  }, [advanceStep, allSolved, currentStep, markSolved, stepId, totalSteps])

  useEffect(() => {
    return () => {
      if (completionTimeoutRef.current !== null) {
        window.clearTimeout(completionTimeoutRef.current)
      }
    }
  }, [])

  return (
    <StepCard
      variant="white"
      visible={visible}
      className={cn('overflow-visible px-3 py-6 sm:px-5 sm:py-7', className)}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.38, ease: 'easeOut' }}
        className="mx-auto w-full max-w-md rounded-2xl border border-yellow-100 bg-[#fdfaf0] p-5 shadow-sm sm:max-w-2xl sm:p-7"
      >
        <div className="flex w-full flex-col text-slate-800">
          <div className="mb-4 text-center text-[15px] font-bold leading-[1.6] text-[#8A6D1A] sm:text-[16px]">
            다음 빈칸에 들어갈 수 있는 수를 채우시오.
          </div>
          <div className="mb-1 pl-2 text-xl font-bold">유리수</div>

          <div className="mt-1 w-full">
            <TreeItem isLast={false}>
              <div className="mb-2">
                <Highlight>정수</Highlight>
              </div>

              <div className="mt-1 flex w-full flex-col">
                <TreeItem isLast={false}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                    <span className="shrink-0 font-medium text-slate-700 sm:w-[130px]">
                      양의 정수<span className="ml-0.5 text-xs font-normal text-slate-500">(=자연수)</span>:
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="break-words rounded-md border border-slate-100/50 bg-white/70 px-2.5 py-1 font-mono text-sm shadow-sm">
                        <span>+1, +2, </span>
                        <span className="inline-block align-middle [&>button]:min-w-[74px] [&>button]:rounded-md [&>button]:border-[2px] [&>button]:px-2 [&>button]:py-0.5 [&>button]:text-sm [&>button>span]:text-base">
                          <BlankButton
                            onClick={() => {
                              if (positiveSolved) return
                              setActiveBlank((prev) => (prev === 'positive' ? null : 'positive'))
                            }}
                            solved={positiveSolved}
                            solvedAnswer="+3"
                            active={activeBlank === 'positive'}
                            blankType="normal"
                          />
                        </span>
                        <span>, &middot;&middot;&middot;</span>
                      </div>
                      {activeBlank === 'positive' && renderChoiceToast('positive')}
                    </div>
                  </div>
                </TreeItem>

                <TreeItem isLast={false}>
                  <div className="flex h-full items-center sm:min-h-[28px]">
                    <span className="shrink-0 font-medium text-slate-700 sm:w-[130px]">0</span>
                  </div>
                </TreeItem>

                <TreeItem isLast={true}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                    <span className="shrink-0 font-medium text-slate-700 sm:w-[130px]">음의 정수:</span>
                    <div className="min-w-0 flex-1">
                      <div className="break-words rounded-md border border-slate-100/50 bg-white/70 px-2.5 py-1 font-mono text-sm shadow-sm">
                        <span>-1, </span>
                        <span className="inline-block align-middle [&>button]:min-w-[74px] [&>button]:rounded-md [&>button]:border-[2px] [&>button]:px-2 [&>button]:py-0.5 [&>button]:text-sm [&>button>span]:text-base">
                          <BlankButton
                            onClick={() => {
                              if (negativeSolved) return
                              setActiveBlank((prev) => (prev === 'negative' ? null : 'negative'))
                            }}
                            solved={negativeSolved}
                            solvedAnswer="-2"
                            active={activeBlank === 'negative'}
                            blankType="normal"
                          />
                        </span>
                        <span>, -3, &middot;&middot;&middot;</span>
                      </div>
                      {activeBlank === 'negative' && renderChoiceToast('negative')}
                    </div>
                  </div>
                </TreeItem>
              </div>
            </TreeItem>

            <TreeItem isLast={true}>
              <div className="mb-2 mt-2">
                <Highlight>정수가 아닌 유리수</Highlight>
              </div>

                <div className="mt-2">
                  <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2 rounded-xl border border-slate-100/50 bg-white/70 px-3.5 py-3 font-mono text-sm shadow-sm sm:text-base">
                    <span className="mr-1 hidden font-sans text-slate-500 sm:inline">:</span>
                    <span className="inline-block align-middle [&>button]:min-w-[84px] [&>button]:rounded-md [&>button]:border-[2px] [&>button]:px-2 [&>button]:py-0.5 [&>button]:text-sm [&>button>span]:text-base">
                      {fractionSolved ? (
                        <span className="inline-flex min-w-[84px] items-center justify-center rounded-[10px] border-[2.5px] border-solid border-slide-green bg-slide-green/5 px-3.5 py-1.5 font-extrabold text-slide-green">
                          <Fraction num="1" den="2" sign="-" className="text-[1.05rem]" />
                        </span>
                      ) : (
                        <BlankButton
                          onClick={() => {
                            setActiveBlank((prev) => (prev === 'fraction' ? null : 'fraction'))
                          }}
                          solved={false}
                          solvedAnswer={null}
                          active={activeBlank === 'fraction'}
                          blankType="normal"
                        />
                      )}
                    </span>
                  ,
                  <Fraction num="2" den="3" />,
                  <span className="ml-1">-0.4,</span>
                  <span className="ml-1">+2.5,</span>
                  <span className="ml-1">&middot;&middot;&middot;</span>
                </div>
                {activeBlank === 'fraction' && renderChoiceToast('fraction')}
              </div>
            </TreeItem>
          </div>

          <AnimatePresence>
            {showCompletionMessage && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="mt-5 rounded-2xl border border-[#D9E7DA] bg-white/85 px-4 py-4 text-center shadow-[0_8px_24px_rgba(46,87,68,0.08)]"
              >
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: {
                      transition: {
                        staggerChildren: 0.18,
                      },
                    },
                  }}
                  className="flex flex-col gap-1 text-[16px] font-extrabold leading-[1.8] text-[#2E5A44] sm:text-[18px]"
                >
                  {[
                    '앞으로',
                    "특별한 말이 없을 때는",
                    "'수'라고 하면",
                    '유리수를 의미합니다.',
                  ].map((segment) => (
                    <motion.span
                      key={segment}
                      variants={{
                        hidden: { opacity: 0, y: 8 },
                        show: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                    >
                      {segment}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </StepCard>
  )
}
