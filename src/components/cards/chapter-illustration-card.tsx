import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ChapterIllustrationCardProps {
  visible?: boolean
  leftImage?: string
  rightImage?: string
  leftCaption: string
  rightCaption: string
  className?: string
}

function ImageBox({
  src,
  fallbackEmoji,
  caption,
  delay,
  slideDirection,
  visible,
}: {
  src?: string
  fallbackEmoji: string
  caption: string
  delay: number
  slideDirection: 'left' | 'right'
  visible: boolean
}) {
  const [imgError, setImgError] = useState(false)
  const xOffset = slideDirection === 'left' ? -45 : 45

  return (
    <motion.div
      className="flex-1 flex flex-col items-center gap-3"
      initial={{ opacity: 0, x: xOffset }}
      animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: xOffset }}
      transition={{ delay, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* 이미지 박스 */}
      <div
        className="w-full aspect-square rounded-2xl bg-white shadow-[0_3px_14px_rgba(0,0,0,0.10)] flex items-center justify-center overflow-hidden border border-[#E0E0E0]"
        style={{ maxHeight: '150px' }}
      >
        {src && !imgError ? (
          <img
            src={src}
            alt={caption}
            className="w-full h-full object-contain p-3"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-5xl select-none">{fallbackEmoji}</span>
        )}
      </div>

      {/* 캡션 */}
      <p className="text-[13px] font-semibold text-[#2B3A6E] text-center leading-snug">
        {caption}
      </p>
    </motion.div>
  )
}

export function ChapterIllustrationCard({
  visible = false,
  leftImage,
  rightImage,
  leftCaption,
  rightCaption,
  className,
}: ChapterIllustrationCardProps) {
  return (
    <motion.div
      className={cn(
        'mx-4 rounded-4xl bg-white px-6 py-7 shadow-[0_2px_12px_rgba(0,0,0,0.08)]',
        className,
      )}
      initial={{ opacity: 0, y: 35 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-3">
        {/* 왼쪽: 조립된 자동차 */}
        <ImageBox
          src={leftImage}
          fallbackEmoji="🚗"
          caption={leftCaption}
          delay={0.08}
          slideDirection="left"
          visible={visible}
        />

        {/* 중앙 화살표 */}
        <motion.div
          className="flex flex-col items-center shrink-0 gap-1"
          initial={{ opacity: 0, scale: 0 }}
          animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{
            delay: 0.28,
            duration: 0.4,
            ease: [0.34, 1.56, 0.64, 1], // spring-y overshoot
          }}
        >
          {/* 둥근 연결 심볼 */}
          <div className="w-10 h-10 rounded-full bg-[#C8DFF0] border-2 border-[#2B3A6E] flex items-center justify-center shadow-sm">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 9H14M14 9L10 5M14 9L10 13"
                stroke="#2B3A6E"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>

        {/* 오른쪽: 분해된 부품들 */}
        <ImageBox
          src={rightImage}
          fallbackEmoji="🔩"
          caption={rightCaption}
          delay={0.22}
          slideDirection="right"
          visible={visible}
        />
      </div>
    </motion.div>
  )
}
