import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ChoicePanel, QuizFeedback } from '@/components/quiz'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import type { Choice } from '@/schemas/step'

type ReviewItemId = 'child4' | 'child3' | 'child2'

interface ReviewItem {
  id: ReviewItemId
  answer: string
  choices: Choice[]
}

const REVIEW_ITEMS: ReviewItem[] = [
  {
    id: 'child4',
    answer: '4',
    choices: [
      { label: '3', value: '3' },
      { label: '4', value: '4' },
      { label: '6', value: '6' },
      { label: '9', value: '9' },
    ],
  },
  {
    id: 'child3',
    answer: '3',
    choices: [
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
      { label: '6', value: '6' },
    ],
  },
  {
    id: 'child2',
    answer: '2',
    choices: [
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
      { label: '6', value: '6' },
    ],
  },
]

function TreeNodeSlot({
  value,
  solved,
  locked,
  isLeaf,
  cx,
  cy,
  onClick,
}: {
  value: string | null
  solved: boolean
  locked: boolean
  isLeaf: boolean
  cx: number
  cy: number
  onClick: () => void
}) {
  if (solved && value) {
    if (isLeaf) {
      return (
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <circle cx={cx} cy={cy} r={31} fill="#f8d3df" stroke="#ffffff" strokeWidth={4} />
          <text
            x={cx}
            y={cy + 12}
            textAnchor="middle"
            className="fill-[#2a2a2a] text-[40px] font-black"
          >
            {value}
          </text>
        </motion.g>
      )
    }
    return (
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      >
        <text x={cx} y={cy + 16} className="fill-[#2a2a2a] text-[52px] font-black">
          {value}
        </text>
      </motion.g>
    )
  }

  if (locked) {
    return (
      <text
        x={cx + (isLeaf ? 0 : 12)}
        y={cy + (isLeaf ? 8 : 12)}
        textAnchor={isLeaf ? 'middle' : 'start'}
        className="fill-[#9ea6b3] text-[28px] font-black"
      >
        ...
      </text>
    )
  }

  // Active: dashed rect with "?"
  return (
    <g onClick={onClick} className="cursor-pointer">
      {isLeaf ? (
        <circle
          cx={cx}
          cy={cy}
          r={27}
          fill="white"
          stroke="#4a8ad4"
          strokeWidth={2}
          strokeDasharray="6 3"
        />
      ) : (
        <rect
          x={cx - 2}
          y={cy - 16}
          width={48}
          height={40}
          rx={8}
          fill="white"
          stroke="#4a8ad4"
          strokeWidth={2}
          strokeDasharray="6 3"
        />
      )}
      <text
        x={cx + (isLeaf ? 0 : 22)}
        y={cy + (isLeaf ? 8 : 12)}
        textAnchor="middle"
        className="fill-[#4a8ad4] text-[28px] font-black"
      >
        ?
      </text>
    </g>
  )
}

