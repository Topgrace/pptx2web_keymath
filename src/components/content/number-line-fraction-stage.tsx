import type { ReactNode } from 'react'
import { StepCard } from '@/components/cards/step-card'
import { QuizArea } from '@/components/quiz'
import type { Quiz } from '@/schemas/step'

function Fraction({
  numerator,
  denominator,
  size = '1.1rem',
  lineWidth = '1.5px',
}: {
  numerator: ReactNode
  denominator: ReactNode
  size?: string
  lineWidth?: string
}) {
  return (
    <span
      className="mx-[2px] inline-flex flex-col items-center align-middle font-bold"
      style={{ fontSize: size }}
    >
      <span className="w-full text-center leading-[1.1] pb-[2px] px-[2px]">{numerator}</span>
      <span
        className="w-full text-center leading-[1.1] pt-[2px] px-[2px]"
        style={{ borderTop: `${lineWidth} solid currentColor` }}
      >
        {denominator}
      </span>
    </span>
  )
}

function FractionStageContent({ directionBlank }: { directionBlank?: ReactNode }) {
  return (
    <div className="mx-auto w-full">
        {/* Header */}
        <h2 className="mb-8 flex items-center text-[18px] font-extrabold tracking-tight text-[#f97316] sm:text-[21px]">
          <span className="mr-2 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#f97316] text-white">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          수에 대응하는 수직선 위의 점 찾기
        </h2>

        {/* Large -5/4 with dashed line connectors */}
        <div className="relative flex flex-col items-center justify-center mb-8">
          <div className="relative z-10 mt-6 flex items-center font-bold text-gray-800">
            {/* Minus sign with blue oval highlight */}
            <div className="relative mr-3 flex h-12 w-12 items-center justify-center">
              <div className="absolute h-[14px] w-14 rounded-full bg-[#60c5f1]" style={{ zIndex: -1 }} />
              <div className="h-[5px] w-10 rounded-sm bg-gray-800" />
              {/* Dashed line from minus toward "왼쪽" below */}
              <div
                className="absolute border-l-[1.5px] border-dashed border-gray-500"
                style={{
                  top: 38,
                  left: '50%',
                  height: 105,
                  transform: 'translateX(-4px)',
                  zIndex: -2,
                }}
              />
            </div>

            {/* Fraction 5/4 */}
            <div className="relative inline-flex flex-col items-center text-5xl font-bold">
              <span className="px-2 leading-[1.1] pb-1 border-b-4 border-gray-800">5</span>
              <span className="px-2 leading-[1.1] pt-1">4</span>
              {/* Dashed line from fraction toward formula below */}
              <div
                className="absolute border-l-[1.5px] border-dashed border-gray-500"
                style={{
                  top: '100%',
                  left: '50%',
                  height: 60,
                  transform: 'translateX(-50%)',
                  zIndex: -1,
                }}
              />
            </div>
          </div>

          {/* Explanation text */}
          <p className="relative z-20 mt-14 flex flex-wrap items-center justify-center gap-x-1 break-keep text-center text-[1.1rem] font-medium text-gray-800">
            점 O에서{' '}
            {directionBlank ?? <span className="font-bold text-[#20b2e6]">왼쪽</span>}으로
            <Fraction numerator="5" denominator="4" size="1.1rem" lineWidth="1.5px" />
            <span className="flex items-center text-gray-600">
              (=1
              <Fraction numerator="1" denominator="4" size="0.85rem" lineWidth="1px" />
              )
            </span>
            만큼 이동
          </p>
        </div>

        {/* Number line SVG */}
        <div className="mt-2 w-full">
          <svg viewBox="0 0 400 220" className="h-auto w-full overflow-visible">
            <defs>
              <marker
                id="u10s3-arrow"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#333" />
              </marker>
              <marker
                id="u10s3-blue-arrow"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#60c5f1" />
              </marker>
            </defs>

            {/* Number line */}
            <line
              x1="20" y1="100" x2="380" y2="100"
              stroke="#333" strokeWidth="2"
              markerStart="url(#u10s3-arrow)"
              markerEnd="url(#u10s3-arrow)"
            />

            {/* Integer tick marks and labels */}
            <line x1="280" y1="92" x2="280" y2="108" stroke="#333" strokeWidth="2" />
            <text x="280" y="128" textAnchor="middle" fontSize="18" fontFamily="sans-serif" fontWeight="bold" fill="#333">0</text>

            <line x1="360" y1="92" x2="360" y2="108" stroke="#333" strokeWidth="2" />
            <text x="360" y="128" textAnchor="middle" fontSize="18" fontFamily="sans-serif" fontWeight="bold" fill="#333">+1</text>

            <line x1="200" y1="92" x2="200" y2="108" stroke="#333" strokeWidth="2" />
            <text x="200" y="128" textAnchor="middle" fontSize="18" fontFamily="sans-serif" fontWeight="bold" fill="#333">-1</text>

            <line x1="120" y1="92" x2="120" y2="108" stroke="#333" strokeWidth="2" />
            <text x="120" y="128" textAnchor="middle" fontSize="18" fontFamily="sans-serif" fontWeight="bold" fill="#333">-2</text>

            {/* Sub-ticks between -1 and -2 (4 equal parts, spacing=20) */}
            <line x1="180" y1="95" x2="180" y2="105" stroke="#333" strokeWidth="1.5" />
            <line x1="160" y1="95" x2="160" y2="105" stroke="#333" strokeWidth="1.5" />
            <line x1="140" y1="95" x2="140" y2="105" stroke="#333" strokeWidth="1.5" />

            {/* Blue highlight segment from 0 to -1 */}
            <line x1="200" y1="100" x2="280" y2="100" stroke="#60c5f1" strokeWidth="6" />

            {/* Blue dashed curved arrows showing movement */}
            {/* 0 → -1 (large jump) */}
            <path
              d="M 280 96 Q 240 20 203 94"
              fill="none" stroke="#60c5f1" strokeWidth="2"
              strokeDasharray="4,3"
              markerEnd="url(#u10s3-blue-arrow)"
            />
            {/* -1 → -1.25 (small jump) */}
            <path
              d="M 200 96 Q 190 55 182 94"
              fill="none" stroke="#60c5f1" strokeWidth="2"
              strokeDasharray="3,2"
              markerEnd="url(#u10s3-blue-arrow)"
            />

            {/* Target point at -5/4 = -1.25 (x=180): yellow ring + red dot */}
            <circle cx="180" cy="100" r="9" fill="#ffeb85" />
            <circle cx="180" cy="100" r="4.5" fill="#f14b43" />

            {/* Tooltip box with upward tail */}
            <path
              d="M 120 140 L 172 140 L 180 115 L 188 140 L 240 140 A 10 10 0 0 1 250 150 L 250 200 A 10 10 0 0 1 240 210 L 120 210 A 10 10 0 0 1 110 200 L 110 150 A 10 10 0 0 1 120 140 Z"
              fill="#ecf9fe" stroke="#bce4fa" strokeWidth="2.5"
            />

            {/* Tooltip content: -5/4 = -1 1/4 */}
            <foreignObject x="110" y="140" width="140" height="70">
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  fontFamily: 'sans-serif',
                  fontSize: '17px',
                  gap: '2px',
                }}
              >
                <span style={{ marginRight: '1px' }}>-</span>
                <span
                  style={{
                    display: 'inline-flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    fontSize: '17px',
                    margin: '0 2px',
                  }}
                >
                  <span style={{ lineHeight: 1.1, paddingBottom: '1px', textAlign: 'center' }}>5</span>
                  <span
                    style={{
                      borderTop: '2px solid #1f2937',
                      lineHeight: 1.1,
                      paddingTop: '1px',
                      textAlign: 'center',
                    }}
                  >
                    4
                  </span>
                </span>
                <span style={{ margin: '0 5px', color: '#6b7280', fontWeight: 500 }}>=</span>
                <span style={{ marginRight: '2px' }}>-1</span>
                <span
                  style={{
                    display: 'inline-flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    fontSize: '14px',
                    margin: '0 2px',
                  }}
                >
                  <span style={{ lineHeight: 1.1, paddingBottom: '1px', textAlign: 'center' }}>1</span>
                  <span
                    style={{
                      borderTop: '1.5px solid #1f2937',
                      lineHeight: 1.1,
                      paddingTop: '1px',
                      textAlign: 'center',
                    }}
                  >
                    4
                  </span>
                </span>
              </div>
            </foreignObject>
          </svg>
        </div>
      </div>
  )
}

export function NumberLineFractionStage({
  visible = false,
  quiz,
}: {
  visible?: boolean
  quiz?: Quiz
}) {
  return (
    <StepCard variant="white" visible={visible} className="px-4 py-6 sm:px-6">
      {quiz ? (
        <QuizArea
          stepId={2}
          quiz={quiz}
          renderBlank={(blank) => <FractionStageContent directionBlank={blank} />}
        />
      ) : (
        <FractionStageContent />
      )}
    </StepCard>
  )
}
