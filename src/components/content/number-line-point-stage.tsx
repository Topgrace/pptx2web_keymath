import type { ReactNode } from 'react'
import { StepCard } from '@/components/cards/step-card'
import { QuizArea } from '@/components/quiz'
import type { Quiz } from '@/schemas/step'

function Fraction({
  numerator,
  denominator,
}: {
  numerator: ReactNode
  denominator: ReactNode
}) {
  return (
    <span className="mx-[2px] inline-flex flex-col items-center align-middle text-[0.8em] font-extrabold leading-[1.1]">
      <span className="px-1">{numerator}</span>
      <span className="w-full border-t-2 border-current px-1 text-center">{denominator}</span>
    </span>
  )
}

function MixedNumber({
  whole,
  numerator,
  denominator,
}: {
  whole: ReactNode
  numerator: ReactNode
  denominator: ReactNode
}) {
  return (
    <span className="inline-flex items-center align-middle">
      <span className="text-[1.1em] font-extrabold leading-none">{whole}</span>
      <Fraction numerator={numerator} denominator={denominator} />
    </span>
  )
}

function NumberLinePointContent({
  directionBlank,
}: {
  directionBlank?: (id: 'left' | 'right') => ReactNode
}) {
  return (
    <div className="mx-auto w-full max-w-2xl overflow-hidden">
        <h2 className="mb-7 flex items-center text-[18px] font-extrabold tracking-tight text-[#f97316] sm:text-[21px]">
          <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#f97316] text-white">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          수직선 위의 점에 대응하는 수 찾기
        </h2>

        <div className="mb-6 text-center">
          <p className="text-[17px] font-bold leading-relaxed text-gray-900 sm:text-[20px]">
            <span className="relative z-10 inline-block font-extrabold">
              원점
              <span className="absolute bottom-[2px] left-0 -z-10 h-[40%] w-full bg-yellow-300 opacity-60" />
            </span>
            (Origin)이라고 부르고,
            <br />
            알파벳{' '}
            <span className="relative z-10 inline-block px-2 font-serif text-[28px] font-extrabold leading-none text-black sm:text-[34px]">
              O
              <span className="absolute left-1/2 top-1/2 -z-10 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-300 opacity-60 sm:h-10 sm:w-10" />
            </span>
            로 표시한다.
          </p>
        </div>

        <div className="relative mb-2 w-full">
          <svg viewBox="0 0 500 90" className="mt-7 h-auto w-full overflow-visible sm:mt-8">
            <line
              x1="250"
              y1="-42"
              x2="250"
              y2="12"
              stroke="#9ca3af"
              strokeWidth="2"
              strokeDasharray="4 4"
            />

            <line x1="20" y1="50" x2="480" y2="50" stroke="#374151" strokeWidth="2.5" />
            <polygon points="20,50 32,43 32,57" fill="#374151" />
            <polygon points="480,50 468,43 468,57" fill="#374151" />

            <line
              x1="250"
              y1="50"
              x2="100"
              y2="50"
              stroke="#38bdf8"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <line
              x1="250"
              y1="50"
              x2="383.3"
              y2="50"
              stroke="#f472b6"
              strokeWidth="8"
              strokeLinecap="round"
            />

            <g fontSize="16" fill="#374151" textAnchor="middle" fontFamily="sans-serif">
              <line x1="50" y1="43" x2="50" y2="57" stroke="#374151" strokeWidth="2" />
              <text x="50" y="80">
                −2
              </text>

              <line x1="150" y1="43" x2="150" y2="57" stroke="#374151" strokeWidth="2" />
              <text x="150" y="80">
                −1
              </text>

              <line x1="250" y1="43" x2="250" y2="57" stroke="#374151" strokeWidth="2" />
              <text x="250" y="80">
                0
              </text>

              <line x1="350" y1="43" x2="350" y2="57" stroke="#374151" strokeWidth="2" />
              <text x="350" y="80">
                +1
              </text>

              <line x1="450" y1="43" x2="450" y2="57" stroke="#374151" strokeWidth="2" />
              <text x="450" y="80">
                +2
              </text>
            </g>

            <g fontSize="22" fontWeight="bold" textAnchor="middle" fill="#111827" fontFamily="serif">
              <circle cx="100" cy="50" r="6" fill="#111827" />
              <text x="100" y="30">
                A
              </text>

              <circle cx="250" cy="50" r="6" fill="#111827" />
              <text x="250" y="30">
                O
              </text>

              <circle cx="383.3" cy="50" r="6" fill="#111827" />
              <text x="383.3" y="30">
                B
              </text>
            </g>
          </svg>
        </div>

        <div className="relative z-10 mt-3 flex w-full flex-row justify-between gap-3 sm:mt-4 sm:gap-4">
          <div className="flex w-[48%] flex-col items-center">
            <div className="relative w-full rounded-2xl border-2 border-[#bae6fd] bg-[#f0f9ff] p-3 text-center shadow-sm sm:p-5">
              <svg
                className="absolute -top-[36px] left-[41.6%] z-10 h-[38px] w-[16px] -translate-x-1/2 sm:-top-[46px] sm:h-[48px] md:-top-[62px] md:h-[64px] md:w-[22px]"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                <polygon points="50,0 100,100 0,100" fill="#f0f9ff" />
                <polyline
                  points="0,100 50,0 100,100"
                  fill="none"
                  stroke="#bae6fd"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <p className="break-keep text-[12px] font-bold text-gray-800 sm:text-[16px] md:text-[18px]">
                점 O에서{' '}
                <span className="font-extrabold text-[#0284c7]">
                  {directionBlank ? directionBlank('left') : '왼쪽'}
                </span>
                으로
              </p>
              <div className="mt-2 flex items-center justify-center text-[18px] font-extrabold text-gray-800 sm:mt-3 sm:text-[26px] md:text-[30px]">
                <MixedNumber whole="1" numerator="1" denominator="2" />
                <span className="ml-1 text-[14px] font-bold sm:ml-2 sm:text-[18px] md:text-[20px]">
                  만큼
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-[auto_auto_1fr] items-center justify-center gap-x-1 text-[14px] font-bold tracking-tight text-gray-800 sm:text-[20px] md:text-[24px]">
              <span className="justify-self-end">A:</span>
              <span className="font-extrabold text-[#0284c7]">−</span>
              <span>
                <MixedNumber whole="1" numerator="1" denominator="2" />
              </span>
              <span />
              <span className="justify-self-center">=</span>
              <span>
                <span className="font-extrabold text-[#0284c7]">−</span>
                <Fraction numerator="3" denominator="2" />
              </span>
              <span />
              <span className="justify-self-center">=</span>
              <span>
                <span className="font-extrabold text-[#0284c7]">−</span>
                1.5
              </span>
            </div>
          </div>

          <div className="flex w-[48%] flex-col items-center">
            <div className="relative w-full rounded-2xl border-2 border-[#fbcfe8] bg-[#fff1f2] p-3 text-center shadow-sm sm:p-5">
              <svg
                className="absolute -top-[36px] left-[51.4%] z-10 h-[38px] w-[16px] -translate-x-1/2 sm:-top-[46px] sm:h-[48px] md:-top-[62px] md:h-[64px] md:w-[22px]"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                <polygon points="50,0 100,100 0,100" fill="#fff1f2" />
                <polyline
                  points="0,100 50,0 100,100"
                  fill="none"
                  stroke="#fbcfe8"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <p className="break-keep text-[12px] font-bold text-gray-800 sm:text-[16px] md:text-[18px]">
                점 O에서{' '}
                <span className="font-extrabold text-[#e11d48]">
                  {directionBlank ? directionBlank('right') : '오른쪽'}
                </span>
                으로
              </p>
              <div className="mt-2 flex items-center justify-center text-[18px] font-extrabold text-gray-800 sm:mt-3 sm:text-[26px] md:text-[30px]">
                <MixedNumber whole="1" numerator="1" denominator="3" />
                <span className="ml-1 text-[14px] font-bold sm:ml-2 sm:text-[18px] md:text-[20px]">
                  만큼
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-[auto_auto_1fr] items-center justify-center gap-x-1 text-[14px] font-bold tracking-tight text-gray-800 sm:text-[20px] md:text-[24px]">
              <span className="justify-self-end">B:</span>
              <span className="font-extrabold text-[#e11d48]">+</span>
              <span>
                <MixedNumber whole="1" numerator="1" denominator="3" />
              </span>
              <span />
              <span className="justify-self-center">=</span>
              <span>
                <span className="font-extrabold text-[#e11d48]">+</span>
                <Fraction numerator="4" denominator="3" />
              </span>
            </div>
          </div>
        </div>
    </div>
  )
}

export function NumberLinePointStage({
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
          stepId={1}
          quiz={quiz}
          renderBlanks={(blank) => (
            <NumberLinePointContent directionBlank={(id) => blank(id)} />
          )}
        />
      ) : (
        <NumberLinePointContent />
      )}
    </StepCard>
  )
}
