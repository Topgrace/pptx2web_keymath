import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { StepCard } from '@/components/cards/step-card'
import { BlankButton } from '@/components/quiz/blank-button'
import { ChoicePanel } from '@/components/quiz/choice-panel'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import { cn } from '@/lib/utils'

const X_POS = [10, 20, 30, 40, 50, 60, 70, 80, 90] as const
const BASE_DIAGRAM_WIDTH = 750
const BASE_DIAGRAM_HEIGHT = 390
const NEG_CHOICES = [
  { label: '음의 정수', value: '음의 정수' },
  { label: '양의 정수', value: '양의 정수' },
  { label: '자연수', value: '자연수' },
  { label: '유리수', value: '유리수' },
] as const

const nodesData = [
  { id: 'ndot', label: '···', group: 'neg', x: X_POS[0], isDot: true },
  { id: 'n3', label: '-3', group: 'neg', x: X_POS[1], isDot: false },
  { id: 'n2', label: '-2', group: 'neg', x: X_POS[2], isDot: false },
  { id: 'n1', label: '-1', group: 'neg', x: X_POS[3], isDot: false },
  { id: 'z0', label: '0', group: 'zero', x: X_POS[4], isDot: false },
  { id: 'p1', label: '+1', group: 'pos', x: X_POS[5], isDot: false },
  { id: 'p2', label: '+2', group: 'pos', x: X_POS[6], isDot: false },
  { id: 'p3', label: '+3', group: 'pos', x: X_POS[7], isDot: false },
  { id: 'pdot', label: '···', group: 'pos', x: X_POS[8], isDot: true },
] as const

const groupsData = {
  neg: {
    id: 'neg',
    label: '음의 정수',
    cx: 30,
    bgBox: '#B7D4EE',
    stroke: '#A9CDEB',
    strokeActive: '#4A90E2',
  },
  zero: {
    id: 'zero',
    label: '0',
    cx: 50,
    bgBox: '#E5E5E5',
    stroke: '#CCCCCC',
    strokeActive: '#888888',
  },
  pos: {
    id: 'pos',
    label: '양의 정수',
    cx: 70,
    bgBox: '#F6C1C5',
    stroke: '#F1A7AD',
    strokeActive: '#E25C67',
  },
} as const

type NodeData = (typeof nodesData)[number]
type GroupId = keyof typeof groupsData

function getNodeClasses(node: NodeData) {
  let base =
    'absolute top-[114px] -translate-x-1/2 -translate-y-1/2 z-20 flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 '

  if (node.isDot) {
    base += 'scale-110 font-bold text-black'
    return base
  }

  if (node.group === 'zero') {
    base += 'scale-125 font-bold text-black drop-shadow-md'
    return base
  }

  if (node.group === 'neg') {
    base += 'scale-110 bg-[#C4DEF2] font-bold text-gray-900 shadow-[0_0_15px_4px_rgba(183,212,238,1)] '
  } else if (node.group === 'pos') {
    base += 'scale-110 bg-[#F8D2D6] font-bold text-gray-900 shadow-[0_0_15px_4px_rgba(246,193,197,1)] '
  }

  return base
}

function getGroupClasses(groupId: GroupId) {
  let base =
    'absolute top-[262px] -translate-x-1/2 -translate-y-1/2 rounded-xl px-9 py-3.5 text-[26px] font-bold tracking-wide text-gray-800 shadow-lg transition-all duration-300 z-20 scale-110 ring-4 ring-opacity-30 '

  if (groupId === 'neg') base += ' ring-blue-400 '
  if (groupId === 'zero') base += ' ring-gray-400 '
  if (groupId === 'pos') base += ' ring-rose-400 '

  return base
}

