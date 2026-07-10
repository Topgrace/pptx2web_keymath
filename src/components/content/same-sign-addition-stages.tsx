import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { StepCard } from '@/components/cards/step-card'
import { StaggerItem, StaggerReveal } from '@/components/animations'
import { QuizArea } from '@/components/quiz'
import type { Quiz } from '@/schemas/step'

type SameSign = 'positive' | 'negative'
type NumberLineQuizTarget = 'first' | 'total'

type SignConfig = {
  sign: '+' | '−'
  label: string
  title: string
  result: string
  lineFormula: string
  primary: string
  soft: string
  pale: string
  text: string
  startValue: number
  resultValue: number
}

const signConfigs: Record<SameSign, SignConfig> = {
  positive: {
    sign: '+',
    label: '+끼리 더하기',
    title: '식으로 보기: 양수끼리 더하기',
    result: '+3',
    lineFormula: '(+2)+(+1)=+3',
    primary: '#F05A8A',
    soft: '#F9B4CD',
    pale: '#FFF1F6',
    text: '#9F1239',
    startValue: 2,
    resultValue: 3,
  },
  negative: {
    sign: '−',
    label: '−끼리 더하기',
    title: '식으로 보기: 음수끼리 더하기',
    result: '−3',
    lineFormula: '(−2)+(−1)=−3',
    primary: '#0EA5E9',
    soft: '#8BD5F6',
    pale: '#EFF9FF',
    text: '#075985',
    startValue: -2,
    resultValue: -3,
  },
}

const POSITIVE_TICKS = [0, 1, 2, 3]
const NEGATIVE_TICKS = [-3, -2, -1, 0]

const valueToNumberLineX = (sign: SameSign, value: number) =>
  sign === 'positive' ? 70 + value * 120 : 70 + (value + 3) * 120

const formatNumberLineValue = (value: number) => {
  if (value > 0) return `+${value}`
  if (value < 0) return `−${Math.abs(value)}`
  return '0'
}

