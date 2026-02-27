import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import cheSvg from './assets/che.svg'

interface EratosthenesOriginMotionCardProps {
  visible?: boolean
  className?: string
}

interface NumberFlow {
  value: number
  sourceX: number
  sourceY: number
  delay: number
  finalX: number
  finalY: number
  prime: boolean
  bounce?: boolean
}

const NUMBER_FLOWS: NumberFlow[] = [
  { value: 1, sourceX: 67, sourceY: 16, delay: 0.0, finalX: 10, finalY: 74, prime: false, bounce: true },
  { value: 2, sourceX: 68, sourceY: 15, delay: 0.08, finalX: 20, finalY: 44, prime: true },
  { value: 3, sourceX: 69, sourceY: 14, delay: 0.16, finalX: 31.5, finalY: 39, prime: true },
  { value: 4, sourceX: 70, sourceY: 13, delay: 0.24, finalX: 19, finalY: 78, prime: false },
  { value: 5, sourceX: 71, sourceY: 13, delay: 0.32, finalX: 38.5, finalY: 46, prime: true },
  { value: 6, sourceX: 72, sourceY: 14, delay: 0.4, finalX: 30, finalY: 81, prime: false, bounce: true },
  { value: 7, sourceX: 73, sourceY: 14, delay: 0.48, finalX: 26.5, finalY: 52, prime: true },
  { value: 8, sourceX: 74, sourceY: 15, delay: 0.56, finalX: 41, finalY: 79, prime: false },
  { value: 9, sourceX: 75, sourceY: 16, delay: 0.64, finalX: 48, finalY: 74, prime: false },
]

const RUN_DURATION_MS = 3200
const SVG_VIEWBOX = '0 0 92.92 85.99'

export function EratosthenesOriginMotionCard({
  visible = false,
  className,
}: EratosthenesOriginMotionCardProps) {
  const [runId, setRunId] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const timerRef = useRef<number | null>(null)

  const clearRunTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const startRun = useCallback(() => {
    clearRunTimer()
    setRunId((prev) => prev + 1)
    setIsRunning(true)
    timerRef.current = window.setTimeout(() => {
      setIsRunning(false)
      timerRef.current = null
    }, RUN_DURATION_MS)
  }, [clearRunTimer])

  useEffect(() => {
    if (visible) {
      startRun()
    } else {
      clearRunTimer()
      setIsRunning(false)
    }
  }, [visible, startRun, clearRunTimer])

  useEffect(() => {
    return () => clearRunTimer()
  }, [clearRunTimer])

  return (
    <motion.section
      className={cn(
        'mx-4 overflow-hidden rounded-sm border-4 border-[#222] bg-white shadow-[6px_6px_0px_#222]',
        className,
      )}
      initial={{ opacity: 0, y: 32 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="border-b border-[#dbe4ea] bg-[#f8fafc] px-4 py-3">
        <h3 className="text-center text-[21px] leading-none font-black text-[#1F4F8A]">
          에라토스테네스의 체
        </h3>
      </div>

      <div className="grid gap-3 px-4 py-4 md:grid-cols-[1fr_1.3fr] md:items-center">
        <motion.div
          className="relative mx-auto w-full max-w-[280px] rounded-[999px] border-2 border-[#9a6d4e] bg-[#fffdf5] px-5 py-5 text-center text-[16px] leading-[1.5] font-black text-[#8b5a3c]"
          initial={{ opacity: 0, x: -12 }}
          animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
          transition={{ duration: 0.35 }}
        >
          <div className="absolute -right-3 bottom-4 h-4 w-4 rotate-45 border-b-2 border-r-2 border-[#9a6d4e] bg-[#fffdf5]" />
          <p>체로 소수를 걸러내는 것처럼 보여서</p>
          <p className="mt-1">
            '<em>에라토스테네스</em>의 체'
          </p>
          <p className="mt-1">라고 불러~</p>
          <p className="mt-1">
            고대 그리스의 <em>에라토스테네스</em>가 이 방법을 사용하였대~
          </p>
        </motion.div>

        <motion.div
          role="img"
          aria-label="에라토스테네스의 체 설명 애니메이션"
          className="mx-auto w-full max-w-[420px]"
          initial={{ opacity: 0, x: 12 }}
          animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          <div className="relative w-full" style={{ aspectRatio: '92.92 / 85.99' }}>
            <img src={cheSvg} alt="" aria-hidden="true" className="h-full w-full select-none object-contain" />

            <svg
              viewBox={SVG_VIEWBOX}
              className="pointer-events-none absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <motion.path
                d="M67 18 C58 27, 50 34, 41 44"
                fill="none"
                stroke="#8cc9f5"
                strokeWidth="1.6"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  isRunning
                    ? { pathLength: [0, 1, 1, 0], opacity: [0, 0.85, 0.85, 0] }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{ duration: 1.4, ease: 'easeInOut' }}
              />

              {NUMBER_FLOWS.map((item) => (
                <motion.g
                  key={`${item.value}-${runId}`}
                  initial={{
                    x: item.sourceX,
                    y: item.sourceY,
                    opacity: 0,
                    scale: 0.7,
                  }}
                  animate={{
                    x: item.prime ? [item.sourceX, 40, item.finalX] : [item.sourceX, 37, item.finalX],
                    y: item.prime ? [item.sourceY, 34, item.finalY] : [item.sourceY, 43, item.finalY],
                    opacity: [0, 1, 1],
                    scale: [0.7, 1.06, 1],
                  }}
                  transition={{
                    delay: 0.28 + item.delay,
                    duration: item.prime ? 1.05 : 1.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <motion.text
                    x={0}
                    y={0}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={cn(
                      'font-black',
                      item.prime ? 'fill-[#1f5ea8]' : 'fill-[#2d74b8]',
                    )}
                    style={{ fontSize: item.prime ? 10.8 : 10.2 }}
                    animate={
                      item.prime && visible
                        ? { y: [0, -1.3, 0] }
                        : item.bounce && visible
                          ? { y: [0, -0.9, 0] }
                          : { y: 0 }
                    }
                    transition={{
                      delay: 1.65 + item.delay,
                      duration: 1.45,
                      repeat: (item.prime || item.bounce) && visible ? Infinity : 0,
                      repeatDelay: 1.05,
                      ease: 'easeInOut',
                    }}
                  >
                    {item.value}
                  </motion.text>
                </motion.g>
              ))}
            </svg>
          </div>

          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={startRun}
              className={cn(
                'inline-flex items-center gap-2 rounded-md border border-[#93bde4] bg-[#eaf5ff] px-3 py-1.5',
                'text-[13px] font-black text-[#1f5ea8] shadow-sm transition-colors hover:bg-[#d9ecff]',
              )}
              aria-label="애니메이션 다시 재생"
            >
              <span className="text-[10px] leading-none">▶</span>
              다시 재생
            </button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
