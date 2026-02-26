import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const SPRING = { type: 'spring' as const, stiffness: 260, damping: 20 }

// R=95, 120° 간격: 위(0,-95), 좌하(-82,48), 우하(82,48)
const FACTOR_POSITIONS = [
  { value: '2', color: '#FCEE67', textColor: '#222', x: 0,   y: -95 },
  { value: '2', color: '#FF8FB3', textColor: '#222', x: -82, y: 48  },
  { value: '3', color: '#B9DDF2', textColor: '#222', x: 82,  y: 48  },
]

interface NumberFactorCardProps {
  visible?: boolean
  className?: string
}

export function NumberFactorCard({
  visible = false,
  className,
}: NumberFactorCardProps) {
  const [isExploded, setIsExploded] = useState(false)

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
      {/* SVG 영역 */}
      <div className="w-full flex justify-center">
        <svg
          viewBox="-130 -140 260 240"
          className="w-full max-w-xs sm:max-w-sm h-auto overflow-visible"
        >
          {/* 연결선 3개: 분해 시 중앙에서 버블로 */}
          {FACTOR_POSITIONS.map((f, i) => (
            <motion.line
              key={`line-${i}`}
              x1={0}
              y1={0}
              x2={f.x}
              y2={f.y}
              stroke="#222"
              strokeWidth="3"
              strokeDasharray="6 4"
              initial={{ opacity: 0 }}
              animate={isExploded ? { opacity: 0.45 } : { opacity: 0 }}
              transition={{ ...SPRING, delay: isExploded ? 0.15 : 0 }}
            />
          ))}

          {/* 중앙 12 */}
          <motion.g
            animate={isExploded
              ? { scale: 0.55, opacity: 0.3 }
              : { scale: 1,    opacity: 1   }
            }
            transition={SPRING}
            style={{ transformOrigin: '0px 0px' }}
          >
            <circle cx="0" cy="0" r="42" fill="#fff" stroke="#222" strokeWidth="4" />
            <text
              x="0"
              y="0"
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="44"
              fontWeight="900"
              fill="#222"
            >
              12
            </text>
          </motion.g>

          {/* 소인수 버블 3개 */}
          {FACTOR_POSITIONS.map((f, i) => (
            <motion.g
              key={`factor-${i}`}
              initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
              animate={isExploded
                ? { x: f.x, y: f.y, scale: 1, opacity: 1 }
                : { x: 0,   y: 0,   scale: 0, opacity: 0 }
              }
              transition={{ ...SPRING, delay: isExploded ? i * 0.07 : 0 }}
              style={{ transformOrigin: '0px 0px' }}
            >
              <circle cx="0" cy="0" r="30" fill={f.color} stroke="#222" strokeWidth="4" />
              <text
                x="0"
                y="0"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="30"
                fontWeight="900"
                fill={f.textColor}
              >
                {f.value}
              </text>
            </motion.g>
          ))}
        </svg>
      </div>

      {/* 텍스트 영역 */}
      <div className="h-14 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isExploded ? (
            <motion.h2
              key="exploded"
              className="text-xl sm:text-2xl font-black text-center leading-tight text-[#E85D5D]"
              style={{ fontFamily: 'inherit' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1,  y: 0  }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              12 = 2 × 2 × 3
            </motion.h2>
          ) : (
            <motion.h2
              key="assembled"
              className="text-xl sm:text-2xl font-black text-center leading-tight text-[#222]"
              style={{ fontFamily: 'inherit' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1,  y: 0  }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              12를 분해해 볼까?
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
    </motion.div>
  )
}