function SignBadge({
  sign,
  color,
  className = '',
}: {
  sign: '+' | '−'
  color: string
  className?: string
}) {
  return (
    <span
      className={`relative inline-grid size-[1.05em] shrink-0 place-items-center align-[-0.08em] font-black leading-none text-[#211F20] ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-[-0.16em] rounded-full blur-[3px]"
        style={{
          background: `radial-gradient(circle, ${color} 0%, ${color} 44%, transparent 74%)`,
          opacity: 0.78,
        }}
      />
      <span className="relative z-10">{sign}</span>
    </span>
  )
}

function FormulaTerm({
  config,
  variable,
}: {
  config: SignConfig
  variable: 'a' | 'b'
}) {
  return (
    <span className="inline-flex items-center whitespace-nowrap">
      (
      <SignBadge sign={config.sign} color={config.soft} />
      <span className="font-serif italic">{variable}</span>
      )
    </span>
  )
}

function ExpressionDiagram({
  config,
  sign,
  visible,
  resultBlank,
}: {
  config: SignConfig
  sign: SameSign
  visible: boolean
  resultBlank?: ReactNode
}) {
  const softGradientId = `expression-sign-soft-${sign}`
  const strongGradientId = `expression-sign-strong-${sign}`
  const arrowMarkerId = `expression-rule-arrow-${sign}`
  const brown = '#8B5A14'

  return (
    <svg
      viewBox="0 0 440 280"
      className="h-auto w-full"
      role="img"
      aria-label={`${config.lineFormula}: 공통의 부호를 쓰고 절댓값의 합을 구한다`}
      shapeRendering="geometricPrecision"
    >
      <defs>
        <radialGradient id={softGradientId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={config.soft} stopOpacity="0.95" />
          <stop offset="58%" stopColor={config.soft} stopOpacity="0.72" />
          <stop offset="100%" stopColor={config.soft} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={strongGradientId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={config.primary} stopOpacity="0.95" />
          <stop offset="58%" stopColor={config.primary} stopOpacity="0.78" />
          <stop offset="100%" stopColor={config.primary} stopOpacity="0" />
        </radialGradient>
        <marker
          id={arrowMarkerId}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={brown} />
        </marker>
      </defs>

      <motion.g
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.35, delay: 0.15, ease: 'easeOut' }}
        fill="#211F20"
        fontFamily="Nanum Gothic, sans-serif"
        fontWeight="900"
      >
        <text x="34" y="74" fontSize="54">(</text>
        <circle cx="75" cy="56" r="28" fill={`url(#${softGradientId})`} />
        <text x="75" y="72" fontSize="46" textAnchor="middle">{config.sign}</text>
        <text x="99" y="74" fontSize="54">2)</text>
        <text x="176" y="74" fontSize="54">+</text>
        <text x="223" y="74" fontSize="54">(</text>
        <circle cx="264" cy="56" r="28" fill={`url(#${softGradientId})`} />
        <text x="264" y="72" fontSize="46" textAnchor="middle">{config.sign}</text>
        <text x="288" y="74" fontSize="54">1)</text>
      </motion.g>

      <motion.g
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.55, ease: 'easeOut' }}
      >
        <path
          d="M 75 86 V 119"
          fill="none"
          stroke={brown}
          strokeWidth="3"
          strokeDasharray="5 6"
          strokeLinecap="round"
          markerEnd={`url(#${arrowMarkerId})`}
        />
        <path
          d="M 264 86 L 109 124"
          fill="none"
          stroke={brown}
          strokeWidth="3"
          strokeDasharray="5 6"
          strokeLinecap="round"
          markerEnd={`url(#${arrowMarkerId})`}
        />
        <circle cx="275" cy="111" r="15" fill={brown} />
        <text
          x="275"
          y="117"
          fill="white"
          fontFamily="Nanum Gothic, sans-serif"
          fontSize="18"
          fontWeight="900"
          textAnchor="middle"
        >
          1
        </text>
        <text x="297" y="109" fill={brown} fontFamily="Nanum Gothic, sans-serif" fontSize="18" fontWeight="900">
          공통의 부호를
        </text>
        <text x="297" y="132" fill={brown} fontFamily="Nanum Gothic, sans-serif" fontSize="18" fontWeight="900">
          쓰고
        </text>
      </motion.g>

      <motion.g
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.35, delay: 0.9, ease: 'easeOut' }}
        fill="#211F20"
        fontFamily="Nanum Gothic, sans-serif"
        fontWeight="900"
      >
        <text x="35" y="163" fontSize="54">=</text>
        <circle cx="92" cy="145" r="31" fill={`url(#${strongGradientId})`} />
        <text x="92" y="162" fontSize="48" textAnchor="middle">{config.sign}</text>
        <text x="123" y="163" fontSize="54">(2+1)</text>
      </motion.g>

      <motion.g
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 1.4, ease: 'easeOut' }}
      >
        <path
          d="M 131 177 H 251"
          fill="none"
          stroke={brown}
          strokeWidth="3"
          strokeDasharray="5 6"
          strokeLinecap="round"
        />
        <circle cx="226" cy="205" r="15" fill={brown} />
        <text
          x="226"
          y="211"
          fill="white"
          fontFamily="Nanum Gothic, sans-serif"
          fontSize="18"
          fontWeight="900"
          textAnchor="middle"
        >
          2
        </text>
        <text x="248" y="212" fill={brown} fontFamily="Nanum Gothic, sans-serif" fontSize="19" fontWeight="900">
          절댓값의 합
        </text>
      </motion.g>

      <motion.g
        initial={{ opacity: 0, y: 8 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.4, delay: 1.85, ease: 'easeOut' }}
        fill="#211F20"
        fontFamily="Nanum Gothic, sans-serif"
        fontWeight="900"
      >
        <text x="35" y="268" fontSize="54">=</text>
        {resultBlank ? (
          <foreignObject x="82" y="222" width="150" height="58">
            <div className="flex h-full items-center [&>button]:h-[50px] [&>button]:min-w-[108px] [&>button]:px-3 [&>button]:py-1 [&>button]:text-[28px] [&>button>span]:text-[24px]">
              {resultBlank}
            </div>
          </foreignObject>
        ) : (
          <text x="88" y="268" fontSize="54">{config.result}</text>
        )}
      </motion.g>
    </svg>
  )
}

function FormulaDisplay({ config }: { config: SignConfig }) {
  return (
    <div className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[30px] font-black leading-[1.35] text-[#1F2937] sm:text-[40px]">
      <FormulaTerm config={config} variable="a" />
      <span>+</span>
      <FormulaTerm config={config} variable="b" />
      <span>=</span>
      <span className="inline-flex items-center whitespace-nowrap">
        <SignBadge sign={config.sign} color={config.soft} />
        <span>
          (<span className="font-serif italic">a</span>+<span className="font-serif italic">b</span>)
        </span>
      </span>
    </div>
  )
}

function NumberLineArrow({
  startX,
  endX,
  y,
  label,
  labelY,
  color,
  delay,
  visible,
  labelContent,
  labelContentY,
}: {
  startX: number
  endX: number
  y: number
  label: string
  labelY: number
  color: string
  delay: number
  visible: boolean
  labelContent?: ReactNode
  labelContentY?: number
}) {
  const direction = endX > startX ? 1 : -1
  const arrowBaseX = endX - direction * 22
  const labelX = (startX + endX) / 2

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={visible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.35, delay, ease: 'easeOut' }}
    >
      <line
        x1={startX}
        y1={y}
        x2={arrowBaseX}
        y2={y}
        stroke={color}
        strokeWidth="8"
        strokeLinecap="butt"
      />
      <polygon
        points={`${endX},${y} ${arrowBaseX},${y - 11} ${arrowBaseX},${y + 11}`}
        fill={color}
      />
      {labelContent ? (
        <foreignObject x={labelX - 55} y={labelContentY ?? labelY - 29} width="110" height="42">
          <div className="flex h-full items-center justify-center [&>button]:h-[38px] [&>button]:min-w-[78px] [&>button]:px-2 [&>button]:py-0.5 [&>button]:text-[20px] [&>button>span]:text-[18px]">
            {labelContent}
          </div>
        </foreignObject>
      ) : (
        <text
          x={labelX}
          y={labelY}
          fill="#1F2937"
          fontFamily="sans-serif"
          fontSize="23"
          fontWeight="900"
          textAnchor="middle"
        >
          {label}
        </text>
      )}
    </motion.g>
  )
}

