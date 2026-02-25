import { useState } from 'react'
import { motion } from 'framer-motion'
import { Typewriter, LettersPullUp, EmojiBounce } from '@/components/animations'
import { cn } from '@/lib/utils'

interface ChapterIntroCardProps {
  visible?: boolean
  chapterNum: string
  chapterTitle: string
  characterImg?: string
  speechText: string
  className?: string
}

export function ChapterIntroCard({
  visible = false,
  chapterNum,
  chapterTitle,
  characterImg,
  speechText,
  className,
}: ChapterIntroCardProps) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      className={cn('mx-4 overflow-hidden rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.10)]', className)}
      initial={{ opacity: 0, y: 40 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── 1. 제목 배너 ─────────────────────────────────── */}
      <motion.div
        className="relative flex items-center justify-center py-4 px-6"
        style={{
          background: 'linear-gradient(135deg, #FFE033 0%, #FFD100 100%)',
          borderBottom: '3px solid #2B3A6E',
        }}
        initial={{ scaleY: 0, transformOrigin: 'top' }}
        animate={visible ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
      >
        {/* 왼쪽 장식 컬 */}
        <motion.span
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2B3A6E] text-2xl font-black select-none"
          initial={{ opacity: 0, x: -10 }}
          animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ delay: 0.45, duration: 0.35 }}
        >
          {'{'}
        </motion.span>
        <motion.span
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2B3A6E] text-2xl font-black select-none"
          initial={{ opacity: 0, x: 10 }}
          animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
          transition={{ delay: 0.45, duration: 0.35 }}
        >
          {'}'}
        </motion.span>

        {/* 제목 텍스트 */}
        <h1 className="text-[26px] font-extrabold text-[#2B3A6E] tracking-tight text-center">
          <LettersPullUp
            text={`${chapterNum}. ${chapterTitle}`}
            enabled={visible}
            className="inline-flex gap-[0.5px]"
          />
        </h1>
      </motion.div>

      {/* ── 2. 배울 내용 섹션 ─────────────────────────────── */}
      <motion.div
        className="bg-[#C8DFF0] px-5 py-5"
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
      >
        {/* 배지 */}
        <motion.div
          className="inline-flex items-center"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.55, duration: 0.3 }}
        >
          <EmojiBounce enabled={visible} className="inline-block">
            <span
              className="text-[11px] font-bold text-white px-3 py-1 rounded-full shadow-sm"
              style={{ background: '#E8655A' }}
            >
              배울 내용
            </span>
          </EmojiBounce>
        </motion.div>

        {/* 캐릭터 + 말풍선 행 */}
        <div className="flex items-start gap-3 mt-4">
          {/* 캐릭터 이미지 */}
          {characterImg && !imgError && (
            <motion.img
              src={characterImg}
              alt="캐릭터"
              className="w-[52px] h-[52px] object-contain shrink-0 self-center"
              initial={{ opacity: 0, x: -20 }}
              animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.65, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onError={() => setImgError(true)}
            />
          )}

          {/* 말풍선 */}
          <motion.div
            className="relative bg-white rounded-2xl py-3 px-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex-1"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
            transition={{ delay: 0.75, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* 말풍선 꼬리 */}
            {characterImg && !imgError && (
              <div className="absolute -left-2 top-4 w-0 h-0 border-[7px] border-transparent border-r-white" />
            )}
            <p className="text-[14px] text-[#2B3A6E] leading-relaxed font-medium">
              <Typewriter
                text={speechText}
                speed={32}
                enabled={visible}
              />
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
