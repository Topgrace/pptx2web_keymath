import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { Choice } from '@/schemas/step'
import { useState, useRef, useEffect } from 'react'
import katex from 'katex'

function ChoiceButton({
  choice,
  state,
  onClick,
}: {
  choice: Choice
  state: 'default' | 'correct' | 'wrong'
  onClick: () => void
}) {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (ref.current && choice.latex) {
      try {
        katex.render(choice.latex, ref.current, { throwOnError: false })
      } catch {
        ref.current.textContent = choice.label
      }
    }
  }, [choice.latex, choice.label])

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      animate={
        state === 'correct'
          ? { scale: [1, 1.15, 1] }
          : state === 'wrong'
            ? { x: [0, -6, 6, -4, 4, 0] }
            : {}
      }
      transition={{ duration: state === 'correct' ? 0.5 : 0.4, ease: 'easeOut' }}
      className={cn(
        'katex-choice',
        'py-2.5 px-4.5 border-2 rounded-xl',
        'text-base font-bold cursor-pointer transition-all duration-300 font-[inherit]',
        'min-w-[80px] text-center',
        state === 'correct' && 'border-slide-green bg-slide-green text-white',
        state === 'wrong' && 'border-red-600 bg-red-50 text-red-600',
        state === 'default' && 'border-gray-300 bg-white text-gray-500',
      )}
    >
      {!choice.latex && choice.label}
    </motion.button>
  )
}

export function ChoicePanel({
  choices,
  isOpen,
  onSelect,
  disabled,
}: {
  choices: Choice[]
  isOpen: boolean
  onSelect: (value: string) => boolean
  disabled: boolean
}) {
  const [wrongIdx, setWrongIdx] = useState<number | null>(null)
  const [correctIdx, setCorrectIdx] = useState<number | null>(null)

  const handleClick = (value: string, idx: number) => {
    if (disabled) return
    const isCorrect = onSelect(value)
    if (isCorrect) {
      setCorrectIdx(idx)
    } else {
      setWrongIdx(idx)
      setTimeout(() => setWrongIdx(null), 600)
    }
  }

  const getState = (idx: number) => {
    if (correctIdx === idx) return 'correct' as const
    if (wrongIdx === idx) return 'wrong' as const
    return 'default' as const
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="flex flex-wrap justify-center gap-2.5 mt-3.5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {choices.map((choice, idx) => (
            <ChoiceButton
              key={choice.value}
              choice={choice}
              state={getState(idx)}
              onClick={() => handleClick(choice.value, idx)}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