export function SameSignAdditionExpressionStage({
  sign,
  quiz,
  stepId,
  visible = false,
}: {
  sign: SameSign
  quiz?: Quiz
  stepId: number
  visible?: boolean
}) {
  const config = signConfigs[sign]

  return (
    <StepCard visible={visible} variant="white" className="px-4 py-6 sm:px-6">
      <StaggerReveal enabled={visible} staggerChildren={0.16}>
        <StaggerItem>
          <div className="text-center">
            <div
              className="inline-block rounded-[10px] px-5 py-2 text-[22px] font-black leading-none text-white shadow-sm sm:text-[30px]"
              style={{ backgroundColor: config.text }}
            >
              {config.title}
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div
            className="rounded-[18px] border px-4 pb-5 shadow-sm sm:px-6"
            style={{ borderColor: config.soft, backgroundColor: config.pale }}
          >
            {quiz ? (
              <QuizArea
                stepId={stepId}
                quiz={quiz}
                renderBlank={(blank) => (
                  <div className="rounded-[16px] bg-white px-2 py-3 shadow-sm sm:px-4">
                    <ExpressionDiagram
                      config={config}
                      sign={sign}
                      visible={visible}
                      resultBlank={blank}
                    />
                  </div>
                )}
              />
            ) : (
              <div className="mt-5 rounded-[16px] bg-white px-2 py-3 shadow-sm sm:px-4">
                <ExpressionDiagram config={config} sign={sign} visible={visible} />
              </div>
            )}
          </div>
        </StaggerItem>
      </StaggerReveal>
    </StepCard>
  )
}

function NumberLineContent({
  sign,
  config,
  visible,
  firstArrowBlank,
  totalArrowBlank,
}: {
  sign: SameSign
  config: SignConfig
  visible: boolean
  firstArrowBlank?: ReactNode
  totalArrowBlank?: ReactNode
}) {
  const ticks = sign === 'positive' ? POSITIVE_TICKS : NEGATIVE_TICKS
  const guideValues = [0, config.startValue, config.resultValue]
  const originX = valueToNumberLineX(sign, 0)
  const firstEndX = valueToNumberLineX(sign, config.startValue)
  const secondEndX = valueToNumberLineX(sign, config.resultValue)

  return (
    <>
      <div className="rounded-[14px] bg-white px-2 py-3 shadow-sm">
        <svg
          viewBox="0 0 500 230"
          className="h-auto w-full"
          role="img"
          aria-label={`${config.lineFormula}를 수직선으로 나타낸 그림`}
          shapeRendering="geometricPrecision"
        >
          {guideValues.map((value) => {
            const x = valueToNumberLineX(sign, value)

            return (
              <line
                key={`guide-${value}`}
                x1={x}
                y1="12"
                x2={x}
                y2="194"
                stroke="#A7B0B7"
                strokeWidth="1.5"
              />
            )
          })}

          <NumberLineArrow
            startX={originX}
            endX={firstEndX}
            y={69}
            label={formatNumberLineValue(config.startValue)}
            labelY={55}
            color={config.soft}
            delay={0.3}
            visible={visible}
            labelContent={firstArrowBlank}
          />
          <NumberLineArrow
            startX={firstEndX}
            endX={secondEndX}
            y={35}
            label={formatNumberLineValue(config.resultValue - config.startValue)}
            labelY={22}
            color={config.soft}
            delay={0.7}
            visible={visible}
          />

          <line x1="36" y1="110" x2="464" y2="110" stroke="#1F2937" strokeWidth="3" />
          <polygon points="25,110 39,102 39,118" fill="#1F2937" />
          <polygon points="475,110 461,102 461,118" fill="#1F2937" />

          <g fontFamily="sans-serif" textAnchor="middle">
            {ticks.map((value) => {
              const x = valueToNumberLineX(sign, value)

              return (
                <g key={value}>
                  <line x1={x} y1="97" x2={x} y2="123" stroke="#1F2937" strokeWidth="2.5" />
                  <text x={x} y="150" fill="#1F2937" fontSize="24" fontWeight="800">
                    {formatNumberLineValue(value)}
                  </text>
                </g>
              )
            })}
          </g>

          <NumberLineArrow
            startX={originX}
            endX={secondEndX}
            y={179}
            label={formatNumberLineValue(config.resultValue)}
            labelY={209}
            color={config.primary}
            delay={1.1}
            visible={visible}
            labelContent={totalArrowBlank}
            labelContentY={184}
          />
        </svg>
      </div>

      <div className="mt-3 text-center text-[22px] font-black leading-[1.45] text-[#1F2937] sm:text-[28px]">
        {config.lineFormula}
      </div>
    </>
  )
}

