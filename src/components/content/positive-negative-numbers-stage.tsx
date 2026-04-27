import type { ReactNode } from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { StepCard } from '@/components/cards/step-card'
import { BlankButton } from '@/components/quiz/blank-button'
import { ChoicePanel } from '@/components/quiz/choice-panel'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import { cn } from '@/lib/utils'

const SIZE_CHOICES = [
  { label: '작은 수', value: '작은 수' },
  { label: '큰 수', value: '큰 수' },
  { label: '같은 수', value: '같은 수' },
] as const

function Fraction({
  numerator,
  denominator,
}: {
  numerator: string
  denominator: string
}) {
  return (
    <span className="mx-0.5 inline-flex translate-y-[-1px] flex-col items-center align-middle text-[0.85em] leading-[1.1]">
      <span className="w-full border-b border-current px-1 text-center">{numerator}</span>
      <span className="px-1">{denominator}</span>
    </span>
  )
}

function NumberLine() {
  return (
    <div className="relative px-1 pb-3 pt-5">
      <div className="relative z-20 flex w-full items-center">
        <svg width="10" height="12" viewBox="0 0 10 12" fill="none" className="shrink-0" aria-hidden="true">
          <path d="M10 6L1 6M1 6L5 2M1 6L5 10" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="-mx-px h-[1.5px] flex-1 bg-[#333]" />
        <svg width="10" height="12" viewBox="0 0 10 12" fill="none" className="shrink-0" aria-hidden="true">
          <path d="M0 6L9 6M9 6L5 2M9 6L5 10" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="absolute left-1/2 top-1/2 h-[10px] w-[1.5px] -translate-x-1/2 -translate-y-1/2 bg-[#333]" />
      </div>

      <div className="relative z-10 flex h-[60px] w-full justify-between">
        <div
          className="relative flex h-full w-[calc(50%-12px)] items-center justify-center rounded-bl-[100%_100%] pb-2"
          style={{ background: 'linear-gradient(to left, #cbeeff 5%, rgba(203, 238, 255, 0) 100%)' }}
        >
          <span className="text-lg font-extrabold tracking-wide text-[#0088cc]">음수</span>
        </div>

        <div className="absolute left-1/2 top-[6px] -translate-x-1/2 text-[15px] font-extrabold leading-none text-gray-950">
          0
        </div>

        <div
          className="relative flex h-full w-[calc(50%-12px)] items-center justify-center rounded-br-[100%_100%] pb-2"
          style={{ background: 'linear-gradient(to right, #ffd9de 5%, rgba(255, 217, 222, 0) 100%)' }}
        >
          <span className="text-lg font-extrabold tracking-wide text-[#ff4477]">양수</span>
        </div>
      </div>
    </div>
  )
}

function ExampleRow({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex items-start text-[14px] leading-relaxed">
      <span className="w-[86px] shrink-0 font-semibold text-gray-700">{label}</span>
      <span className="mr-1 text-gray-500">:</span>
      <span className="min-w-0 flex-1 break-words text-gray-800">{children}</span>
    </div>
  )
}

function SignSection({
  kind,
  color,
  border,
  background,
  title,
  description,
  rows,
}: {
  kind: 'negative' | 'positive'
  color: string
  border: string
  background: string
  title: string
  description: ReactNode
  rows: ReactNode[]
}) {
  return (
    <section className={cn('rounded-2xl border p-5 shadow-sm', border, background)}>
      <div className="mb-5 text-center">
        <h3 className="mb-2 text-2xl font-extrabold" style={{ color }}>
          {title}
        </h3>
        <p className="text-[15px] font-medium leading-relaxed text-gray-700">{description}</p>
      </div>

      <div className="flex gap-3 rounded-xl bg-[#f0f0f0] p-4">
        <div className="mt-0.5 shrink-0">
          <span className="rounded bg-[#999999] px-1.5 py-0.5 text-[11px] font-extrabold text-white">예</span>
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <ExampleRow label={`${kind === 'negative' ? '음' : '양'}의 정수`}>{rows[0]}</ExampleRow>
          <ExampleRow label={`${kind === 'negative' ? '음' : '양'}의 유리수`}>{rows[1]}</ExampleRow>
        </div>
      </div>
    </section>
  )
}

