import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const SPRING = { type: 'spring' as const, stiffness: 260, damping: 20 }

const partVariants = {
  assembled: {
    body:    { x: 0,   y: 0,   scale: 1,    rotate: 0  },
    engine:  { x: 0,   y: 0,   scale: 1,    rotate: 0  },
    seat:    { x: 0,   y: 0,   scale: 1,    rotate: 0  },
    wheelF:  { x: 0,   y: 0,   rotate: 0               },
    wheelB:  { x: 0,   y: 0,   rotate: 0               },
    chassis: { x: 0,   y: 0                             },
  },
  exploded: {
    body:    { x: -8,  y: -38, scale: 1.05, rotate: 0  },
    engine:  { x: 38,  y: -24, scale: 1.1,  rotate: 0  },
    seat:    { x: 8,   y: -14, scale: 1.1,  rotate: 0  },
    wheelF:  { x: -8,  y: 10,  rotate: -10             },
    wheelB:  { x: 8,   y: 10,  rotate: 10              },
    chassis: { x: 0,   y: 10                            },
  },
}

interface CarDisassembleCardProps {
  visible?: boolean
  className?: string
}

export function CarDisassembleCard({
  visible = false,
  className,
}: CarDisassembleCardProps) {
  const [isExploded, setIsExploded] = useState(false)
  const state = isExploded ? 'exploded' : 'assembled'
  const v = partVariants[state]

  return (
    <motion.div
      className={cn(
        'w-full border-4 border-[#222] shadow-[6px_6px_0px_#222] bg-white rounded-sm',
        'px-4 sm:px-8 py-6 flex flex-col items-center gap-5',
        className,
      )}
      initial={{ opacity: 0, y: 35 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* 자동차 SVG 영역 */}
      <div className="w-full flex justify-center">
        <svg
          viewBox="-20 -55 240 190"
          className="w-full max-w-xs sm:max-w-sm h-auto overflow-visible"
        >
          {/* 전체 자동차 부웅부웅 bounce */}
          <motion.g
            animate={isExploded ? { y: 0 } : { y: [0, -10, 0] }}
            transition={
              isExploded
                ? { duration: 0.3 }
                : { repeat: Infinity, duration: 2, ease: 'easeInOut' }
            }
          >
            {/* 1. 섀시 */}
            <motion.g animate={v.chassis} transition={SPRING}>
              <rect x="25" y="65" width="130" height="8" rx="4" fill="#999" stroke="#222" strokeWidth="3" />
              <line x1="55" y1="65" x2="55" y2="85" stroke="#222" strokeWidth="3" />
              <line x1="125" y1="65" x2="125" y2="85" stroke="#222" strokeWidth="3" />
            </motion.g>

            {/* 2. 엔진 */}
            <motion.g animate={v.engine} transition={SPRING}>
              <g transform="translate(35, 40)">
                <rect x="0" y="0" width="30" height="25" rx="3" fill="#A0AEC0" stroke="#222" strokeWidth="3" />
                <line x1="7" y1="0" x2="7" y2="25" stroke="#222" strokeWidth="2" />
                <line x1="15" y1="0" x2="15" y2="25" stroke="#222" strokeWidth="2" />
                <line x1="23" y1="0" x2="23" y2="25" stroke="#222" strokeWidth="2" />
              </g>
            </motion.g>

            {/* 3. 좌석 */}
            <motion.g animate={v.seat} transition={SPRING}>
              <g transform="translate(90, 35)">
                <path d="M 0 30 L 15 30 L 15 15 C 15 5 5 5 0 15 Z" fill="#4A5568" stroke="#222" strokeWidth="3" />
                <path d="M 20 30 L 35 30 L 35 15 C 35 5 25 5 20 15 Z" fill="#4A5568" stroke="#222" strokeWidth="3" />
              </g>
            </motion.g>

            {/* 4. 앞바퀴 */}
            <g transform="translate(55, 85)">
              <motion.g animate={v.wheelF} transition={SPRING}>
                <circle cx="0" cy="0" r="16" fill="#2D3748" stroke="#222" strokeWidth="3" />
                <circle cx="0" cy="0" r="6" fill="#CBD5E0" stroke="#222" strokeWidth="2" />
              </motion.g>
            </g>

            {/* 5. 뒷바퀴 */}
            <g transform="translate(125, 85)">
              <motion.g animate={v.wheelB} transition={SPRING}>
                <circle cx="0" cy="0" r="16" fill="#2D3748" stroke="#222" strokeWidth="3" />
                <circle cx="0" cy="0" r="6" fill="#CBD5E0" stroke="#222" strokeWidth="2" />
              </motion.g>
            </g>

            {/* 6. 차체 (껍데기) */}
            <motion.g animate={v.body} transition={SPRING}>
              <path
                d="M 25 40 L 45 10 L 115 10 L 140 40 L 160 40 L 160 65 L 20 65 L 20 40 Z"
                fill="#FF8FB3"
                stroke="#222"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <path
                d="M 50 15 L 80 15 L 80 35 L 35 35 Z"
                fill="#B9DDF2"
                stroke="#222"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <path
                d="M 90 15 L 110 15 L 125 35 L 90 35 Z"
                fill="#B9DDF2"
                stroke="#222"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <ellipse cx="25" cy="50" rx="4" ry="8" fill="#FCEE67" stroke="#222" strokeWidth="2" />
            </motion.g>
          </motion.g>
        </svg>
      </div>

      {/* 텍스트 및 버튼 영역 */}
      <div className="flex flex-col items-center gap-4 w-full">
        {/* 변환되는 텍스트 */}
        <div className="h-14 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isExploded ? (
              <motion.h2
                key="exploded"
                className="text-xl sm:text-2xl font-black text-center leading-tight text-[#E85D5D]"
                style={{ fontFamily: 'inherit' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                무엇이 재료인지<br />알 수 있어요!
              </motion.h2>
            ) : (
              <motion.h2
                key="assembled"
                className="text-xl sm:text-2xl font-black text-center leading-tight text-[#222]"
                style={{ fontFamily: 'inherit' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                분해를 하면,
              </motion.h2>
            )}
          </AnimatePresence>
        </div>

        {/* 분해 / 합성 버튼 */}
        <div className="flex gap-4">
          <motion.button
            onClick={() => setIsExploded(true)}
            whileTap={{ x: 4, y: 4, boxShadow: '0px 0px 0px #222' }}
            className={cn(
              'px-6 py-2 bg-[#FCEE67] text-[#222]',
              'border-4 border-[#222] font-black text-lg',
              'shadow-[4px_4px_0px_#222] cursor-pointer',
              'transition-all hover:shadow-[2px_2px_0px_#222] hover:translate-x-0.5 hover:translate-y-0.5',
            )}
            style={{ fontFamily: 'inherit' }}
          >
            분해
          </motion.button>
          <motion.button
            onClick={() => setIsExploded(false)}
            whileTap={{ x: 4, y: 4, boxShadow: '0px 0px 0px #222' }}
            className={cn(
              'px-6 py-2 bg-[#B9DDF2] text-[#222]',
              'border-4 border-[#222] font-black text-lg',
              'shadow-[4px_4px_0px_#222] cursor-pointer',
              'transition-all hover:shadow-[2px_2px_0px_#222] hover:translate-x-0.5 hover:translate-y-0.5',
            )}
            style={{ fontFamily: 'inherit' }}
          >
            합성
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