export function SameSignAdditionNumberLineStage({
  sign,
  quiz,
  stepId,
  quizTarget = 'first',
  visible = false,
}: {
  sign: SameSign
  quiz?: Quiz
  stepId: number
  quizTarget?: NumberLineQuizTarget
  visible?: boolean
}) {
  const config = signConfigs[sign]

  return (
    <StepCard visible={visible} variant="white" className="px-4 py-6 sm:px-6">
      <StaggerReveal enabled={visible} staggerChildren={0.16}>
        <StaggerItem>
          <div className="text-center">
            <div
              className="inline-block rounded-[10px] px-5 py-2 text-[22px] font-black leading-none text-white shadow-sm sm:text-[30px]"
              style={{ backgroundColor: config.text }}
            >
              수직선으로 보기: {config.label}
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div
            className={
              quiz
                ? 'rounded-[18px] border px-4 pb-5 shadow-sm'
                : 'mt-6 rounded-[18px] border px-4 py-5 shadow-sm'
            }
            style={{ borderColor: config.soft, backgroundColor: config.pale }}
          >
            {quiz ? (
              <QuizArea
                stepId={stepId}
                quiz={quiz}
                renderBlank={(blank) => (
                  <NumberLineContent
                    sign={sign}
                    config={config}
                    visible={visible}
                    firstArrowBlank={quizTarget === 'first' ? blank : undefined}
                    totalArrowBlank={quizTarget === 'total' ? blank : undefined}
                  />
                )}
              />
            ) : (
              <NumberLineContent sign={sign} config={config} visible={visible} />
            )}
          </div>
        </StaggerItem>
      </StaggerReveal>
    </StepCard>
  )
}

export function SameSignAdditionFormulaStage({
  sign,
  quiz,
  stepId,
  visible = false,
}: {
  sign: SameSign
  quiz?: Quiz
  stepId: number
  visible?: boolean
}) {
  const config = signConfigs[sign]

  return (
    <StepCard visible={visible} variant="white" className="px-4 py-6 sm:px-6">
      <StaggerReveal enabled={visible} staggerChildren={0.16}>
        <StaggerItem>
          <div className="text-center">
            <div
              className="inline-block rounded-[10px] px-5 py-2 text-[22px] font-black leading-none text-white shadow-sm sm:text-[30px]"
              style={{ backgroundColor: config.text }}
            >
              문자식으로 보기: {config.label}
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div
            className="mt-6 rounded-[18px] border px-4 py-5 shadow-sm sm:px-6"
            style={{ borderColor: config.soft, backgroundColor: config.pale }}
          >
            <div className="rounded-[16px] bg-white px-4 py-5 text-center shadow-sm">
              <FormulaDisplay config={config} />
            </div>

            {quiz && (
              <QuizArea
                stepId={stepId}
                quiz={quiz}
                renderBlanks={(blank) => (
                  <div className="mx-auto mt-1 grid max-w-[720px] gap-3 text-left md:grid-cols-2">
                    <div className="rounded-[16px] bg-white px-4 py-4 text-center shadow-sm">
                      <div className="mb-2 text-[13px] font-black text-[#8B5E16]">
                        공통의 부호
                      </div>
                      <div className="break-keep text-[18px] font-extrabold leading-[1.7] text-[#1F2937]">
                        두 수의 공통 부호는 {blank('commonSign')}이다.
                      </div>
                    </div>

                    <div className="rounded-[16px] bg-white px-4 py-4 text-center shadow-sm">
                      <div className="mb-2 text-[13px] font-black text-[#8B5E16]">
                        절댓값 계산
                      </div>
                      <div className="break-keep text-[18px] font-extrabold leading-[1.7] text-[#1F2937]">
                        괄호 안에는 {blank('absoluteSum')}을 쓴다.
                      </div>
                    </div>
                  </div>
                )}
              />
            )}
          </div>
        </StaggerItem>
      </StaggerReveal>
    </StepCard>
  )
}