export function PositiveNegativeNumbersStage({
  stepId = 5,
  visible = false,
  className,
}: {
  stepId?: number
  visible?: boolean
  className?: string
}) {
  const { markSolved, advanceStep, currentStep, totalSteps } = useSlideProgress()
  const [activeBlank, setActiveBlank] = useState<'negative' | 'positive' | null>(null)
  const [negativeSolved, setNegativeSolved] = useState(false)
  const [positiveSolved, setPositiveSolved] = useState(false)

  const completeStep = () => {
    markSolved(stepId)
    window.setTimeout(() => {
      if (currentStep === stepId && currentStep < totalSteps - 1) {
        advanceStep()
      }
    }, 800)
  }

  const handleChoiceSelect = (value: string) => {
    if (activeBlank === 'negative') {
      if (value !== '작은 수') return false
      setNegativeSolved(true)
      setActiveBlank(null)
      if (positiveSolved) completeStep()
      return true
    }

    if (activeBlank === 'positive') {
      if (value !== '큰 수') return false
      setPositiveSolved(true)
      setActiveBlank(null)
      if (negativeSolved) completeStep()
      return true
    }

    return false
  }

  return (
    <StepCard
      variant="white"
      visible={visible}
      className={cn('overflow-hidden px-4 py-6 sm:px-6 sm:py-7', className)}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.38, ease: 'easeOut' }}
        className="mx-auto w-full max-w-md rounded-[22px] bg-white pb-2 shadow-[0_10px_28px_rgba(46,87,68,0.08)] sm:max-w-xl"
      >
        <NumberLine />

        <div className="space-y-6 px-1 pb-2 sm:px-2">
          <SignSection
            kind="negative"
            color="#0088cc"
            border="border-[#cbeeff]"
            background="bg-[#f2faff]"
            title="음수"
            description={
              <>
                <span className="font-extrabold text-[#0088cc]">0보다 </span>
                <span className="inline-block align-middle [&>button]:min-w-[90px] [&>button]:rounded-[9px] [&>button]:border-[2px] [&>button]:px-2.5 [&>button]:py-0.5 [&>button]:text-[15px] [&>button>span]:text-[17px]">
                  <BlankButton
                    onClick={() => {
                      if (negativeSolved) return
                      setActiveBlank((prev) => (prev === 'negative' ? null : 'negative'))
                    }}
                    solved={negativeSolved}
                    solvedAnswer="작은 수"
                    active={activeBlank === 'negative'}
                    blankType="normal"
                  />
                </span>
                로 수 앞에
                <br />
                부호 <span className="rounded border border-gray-200 bg-white px-1.5 py-0.5 font-extrabold text-black shadow-sm">
                  '<span className="text-[#0088cc]">−</span>'
                </span> 를 붙여서 나타냄
              </>
            }
            rows={[
              <>-1, -3, -2, -5, <span className="tracking-widest">...</span></>,
              <>-<Fraction numerator="1" denominator="2" />, -2.07, -4, -1, <span className="tracking-widest">...</span></>,
            ]}
          />

          <ChoicePanel
            choices={[...SIZE_CHOICES]}
            isOpen={!negativeSolved && activeBlank === 'negative'}
            onSelect={handleChoiceSelect}
            disabled={false}
            className="-mt-3"
          />

          <SignSection
            kind="positive"
            color="#ff4477"
            border="border-[#ffd9de]"
            background="bg-[#fff2f4]"
            title="양수"
            description={
              <>
                <span className="font-extrabold text-[#ff4477]">0보다 </span>
                <span className="inline-block align-middle [&>button]:min-w-[90px] [&>button]:rounded-[9px] [&>button]:border-[2px] [&>button]:px-2.5 [&>button]:py-0.5 [&>button]:text-[15px] [&>button>span]:text-[17px]">
                  <BlankButton
                    onClick={() => {
                      if (positiveSolved) return
                      setActiveBlank((prev) => (prev === 'positive' ? null : 'positive'))
                    }}
                    solved={positiveSolved}
                    solvedAnswer="큰 수"
                    active={activeBlank === 'positive'}
                    blankType="normal"
                  />
                </span>
                로 수 앞에
                <br />
                부호 <span className="rounded border border-gray-200 bg-white px-1.5 py-0.5 font-extrabold text-black shadow-sm">
                  '<span className="text-[#ff4477]">＋</span>'
                </span> 를 붙여서 나타냄
              </>
            }
            rows={[
              <>+1, +10, +4, +5, <span className="tracking-widest">...</span></>,
              <>+<Fraction numerator="1" denominator="2" />, +3.1, +4, +10, <span className="tracking-widest">...</span></>,
            ]}
          />

          <ChoicePanel
            choices={[...SIZE_CHOICES]}
            isOpen={!positiveSolved && activeBlank === 'positive'}
            onSelect={handleChoiceSelect}
            disabled={false}
            className="-mt-3"
          />
        </div>
      </motion.div>
    </StepCard>
  )
}