export function FactorTreeReviewFillQuiz({
  stepId = 3,
  onComplete,
}: {
  stepId?: number
  onComplete?: () => void
}) {
  const { isSolved } = useSlideProgress()
  const globallySolved = isSolved(stepId)

  useEffect(() => {
    if (globallySolved) {
      const t = setTimeout(() => onComplete?.(), 300)
      return () => clearTimeout(t)
    }
  }, [globallySolved]) // eslint-disable-line react-hooks/exhaustive-deps

  const [solvedAnswers, setSolvedAnswers] = useState<Partial<Record<ReviewItemId, string>>>({})
  const [activeItemId, setActiveItemId] = useState<ReviewItemId | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [feedbackType, setFeedbackType] = useState<'success' | 'fail' | null>(null)

  const solvedCount = globallySolved ? REVIEW_ITEMS.length : Object.keys(solvedAnswers).length
  const unlockedIndex = globallySolved ? REVIEW_ITEMS.length : solvedCount

  const activeItem = useMemo(
    () => REVIEW_ITEMS.find((item) => item.id === activeItemId) ?? null,
    [activeItemId],
  )

  const answerFor = (id: ReviewItemId) => {
    const item = REVIEW_ITEMS.find((entry) => entry.id === id)
    if (!item) return null
    if (globallySolved) return item.answer
    return solvedAnswers[id] ?? null
  }

  const isItemSolved = (id: ReviewItemId) => globallySolved || Boolean(solvedAnswers[id])
  const isItemLocked = (index: number, id: ReviewItemId) => !isItemSolved(id) && index > unlockedIndex

  const child4Solved = isItemSolved('child4')

  const handleOpenItem = (item: ReviewItem, index: number) => {
    if (globallySolved) return
    if (isItemSolved(item.id)) return
    if (isItemLocked(index, item.id)) return
    setActiveItemId((prev) => (prev === item.id ? null : item.id))
  }

  const handleSelectChoice = (value: string): boolean => {
    if (!activeItem || globallySolved) return false

    if (value === activeItem.answer) {
      const nextSolvedAnswers = {
        ...solvedAnswers,
        [activeItem.id]: activeItem.answer,
      }
      setSolvedAnswers(nextSolvedAnswers)

      const nextSolvedCount = Object.keys(nextSolvedAnswers).length
      if (nextSolvedCount === REVIEW_ITEMS.length) {
        setActiveItemId(null)
        setTimeout(() => onComplete?.(), 400)
      } else {
        const nextItem = REVIEW_ITEMS[nextSolvedCount]
        setActiveItemId(nextItem.id)
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

  return (
    <div className="mt-4">
      <div className="mb-2 text-center text-[14px] font-bold text-[#445063]">
        36을 두 수의 곱으로 가르며 빈칸을 순서대로 채워 보자.
      </div>

      <div className="mx-auto rounded-lg bg-[#f1f1f1] px-3 py-3">
        <svg viewBox="0 0 340 340" className="h-auto w-full">
          {/* Lines: 24 → 6, 24 → blank(4) */}
          <g stroke="#2a2a2a" strokeWidth="4" strokeLinecap="round">
            <line x1="78" y1="168" x2="120" y2="98" />
            <line x1="78" y1="172" x2="120" y2="248" />
          </g>

          {/* Lines: 6 → fixed 2, 6 → blank(3) */}
          <g stroke="#2a2a2a" strokeWidth="4" strokeLinecap="round">
            <line x1="166" y1="95" x2="269" y2="45" />
            <line x1="166" y1="95" x2="269" y2="115" />
          </g>

          {/* Lines: 4 → blank(2), 4 → fixed 2 — shown after child4 solved */}
          {child4Solved ? (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.22 }}
              stroke="#2a2a2a"
              strokeWidth="4"
              strokeLinecap="round"
            >
              <line x1="166" y1="248" x2="269" y2="220" />
              <line x1="166" y1="248" x2="269" y2="290" />
            </motion.g>
          ) : null}

          {/* Root: 36 */}
          <text x="10" y="186" className="fill-[#2a2a2a] text-[52px] font-black">
            36
          </text>

          {/* Node: 9 (always shown) */}
          <text x="124" y="111" className="fill-[#2a2a2a] text-[52px] font-black">
            9
          </text>

          {/* Fixed prime: 3 at top-left leaf of 9 (always shown) */}
          <circle cx={300} cy={45} r={31} fill="#f8d3df" stroke="#ffffff" strokeWidth={4} />
          <text
            x={300}
            y={57}
            textAnchor="middle"
            className="fill-[#2a2a2a] text-[40px] font-black"
          >
            3
          </text>

          {/* Fixed prime: 2 at bottom-right leaf of 4 (shown after child4 solved) */}
          {child4Solved ? (
            <motion.g
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <circle cx={300} cy={290} r={31} fill="#f8d3df" stroke="#ffffff" strokeWidth={4} />
              <text
                x={300}
                y={302}
                textAnchor="middle"
                className="fill-[#2a2a2a] text-[40px] font-black"
              >
                2
              </text>
            </motion.g>
          ) : null}

          {/* Blank 1: child4 — right child of 24 (position of node "4") */}
          <TreeNodeSlot
            value={answerFor('child4')}
            solved={isItemSolved('child4')}
            locked={isItemLocked(0, 'child4')}
            isLeaf={false}
            cx={124}
            cy={246}
            onClick={() => handleOpenItem(REVIEW_ITEMS[0], 0)}
          />

          {/* Blank 2: child3 — right child of 6 (position of prime "3") */}
          <TreeNodeSlot
            value={answerFor('child3')}
            solved={isItemSolved('child3')}
            locked={isItemLocked(1, 'child3')}
            isLeaf={true}
            cx={300}
            cy={115}
            onClick={() => handleOpenItem(REVIEW_ITEMS[1], 1)}
          />

          {/* Blank 3: child2 — left child of 4 (position of prime "2") */}
          <TreeNodeSlot
            value={answerFor('child2')}
            solved={isItemSolved('child2')}
            locked={isItemLocked(2, 'child2')}
            isLeaf={true}
            cx={300}
            cy={220}
            onClick={() => handleOpenItem(REVIEW_ITEMS[2], 2)}
          />
        </svg>
      </div>

      <ChoicePanel
        choices={activeItem?.choices ?? []}
        isOpen={Boolean(activeItem)}
        onSelect={handleSelectChoice}
        disabled={globallySolved}
      />

      <QuizFeedback message={feedback} type={feedbackType} />
    </div>
  )
}
