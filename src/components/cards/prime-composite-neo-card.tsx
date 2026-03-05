import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import { ChoicePanel } from '@/components/quiz/choice-panel'
import { QuizFeedback } from '@/components/quiz/quiz-feedback'

interface PrimeCompositeNeoCardProps {
  visible?: boolean
  className?: string
  stepId?: number
}

interface ColumnStep {
  title: string
  body: string
}

const primeSteps: ColumnStep[] = [
  { title: '핵심 뜻', body: '분해되지 않는 수' },
  { title: '곱으로 쓰면', body: '(소수)=1×(자기자신)' },
  { title: '약수 개수', body: '약수는 1과 자기 자신, 딱 2개' },
]

const compositeSteps: ColumnStep[] = [
  { title: '핵심 뜻', body: '합성된 수라서 본래의 수(소수)로 분해돼요.' },
  { title: '곱으로 쓰면', body: '(합성수)=1×(자기자신)\n=(약수)×(약수)' },
  { title: '약수 개수', body: '약수가 3개 이상' },
]

export function PrimeCompositeNeoCard({
  visible = false,
  className,
  stepId = 10,
}: PrimeCompositeNeoCardProps) {
  const { markSolved, advanceStep, currentStep, totalSteps, isSolved } = useSlideProgress()
  const solved = isSolved(stepId)

  const [activeBlank, setActiveBlank] = useState<'prime' | 'composite' | null>(null)
  const [titleAnswer, setTitleAnswer] = useState<{
    prime: string | null
    composite: string | null
  }>({
    prime: null,
    composite: null,
  })
  const [feedback, setFeedback] = useState<string | null>(null)
  const [feedbackType, setFeedbackType] = useState<'success' | 'fail' | null>(null)

  const choices = [
    { label: '소수', value: '소수' },
    { label: '합성수', value: '합성수' },
  ]

  useEffect(() => {
    if (!solved) return
    setTitleAnswer({ prime: '소수', composite: '합성수' })
    setActiveBlank(null)
    setFeedback(null)
    setFeedbackType(null)
  }, [solved])

  const pairedSteps = primeSteps.map((prime, index) => ({
    prime,
    composite: compositeSteps[index],
  }))

  const getExpected = (target: 'prime' | 'composite') => (target === 'prime' ? '소수' : '합성수')

  const handleSelectChoice = (value: string): boolean => {
    if (!activeBlank || solved) return false

    const nextAnswer = {
      ...titleAnswer,
      [activeBlank]: value,
    }
    const isCurrentCorrect = value === getExpected(activeBlank)
    const isAllCorrect =
      nextAnswer.prime === getExpected('prime') &&
      nextAnswer.composite === getExpected('composite')

    setTitleAnswer(nextAnswer)

    if (isAllCorrect) {
      setFeedback('정답! 두 칸을 모두 채웠어요.')
      setFeedbackType('success')
      setActiveBlank(null)
      if (!solved) {
        markSolved(stepId)
        setTimeout(() => {
          if (currentStep === stepId && currentStep < totalSteps - 1) {
            advanceStep()
          }
        }, 1200)
      }
      return true
    }

    if (isCurrentCorrect) {
      setFeedback('좋아요! 나머지 빈칸도 채워보세요.')
      setFeedbackType('success')
      setActiveBlank(null)
      return true
    }

    setFeedback('다시 골라보세요.')
    setFeedbackType('fail')
    return false
  }

  const getBlankStateClass = (target: 'prime' | 'composite') => {
    const answer = titleAnswer[target]
    const expected = getExpected(target)
    const base = 'min-w-[90px] px-4 py-1.5 text-2xl leading-none font-black border-[3px] rounded-[10px] transition-all'
    const tone =
      target === 'prime'
        ? {
            solved: 'border-solid border-[#1f8d74] text-[#1f8d74] bg-[#e8fbf4] cursor-default',
            empty: 'border-dashed border-[#1f8d74] text-[#1f8d74] bg-white hover:bg-[#f2fffb] cursor-pointer',
            wrong: 'border-solid border-red-500 text-red-600 bg-red-50 cursor-pointer',
          }
        : {
            solved: 'border-solid border-[#e25f8c] text-[#e25f8c] bg-[#ffecf3] cursor-default',
            empty: 'border-dashed border-[#e25f8c] text-[#e25f8c] bg-white hover:bg-[#fff4f8] cursor-pointer',
            wrong: 'border-solid border-red-500 text-red-600 bg-red-50 cursor-pointer',
          }

    if (answer === expected || solved) return `${base} ${tone.solved}`
    if (answer === null) return `${base} ${tone.empty}`
    return `${base} ${tone.wrong}`
  }

  return (
    <motion.section
      className={cn(
        'mx-4 rounded-sm border-4 border-[#222] bg-white shadow-[6px_6px_0px_#222] overflow-hidden',
        className,
      )}
      initial={{ opacity: 0, y: 32 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="bg-[#f8fafc]">
        <div className="grid grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="p-3 pb-2">
            <h3 className="text-center">
              <button
                type="button"
                onClick={() => !solved && setActiveBlank('prime')}
                disabled={solved}
                className={getBlankStateClass('prime')}
                aria-label="소수 제목 빈칸"
              >
                {titleAnswer.prime ?? '?'}
              </button>
            </h3>
          </div>
          <div className="border-l-4 border-[#222] p-3 pb-2">
            <h3 className="text-center">
              <button
                type="button"
                onClick={() => !solved && setActiveBlank('composite')}
                disabled={solved}
                className={getBlankStateClass('composite')}
                aria-label="합성수 제목 빈칸"
              >
                {titleAnswer.composite ?? '?'}
              </button>
            </h3>
          </div>
        </div>

        <div className="px-3 pb-1">
          {!solved && (
            <div className="text-center text-[13px] font-bold text-slide-muted">
              빈칸을 클릭해 제목을 고르세요.
            </div>
          )}
          <ChoicePanel
            key={activeBlank ?? 'closed'}
            choices={choices}
            isOpen={activeBlank !== null && !solved}
            onSelect={handleSelectChoice}
            disabled={solved}
          />
          {!solved && <QuizFeedback message={feedback} type={feedbackType} />}
        </div>

        <div className="px-3 pb-3">
          {pairedSteps.map(({ prime, composite }, itemIdx) => (
            <div
              key={prime.title}
              className={cn(
                'grid grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] py-2',
                itemIdx !== pairedSteps.length - 1 && 'border-b border-[#dbe4ea]',
              )}
            >
              <div className="pr-3">
                <p className="text-[13px] font-black text-[#1f8d74]">{prime.title}</p>
                <p
                  className={cn(
                    'text-[13px] leading-snug text-[#24463f] mt-1',
                    itemIdx === 1 && 'whitespace-nowrap',
                  )}
                >
                  {prime.body}
                </p>
              </div>
              <div className="border-l-4 border-[#222] pl-3">
                <p className="text-[13px] font-black text-[#e25f8c]">{composite.title}</p>
                <p
                  className={cn(
                    'text-[13px] leading-snug text-[#5b2f3f] mt-1',
                    itemIdx === 1 && 'whitespace-pre-line',
                  )}
                >
                  {composite.body}
                </p>
              </div>
            </div>
          ))}

          <div className="grid grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] pt-2">
            <div className="pr-3">
              <p className="text-[13px] font-black text-[#1f8d74]">예시</p>
              <p className="text-[13px] leading-snug text-[#24463f] mt-1">
                2, 3, 5, 7, 11, 13, 17, 19 ...
              </p>
            </div>
            <div className="border-l-4 border-[#222] pl-3">
              <p className="text-[13px] font-black text-[#e25f8c]">예시</p>
              <p className="text-[13px] leading-snug text-[#5b2f3f] mt-1">
                4, 6, 8, 9, 10, 12 ...
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
