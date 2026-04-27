import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { StepCard } from '@/components/cards/step-card'
import { BlankButton } from '@/components/quiz/blank-button'
import { ChoicePanel } from '@/components/quiz/choice-panel'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import { cn } from '@/lib/utils'

const BASE_DIAGRAM_WIDTH = 800
const BASE_DIAGRAM_HEIGHT = 450
const RATIONAL_NEG_CHOICES = [
  { label: '음의 유리수', value: '음의 유리수' },
  { label: '양의 유리수', value: '양의 유리수' },
  { label: '정수', value: '정수' },
  { label: '자연수', value: '자연수' },
] as const
const INCLUSION_CHOICES = [
  { label: '정수', value: '정수' },
  { label: '유리수', value: '유리수' },
  { label: '음의 유리수', value: '음의 유리수' },
] as const

function Fraction({
  numerator,
  denominator,
  className,
}: {
  numerator: string
  denominator: string
  className?: string
}) {
  return (
    <span className={cn('flex flex-col items-center', className)}>
      <span className="border-b-[2.5px] border-[#222] px-[2px] text-[24px] leading-[1.05]">{numerator}</span>
      <span className="mt-[2px] text-[24px] leading-[1.05]">{denominator}</span>
    </span>
  )
}

export function RationalOverviewStage({
  stepId = 2,
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
  const [activeInclusionBlank, setActiveInclusionBlank] = useState<'subject' | 'container' | null>(null)
  const [subjectSolved, setSubjectSolved] = useState(false)
  const [containerSolved, setContainerSolved] = useState(false)
  const [isTreeNegBlankOpen, setIsTreeNegBlankOpen] = useState(false)
  const [isTreeNegSolved, setIsTreeNegSolved] = useState(false)
  const diagramViewportRef = useRef<HTMLDivElement | null>(null)
  const isInclusionSolved = subjectSolved && containerSolved

  const handleNegChoiceSelect = (value: string) => {
    if (value !== '음의 유리수') return false
    setIsNegSolved(true)
    setIsNegBlankOpen(false)
    return true
  }

  const handleTreeNegChoiceSelect = (value: string) => {
    if (value !== '음의 유리수') return false
    setIsTreeNegSolved(true)
    setIsTreeNegBlankOpen(false)
    return true
  }

  const handleInclusionChoiceSelect = (value: string) => {
    if (activeInclusionBlank === 'subject') {
      if (value !== '정수') return false
      setSubjectSolved(true)
      setActiveInclusionBlank(null)
      if (containerSolved) {
        markSolved(stepId)
        window.setTimeout(() => {
          if (currentStep === stepId && currentStep < totalSteps - 1) {
            advanceStep()
          }
        }, 800)
      }
      return true
    }

    if (activeInclusionBlank === 'container') {
      if (value !== '유리수') return false
      setContainerSolved(true)
      setActiveInclusionBlank(null)
      if (subjectSolved) {
        markSolved(stepId)
        window.setTimeout(() => {
          if (currentStep === stepId && currentStep < totalSteps - 1) {
            advanceStep()
          }
        }, 800)
      }
      return true
    }

    return false
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
      className={cn('overflow-visible px-2 py-6 sm:px-4 sm:py-7', className)}
    >
      <div className="mx-auto max-w-[860px]">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.35, delay: 0.1, ease: 'easeOut' }}
          className="mb-5 flex justify-center"
        >
          <span className="rounded-[10px] bg-[#2E7D57] px-5 py-2 text-[22px] font-black leading-none tracking-[-0.02em] text-white shadow-[0_8px_18px_rgba(46,125,87,0.22)]">
            유리수
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4, delay: 0.18, ease: 'easeOut' }}
          className="rounded-[22px] bg-[linear-gradient(180deg,#FCFDFC_0%,#F6FAF7_100%)] px-1 py-5 shadow-[inset_0_0_0_1px_rgba(46,125,87,0.08)] sm:px-3"
        >
          <div ref={diagramViewportRef} className="w-full overflow-hidden">
            <div
              className="mx-auto"
              style={{
                width: BASE_DIAGRAM_WIDTH * diagramScale,
                height: BASE_DIAGRAM_HEIGHT * diagramScale,
              }}
            >
              <div
                className="relative"
                style={{
                  width: BASE_DIAGRAM_WIDTH,
                  height: BASE_DIAGRAM_HEIGHT,
                  transform: `scale(${diagramScale})`,
                  transformOrigin: 'top left',
                }}
              >
                <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 800 450" role="img" aria-label="유리수와 수직선">
                  <defs>
                    <linearGradient id="fade-blue" x1="1" y1="0" x2="0" y2="0">
                      <stop offset="0%" stopColor="#def1ff" stopOpacity="0.9" />
                      <stop offset="60%" stopColor="#def1ff" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#def1ff" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="fade-red" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#ffe6e6" stopOpacity="0.9" />
                      <stop offset="60%" stopColor="#ffe6e6" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#ffe6e6" stopOpacity="0" />
                    </linearGradient>

                    <marker id="arrow-left-rational" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#222" />
                    </marker>
                    <marker id="arrow-right-rational" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#222" />
                    </marker>
                  </defs>

                  <path d="M 400 150 C 390 280, 250 350, 30 350 L 30 150 Z" fill="url(#fade-blue)" />
                  <path d="M 400 150 C 410 280, 550 350, 770 350 L 770 150 Z" fill="url(#fade-red)" />
                  <line x1="400" y1="150" x2="400" y2="350" stroke="#ccc" strokeWidth="2.5" />
                  <line
                    x1="30"
                    y1="150"
                    x2="770"
                    y2="150"
                    stroke="#222"
                    strokeWidth="2"
                    markerStart="url(#arrow-left-rational)"
                    markerEnd="url(#arrow-right-rational)"
                  />

                  <path d="M 100 138 v 24 M 250 138 v 24 M 400 135 v 30 M 550 138 v 24 M 700 138 v 24" stroke="#222" strokeWidth="2" fill="none" />
                  <path d="M 175 142 v 16" stroke="#222" strokeWidth="1.5" />
                  <path d="M 175 158 v 50" stroke="#222" strokeWidth="1" strokeDasharray="3,3" />
                  <path d="M 325 142 v 16" stroke="#222" strokeWidth="1.5" />
                  <path d="M 325 158 v 45" stroke="#222" strokeWidth="1" strokeDasharray="3,3" />
                  <path d="M 587.5 142 v 16" stroke="#222" strokeWidth="1.5" />
                  <path d="M 587.5 158 v 45" stroke="#222" strokeWidth="1" strokeDasharray="3,3" />
                  <path d="M 625 145 v 10 M 662.5 145 v 10" stroke="#222" strokeWidth="1.2" />
                </svg>

                <div className="absolute left-[100px] top-[180px] h-[36px] w-[40px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#8fc8ef] opacity-100 blur-[5px]" />
                <div className="absolute left-[250px] top-[180px] h-[36px] w-[40px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#8fc8ef] opacity-100 blur-[5px]" />
                <div className="absolute left-[175px] top-[230px] h-[36px] w-[55px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#8fc8ef] opacity-100 blur-[5px]" />
                <div className="absolute left-[325px] top-[235px] h-[64px] w-[48px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#8fc8ef] opacity-100 blur-[6px]" />

                <div className="absolute left-[550px] top-[180px] h-[36px] w-[40px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#faa0a0] opacity-100 blur-[5px]" />
                <div className="absolute left-[700px] top-[180px] h-[36px] w-[40px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#faa0a0] opacity-100 blur-[5px]" />
                <div className="absolute left-[570px] top-[235px] h-[64px] w-[70px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#faa0a0] opacity-100 blur-[6px]" />
                <div className="absolute left-[660px] top-[235px] h-[64px] w-[50px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#faa0a0] opacity-100 blur-[6px]" />

                <div className="absolute left-[100px] top-[180px] -translate-x-1/2 -translate-y-1/2 text-[32px] font-bold text-[#222]">-2</div>
                <div className="absolute left-[250px] top-[180px] -translate-x-1/2 -translate-y-1/2 text-[32px] font-bold text-[#222]">-1</div>
                <div className="absolute left-[400px] top-[180px] -translate-x-1/2 -translate-y-1/2 text-[34px] font-bold text-[#222]">0</div>
                <div className="absolute left-[550px] top-[180px] -translate-x-1/2 -translate-y-1/2 text-[32px] font-bold text-[#222]">+1</div>
                <div className="absolute left-[700px] top-[180px] -translate-x-1/2 -translate-y-1/2 text-[32px] font-bold text-[#222]">+2</div>

                <div className="absolute left-[175px] top-[230px] -translate-x-1/2 -translate-y-1/2 text-[32px] font-bold text-[#222]">-1.5</div>

                <div className="absolute left-[325px] top-[235px] flex -translate-x-1/2 -translate-y-1/2 items-center text-[32px] font-bold text-[#222]">
                  <span className="mr-1 -translate-y-[1px]">-</span>
                  <Fraction numerator="1" denominator="2" />
                </div>

                <div className="absolute left-[615px] top-[235px] flex -translate-x-1/2 -translate-y-1/2 items-center text-[32px] font-bold text-[#222]">
                  <span className="mr-1">+1</span>
                  <Fraction numerator="1" denominator="4" className="mr-3" />
                  <span className="mr-3">=</span>
                  <span className="mr-1">+</span>
                  <Fraction numerator="5" denominator="4" />
                </div>

                <div className="absolute left-[175px] top-[350px] -translate-x-1/2">
                  <div
                    className={cn(
                      'rounded-md bg-[#b5ddf5] shadow-sm transition-all duration-300',
                      '[&>button]:min-w-[180px] [&>button]:rounded-md [&>button]:border-[2.5px] [&>button]:px-5 [&>button]:py-2 [&>button]:text-[26px]',
                      '[&>button>span]:text-[26px]',
                    )}
                  >
                    <BlankButton
                      onClick={() => {
                        if (isNegSolved) return
                        setIsNegBlankOpen((prev) => !prev)
                      }}
                      solved={isNegSolved}
                      solvedAnswer="음의 유리수"
                      active={isNegBlankOpen}
                      blankType="normal"
                    />
                  </div>
                </div>
                <div className="absolute left-[400px] top-[350px] -translate-x-1/2 rounded-md bg-[#e2e2e2] px-5 py-2 text-[26px] font-bold text-[#111] shadow-sm">
                  0
                </div>
                <div className="absolute left-[625px] top-[350px] -translate-x-1/2 rounded-md bg-[#fbc6c6] px-5 py-2 text-[26px] font-bold text-[#111] shadow-sm">
                  양의 유리수
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <ChoicePanel
          choices={[...RATIONAL_NEG_CHOICES]}
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
              transition={{ duration: 0.4, delay: 0.12, ease: 'easeOut' }}
              className="mt-6 flex items-center justify-center"
            >
              <div className="flex items-center text-[#2F3338]">
                <div className="text-[28px] font-black leading-none sm:text-[32px]">유리수</div>
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
                      양의 유리수
                    </div>
                    <div className="relative min-h-[24px] flex items-center">
                      0
                    </div>
                    <div
                      className={cn(
                        'relative min-h-[40px] flex items-center transition-all duration-200',
                        isTreeNegBlankOpen && 'z-10',
                      )}
                    >
                      <div
                        className={cn(
                          'inline-block align-middle',
                          '[&>button]:min-w-[160px] [&>button]:rounded-[10px] [&>button]:border-[2px] [&>button]:px-4 [&>button]:py-1.5 [&>button]:text-[20px] sm:[&>button]:min-w-[176px] sm:[&>button]:text-[22px]',
                          '[&>button>span]:text-[20px] sm:[&>button>span]:text-[22px]',
                        )}
                      >
                        <BlankButton
                          onClick={() => {
                            if (isTreeNegSolved) return
                            setIsTreeNegBlankOpen((prev) => !prev)
                          }}
                          solved={isTreeNegSolved}
                          solvedAnswer="음의 유리수"
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
          choices={[...RATIONAL_NEG_CHOICES]}
          isOpen={isNegSolved && !isTreeNegSolved && isTreeNegBlankOpen}
          onSelect={handleTreeNegChoiceSelect}
          disabled={false}
        />

        <AnimatePresence>
          {isNegSolved && isTreeNegSolved && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.35, delay: 0.08, ease: 'easeOut' }}
              className="mt-5"
            >
              <div className="text-center text-[18px] font-extrabold leading-[1.9] text-gray-700 sm:text-[20px]">
                <span className="inline-block align-middle [&>button]:min-w-[92px] [&>button]:rounded-[10px] [&>button]:border-[2px] [&>button]:px-4 [&>button]:py-1.5 [&>button]:text-[20px] [&>button>span]:text-[20px]">
                  <BlankButton
                    onClick={() => {
                      if (subjectSolved) return
                      setActiveInclusionBlank((prev) => (prev === 'subject' ? null : 'subject'))
                    }}
                    solved={subjectSolved}
                    solvedAnswer="정수"
                    active={activeInclusionBlank === 'subject'}
                    blankType="normal"
                  />
                </span>
                <span className="mx-2">는</span>
                <span className="inline-block align-middle [&>button]:min-w-[92px] [&>button]:rounded-[10px] [&>button]:border-[2px] [&>button]:px-4 [&>button]:py-1.5 [&>button]:text-[20px] [&>button>span]:text-[20px]">
                  <BlankButton
                    onClick={() => {
                      if (containerSolved) return
                      setActiveInclusionBlank((prev) => (prev === 'container' ? null : 'container'))
                    }}
                    solved={containerSolved}
                    solvedAnswer="유리수"
                    active={activeInclusionBlank === 'container'}
                    blankType="normal"
                  />
                </span>
                <span className="mx-2">에 포함된다</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <ChoicePanel
          choices={[...INCLUSION_CHOICES]}
          isOpen={isNegSolved && isTreeNegSolved && !isInclusionSolved && activeInclusionBlank !== null}
          onSelect={handleInclusionChoiceSelect}
          disabled={false}
        />
      </div>
    </StepCard>
  )
}