export function IntegerOverviewStage({
  stepId = 1,
  visible = false,
  className,
}: {
  stepId?: number
  visible?: boolean
  className?: string
}) {
  const { markSolved, advanceStep, currentStep, totalSteps } = useSlideProgress()
  const [diagramScale, setDiagramScale] = useState(1)
  const [isNegBlankOpen, setIsNegBlankOpen] = useState(false)
  const [isNegSolved, setIsNegSolved] = useState(false)
  const [isTreeNegBlankOpen, setIsTreeNegBlankOpen] = useState(false)
  const [isTreeNegSolved, setIsTreeNegSolved] = useState(false)
  const diagramViewportRef = useRef<HTMLDivElement | null>(null)

  const handleNegChoiceSelect = (value: string) => {
    if (value !== '음의 정수') return false
    setIsNegSolved(true)
    setIsNegBlankOpen(false)
    return true
  }

  const handleTreeNegChoiceSelect = (value: string) => {
    if (value !== '음의 정수') return false
    setIsTreeNegSolved(true)
    setIsTreeNegBlankOpen(false)
    markSolved(stepId)
    window.setTimeout(() => {
      if (currentStep === stepId && currentStep < totalSteps - 1) {
        advanceStep()
      }
    }, 800)
    return true
  }

  useEffect(() => {
    const element = diagramViewportRef.current
    if (!element) return undefined

    const updateScale = () => {
      const width = element.clientWidth
      if (!width) return
      setDiagramScale(Math.min(1, width / BASE_DIAGRAM_WIDTH))
    }

    updateScale()

    const observer = new ResizeObserver(() => {
      updateScale()
    })

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <StepCard
      variant="white"
      visible={visible}
      className={cn('overflow-visible px-4 py-6 sm:px-6 sm:py-7', className)}
    >
      <div className="mx-auto max-w-[820px]">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.35, delay: 0.1, ease: 'easeOut' }}
          className="mb-5 flex justify-center"
        >
          <span className="rounded-[10px] bg-[#2E7D57] px-5 py-2 text-[22px] font-black leading-none tracking-[-0.02em] text-white shadow-[0_8px_18px_rgba(46,125,87,0.22)]">
            정수
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4, delay: 0.18, ease: 'easeOut' }}
          className="rounded-[22px] bg-[linear-gradient(180deg,#FCFDFC_0%,#F6FAF7_100%)] px-3 py-5 shadow-[inset_0_0_0_1px_rgba(46,125,87,0.08)] sm:px-5"
        >
          <div ref={diagramViewportRef} className="w-full overflow-hidden pb-3">
            <div
              className="mx-auto"
              style={{
                width: BASE_DIAGRAM_WIDTH * diagramScale,
                height: BASE_DIAGRAM_HEIGHT * diagramScale,
              }}
            >
              <div
                className="relative bg-transparent"
                style={{
                  width: BASE_DIAGRAM_WIDTH,
                  height: BASE_DIAGRAM_HEIGHT,
                  transform: `scale(${diagramScale})`,
                  transformOrigin: 'top left',
                }}
              >
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                style={{ zIndex: 0 }}
                role="img"
                aria-label="정수의 종류를 설명하는 수직선"
              >
                <defs>
                  <marker id="arrow-left" markerWidth="10" markerHeight="10" refX="0" refY="5" orient="auto">
                    <path d="M 10 1 L 0 5 L 10 9 z" fill="#222" />
                  </marker>
                  <marker id="arrow-right" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#222" />
                  </marker>
                </defs>

                <line
                  x1="3%"
                  y1="60"
                  x2="97%"
                  y2="60"
                  stroke="#222"
                  strokeWidth="2.5"
                  markerStart="url(#arrow-left)"
                  markerEnd="url(#arrow-right)"
                />

                {nodesData.map((node) => (
                  <line
                    key={`tick-${node.id}`}
                    x1={`${node.x}%`}
                    y1="52"
                    x2={`${node.x}%`}
                    y2="68"
                    stroke="#222"
                    strokeWidth="2.5"
                  />
                ))}

                {nodesData.map((node) => {
                  const group = groupsData[node.group]

                  return (
                    <line
                      key={`conn-${node.id}`}
                      x1={`${node.x}%`}
                      y1="142"
                      x2={`${group.cx}%`}
                      y2="236"
                      stroke={group.strokeActive}
                      strokeWidth={3.5}
                      opacity={1}
                      className="transition-all duration-300 ease-out"
                    />
                  )
                })}
              </svg>

              {nodesData.map((node) => (
                <div
                  key={`node-${node.id}`}
                  className={getNodeClasses(node)}
                  style={{ left: `${node.x}%` }}
                >
                  <span className="relative z-10 whitespace-nowrap text-[26px] font-medium">
                    {node.label}
                  </span>
                </div>
              ))}

              {Object.values(groupsData).map((group) => {
                if (group.id === 'neg') {
                  return (
                    <div
                      key={`group-${group.id}`}
                      className={cn(
                        'absolute top-[262px] z-20 -translate-x-1/2 -translate-y-1/2',
                        isNegBlankOpen && 'z-30',
                      )}
                      style={{ left: `${group.cx}%` }}
                    >
                      <div
                        className={cn(
                          'rounded-xl shadow-lg ring-4 ring-blue-400/30 transition-all duration-300 scale-110',
                          '[&>button]:min-w-[172px] [&>button]:rounded-xl [&>button]:border-[2.5px] [&>button]:px-8 [&>button]:py-3.5 [&>button]:text-[26px]',
                          '[&>button>span]:text-[26px]',
                        )}
                        style={{ backgroundColor: group.bgBox }}
                      >
                        <BlankButton
                          onClick={() => {
                            if (isNegSolved) return
                            setIsNegBlankOpen((prev) => !prev)
                          }}
                          solved={isNegSolved}
                          solvedAnswer="음의 정수"
                          active={isNegBlankOpen}
                          blankType="normal"
                        />
                      </div>
                    </div>
                  )
                }

                return (
                  <div
                    key={`group-${group.id}`}
                    className={getGroupClasses(group.id)}
                    style={{ left: `${group.cx}%`, backgroundColor: group.bgBox }}
                  >
                    {group.label}
                  </div>
                )
              })}

              <div className="absolute left-[70%] top-[320px] -translate-x-1/2 text-center text-[20px] font-semibold leading-[1.4] text-gray-500">
                수 앞에 붙은 부호 '+'는
                <br />
                생략하여 나타내기도 한다.
              </div>
              </div>
            </div>
          </div>
        </motion.div>

        <ChoicePanel
          choices={[...NEG_CHOICES]}
          isOpen={!isNegSolved && isNegBlankOpen}
          onSelect={handleNegChoiceSelect}
          disabled={false}
        />

        <AnimatePresence>
          {isNegSolved && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="mt-6 flex items-center justify-center"
            >
              <div className="flex items-center text-[#2F3338]">
                <div className="text-[28px] font-black leading-none sm:text-[32px]">정수</div>
                <div className="relative ml-6 pl-8 text-[20px] font-black leading-none sm:text-[24px]">
                  <svg
                    className="absolute left-0 top-[6px] h-[92px] w-[18px]"
                    viewBox="0 0 18 92"
                    aria-hidden="true"
                  >
                    <path
                      d="M17 1 H1 V91 H17 M1 47 H15"
                      fill="none"
                      stroke="#596270"
                      strokeWidth="1.8"
                      strokeLinecap="square"
                    />
                  </svg>

                  <div className="flex flex-col items-start gap-4">
                    <div className="relative min-h-[24px] flex items-center">
                      양의 정수(=자연수)
                    </div>
                    <div className="relative min-h-[24px] flex items-center">
                      0
                    </div>
                    <div
                      className={cn(
                        'relative min-h-[40px] flex items-center transition-all duration-200',
                        isTreeNegBlankOpen && 'relative z-10',
                      )}
                    >
                      <div
                        className={cn(
                          'inline-block align-middle',
                          '[&>button]:min-w-[132px] [&>button]:rounded-[10px] [&>button]:border-[2px] [&>button]:px-4 [&>button]:py-1.5 [&>button]:text-[20px] sm:[&>button]:min-w-[148px] sm:[&>button]:text-[22px]',
                          '[&>button>span]:text-[20px] sm:[&>button>span]:text-[22px]',
                        )}
                      >
                        <BlankButton
                          onClick={() => {
                            if (isTreeNegSolved) return
                            setIsTreeNegBlankOpen((prev) => !prev)
                          }}
                          solved={isTreeNegSolved}
                          solvedAnswer="음의 정수"
                          active={isTreeNegBlankOpen}
                          blankType="normal"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <ChoicePanel
          choices={[...NEG_CHOICES]}
          isOpen={isNegSolved && !isTreeNegSolved && isTreeNegBlankOpen}
          onSelect={handleTreeNegChoiceSelect}
          disabled={false}
        />
      </div>

    </StepCard>
  )
}
