import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { MathInline } from '@/components/math'
import { BlankButton, ChoicePanel, QuizFeedback } from '@/components/quiz'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import { SolutionArrow, SolutionLine, SolutionSteps } from '@/components/content/solution-steps'
import type { BlankType, Choice } from '@/schemas/step'

type GuideItemId =
  | 'factorization'
  | 'evenExponent'
  | 'exponentThree'
  | 'makeEven'
  | 'targetPrime'
  | 'smallestMultiplier'

interface GuideItem {
  id: GuideItemId
  answer: string
  answerLatex?: string
  blankType: BlankType
  choices: Choice[]
  render: (blank: ReactNode, secondBlank?: ReactNode) => ReactNode
}

const GUIDE_ITEMS: GuideItem[] = [
  {
    id: 'factorization',
    answer: '2^4 \\times 3',
    answerLatex: '2^4 \\times 3',
    blankType: 'normal',
    choices: [
      { label: '$2^4 \\times 3$', value: '2^4 \\times 3', latex: '2^4 \\times 3' },
      { label: '$2^3 \\times 3^2$', value: '2^3 \\times 3^2', latex: '2^3 \\times 3^2' },
      { label: '$2^4 \\times 3^2$', value: '2^4 \\times 3^2', latex: '2^4 \\times 3^2' },
      { label: '$2^5 \\times 3$', value: '2^5 \\times 3', latex: '2^5 \\times 3' },
    ],
    render: (blank) => (
      <>
        <MathInline tex={'48 ='} /> {blank}
      </>
    ),
  },
  {
    id: 'evenExponent',
    answer: '짝수',
    blankType: 'normal',
    choices: [
      { label: '홀수', value: '홀수' },
      { label: '짝수', value: '짝수' },
      { label: '소수', value: '소수' },
      { label: '자연수', value: '자연수' },
    ],
    render: (blank) => <>제곱인 수는 소인수분해하면 모든 지수가 {blank}이다.</>,
  },
  {
    id: 'exponentThree',
    answer: '1',
    blankType: 'normal',
    choices: [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
    ],
    render: (blank) => <>48의 소인수 2의 지수는 짝수이지만 소인수 3의 지수는 {blank}이다.</>,
  },
  {
    id: 'makeEven',
    answer: '짝수',
    blankType: 'normal',
    choices: [
      { label: '홀수', value: '홀수' },
      { label: '짝수', value: '짝수' },
      { label: '소수', value: '소수' },
      { label: '자연수', value: '자연수' },
    ],
    render: (blank) => <>따라서 3의 지수를 {blank}로 만들면 모든 지수가 짝수가 되어 제곱인 수가 된다.</>,
  },
  {
    id: 'targetPrime',
    answer: '3',
    blankType: 'normal',
    choices: [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '6', value: '6' },
    ],
    render: (blank) => (
      <>
        {blank}의 지수를 짝수로 만들기 위해
      </>
    ),
  },
  {
    id: 'smallestMultiplier',
    answer: '3',
    blankType: 'normal',
    choices: [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '6', value: '6' },
    ],
    render: (blank) => (
      <>
        곱할 수 있는 가장 작은 수는 {blank}이다.
      </>
    ),
  },
]

function RevealBlock({
  children,
  delay = 0,
}: {
  children: ReactNode
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function PerfectSquareMultiplierGuide({ stepId = 6 }: { stepId?: number }) {
  const { isSolved, markSolved, advanceStep, currentStep, totalSteps } = useSlideProgress()
  const solved = isSolved(stepId)

  const [activeItemId, setActiveItemId] = useState<GuideItemId | null>(null)
  const [solvedAnswers, setSolvedAnswers] = useState<Partial<Record<GuideItemId, string>>>({})
  const [feedback, setFeedback] = useState<string | null>(null)
  const [feedbackType, setFeedbackType] = useState<'success' | 'fail' | null>(null)

  const activeItem = useMemo(
    () => GUIDE_ITEMS.find((item) => item.id === activeItemId) ?? null,
    [activeItemId],
  )

  const solvedCount = solved ? GUIDE_ITEMS.length : Object.keys(solvedAnswers).length

  const handleToggleBlank = (itemId: GuideItemId) => {
    if (solved || solvedAnswers[itemId]) return
    setActiveItemId((prev) => (prev === itemId ? null : itemId))
  }

  const handleSelectChoice = (value: string): boolean => {
    if (!activeItem || solved) return false

    if (value === activeItem.answer) {
      const nextSolvedAnswers = {
        ...solvedAnswers,
        [activeItem.id]: activeItem.answerLatex ?? activeItem.answer,
      }

      setSolvedAnswers(nextSolvedAnswers)
      setFeedback(null)
      setFeedbackType(null)

      const nextUnsolvedItem = GUIDE_ITEMS.find((item) => !nextSolvedAnswers[item.id])
      if (nextUnsolvedItem) {
        setActiveItemId(nextUnsolvedItem.id)
      } else {
        setActiveItemId(null)
        markSolved(stepId)
        setTimeout(() => {
          if (currentStep === stepId && currentStep < totalSteps - 1) {
            advanceStep()
          }
        }, 1200)
      }

      return true
    }

    setFeedback('다시 생각해 보세요!')
    setFeedbackType('fail')
    setTimeout(() => {
      setFeedback(null)
      setFeedbackType(null)
    }, 1000)
    return false
  }

  const renderBlank = (item: GuideItem, key: string) => {
    const itemSolved = solved || Boolean(solvedAnswers[item.id])
    const solvedAnswer = solved
      ? (item.answerLatex ?? item.answer)
      : (solvedAnswers[item.id] ?? null)

    return (
      <BlankButton
        key={key}
        onClick={() => handleToggleBlank(item.id)}
        solved={itemSolved}
        solvedAnswer={solvedAnswer}
        blankType={item.blankType}
        isLatex={Boolean(item.answerLatex)}
      />
    )
  }

  return (
    <>
      <div className="text-center text-[16px] font-extrabold text-slide-gray leading-[1.8]">
        48에 자연수를 곱하여 어떤 자연수의 제곱이 되게 하려고 한다.
        <br />
        곱해야 할 자연수 중 가장 작은 수는?
      </div>

      <div className="mt-4 rounded-[14px] bg-white px-4 py-4">
        <div className="text-sm font-extrabold text-slide-brown mb-2 text-center">풀이</div>
        <SolutionSteps className="my-0">
          <RevealBlock>
            <SolutionLine label="소인수분해">
              {GUIDE_ITEMS[0].render(renderBlank(GUIDE_ITEMS[0], 'factorization'))}
            </SolutionLine>
          </RevealBlock>

          {(solvedCount >= 1 || solved) && (
            <RevealBlock delay={0.05}>
              <div className="text-sm font-extrabold text-slide-brown text-center">
                어떤 수를 곱해야 제곱인 수가 될까?
              </div>
            </RevealBlock>
          )}

          {(solvedCount >= 1 || solved) && (
            <RevealBlock delay={0.08}>
              <SolutionArrow />
            </RevealBlock>
          )}
          {(solvedCount >= 1 || solved) && (
            <RevealBlock delay={0.1}>
              <SolutionLine>
                {GUIDE_ITEMS[1].render(renderBlank(GUIDE_ITEMS[1], 'evenExponent'))}
              </SolutionLine>
            </RevealBlock>
          )}

          {(solvedCount >= 2 || solved) && (
            <RevealBlock delay={0.08}>
              <SolutionArrow />
            </RevealBlock>
          )}
          {(solvedCount >= 2 || solved) && (
            <RevealBlock delay={0.1}>
              <SolutionLine>
                {GUIDE_ITEMS[2].render(renderBlank(GUIDE_ITEMS[2], 'exponentThree'))}
              </SolutionLine>
            </RevealBlock>
          )}

          {(solvedCount >= 3 || solved) && (
            <RevealBlock delay={0.08}>
              <SolutionArrow />
            </RevealBlock>
          )}
          {(solvedCount >= 3 || solved) && (
            <RevealBlock delay={0.1}>
              <SolutionLine>
                {GUIDE_ITEMS[3].render(renderBlank(GUIDE_ITEMS[3], 'makeEven'))}
              </SolutionLine>
            </RevealBlock>
          )}

          {(solvedCount >= 4 || solved) && (
            <RevealBlock delay={0.08}>
              <SolutionArrow />
            </RevealBlock>
          )}
          {(solvedCount >= 4 || solved) && (
            <RevealBlock delay={0.1}>
              <SolutionLine>
                {GUIDE_ITEMS[4].render(renderBlank(GUIDE_ITEMS[4], 'targetPrime'))}
              </SolutionLine>
            </RevealBlock>
          )}

          {(solvedCount >= 5 || solved) && (
            <RevealBlock delay={0.08}>
              <SolutionArrow />
            </RevealBlock>
          )}
          {(solvedCount >= 5 || solved) && (
            <RevealBlock delay={0.1}>
              <SolutionLine>
                {GUIDE_ITEMS[5].render(renderBlank(GUIDE_ITEMS[5], 'smallestMultiplier'))}
              </SolutionLine>
            </RevealBlock>
          )}
        </SolutionSteps>
      </div>

      {(solvedCount >= GUIDE_ITEMS.length || solved) && (
        <RevealBlock delay={0.1}>
          <div className="mt-3">
            <div className="flex items-center justify-center gap-2">
              <span className="rounded-[8px] bg-slide-brown px-2.5 py-1 text-sm font-extrabold text-white shadow-[0_2px_8px_rgba(122,76,20,0.22)]">
                답
              </span>
              <span className="text-[22px] font-extrabold text-slide-brown leading-none">
                3
              </span>
            </div>

            <div className="mt-4 rounded-[14px] bg-slide-warning-bg px-4 py-3 text-center">
              <div className="katex-inline text-[16px] font-extrabold text-slide-gray leading-[1.9]">
                <MathInline tex={'48 = 2^4 \\times 3'} />
              </div>
              <div className="mt-1 mx-auto grid w-fit grid-cols-[auto_auto] items-baseline gap-x-1 gap-y-0 text-[16px] font-extrabold leading-[1.9]">
                <div className="justify-self-end">
                  <MathInline tex={'48'} className="text-slide-gray" />
                  <MathInline tex={'\\times\\,3'} className="text-slide-red" />
                </div>
                <div className="justify-self-start">
                  <MathInline tex={'= 2^4 \\times 3'} className="text-slide-gray" />
                  <MathInline tex={'\\times\\,3'} className="text-slide-red" />
                </div>
                <div />
                <div className="justify-self-start">
                  <MathInline tex={'= 2^4 \\times 3^2'} className="text-slide-gray" />
                </div>
              </div>
              <div className="mt-2 text-sm font-bold text-slide-brown leading-[1.7]">
                즉 48에 <span className="text-slide-red">3</span>을 곱한 <span className="text-slide-brown">144</span>는 제곱인 수(
                <MathInline tex={'12^2'} className="text-slide-brown" />
                )가 된다.
              </div>
            </div>
          </div>
        </RevealBlock>
      )}

      <ChoicePanel
        choices={activeItem?.choices ?? []}
        isOpen={Boolean(activeItem)}
        onSelect={handleSelectChoice}
        disabled={solved}
      />

      <QuizFeedback message={feedback} type={feedbackType} />
    </>
  )
}
