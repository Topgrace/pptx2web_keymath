import { useState } from 'react'
import { motion } from 'framer-motion'
import { Typewriter } from '@/components/animations'
import { cn } from '@/lib/utils'

interface ChapterIntroNeoCardProps {
  visible?: boolean
  chapterNum: string
  chapterTitle: string
  speechText: string
  className?: string
}

export function ChapterIntroNeoCard({
  visible = false,
  chapterNum,
  chapterTitle,
  speechText,
  className,
}: ChapterIntroNeoCardProps) {
  const [titleDone, setTitleDone] = useState(false)

  return (
    <div className={cn('flex flex-col items-center gap-5 px-1 pb-2', className)}>
      {/* ─── Panel 1: 노란 타이틀 네오 박스 ─────────────────── */}
      <motion.div
        className="w-full border-4 border-[#222] shadow-[6px_6px_0px_#222] bg-[#FCEE67] py-4 sm:py-6 px-6 text-center rounded-sm"
        initial={{ opacity: 0, y: -24 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -24 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-4xl sm:text-5xl font-black text-[#222] tracking-widest min-h-[1.2em]">
          <Typewriter
            text={`${chapterNum}. ${chapterTitle}`}
            speed={80}
            enabled={visible}
            onComplete={() => setTitleDone(true)}
          />
        </h1>
      </motion.div>

      {/* ─── Panel 2: 배울 내용 흰 네오 박스 ────────────────── */}
      <motion.div
        className="w-full border-4 border-[#222] shadow-[6px_6px_0px_#222] bg-white rounded-sm px-5 sm:px-7 pb-5 sm:pb-7 pt-12 sm:pt-14 overflow-visible relative"
        initial={{ opacity: 0, y: 24 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* 배울 내용 배지 — 카드 상단 왼쪽에 절대 위치 */}
        <motion.div
          className="absolute -left-3 top-4 bg-[#E85D5D] text-white px-3 py-1 border-4 border-[#222] font-bold text-sm sm:text-base shadow-[4px_4px_0px_#222] whitespace-nowrap z-20"
          style={{ fontFamily: 'inherit' }}
          initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
          animate={titleDone && visible ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.5, rotate: -20 }}
          transition={{ duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] }}
        >
          배울 내용
        </motion.div>

        {/* 캐릭터 + 말풍선 — 배지 아래 가로 배치 */}
        <div className="flex flex-row items-center gap-4 mt-3">

        {/* 캐릭터 인라인 SVG */}
        <motion.div
          className="w-24 min-w-24 sm:w-28 sm:min-w-28 shrink-0 self-center"
          initial={{ opacity: 0, x: -60 }}
          animate={titleDone && visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 51.58 62.55"
            className="w-full h-full overflow-visible"
          >
            <g>
              {/* 귀 */}
              <path
                d="M6.28,22.37c-.92-.02-1.87-.03-2.71.33-.84.36-1.56,1.19-1.48,2.1.11,1.33,1.85,2,3.11,1.54,1.26-.46,2.11-1.61,2.87-2.71-.24.01-.36.4-.15.54.2.14.53-.1.45-.33"
                fill="#d07741"
              />
              <path
                d="M6.28,22.37c-.92-.02-1.87-.03-2.71.33-.84.36-1.56,1.19-1.48,2.1.11,1.33,1.85,2,3.11,1.54,1.26-.46,2.11-1.61,2.87-2.71-.24.01-.36.4-.15.54.2.14.53-.1.45-.33"
                fill="none"
                stroke="#231815"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.26"
              />
              {/* 다리 오른쪽 */}
              <path
                d="M30.23,44.52c.15,3.47.3,6.94.45,10.41.06,1.39-.18,2.94.88,3.83.34.28.56.47.87.78.32.31.52.8.32,1.19-.24.46-1.06.51-1.57.5-2.08-.03-3.78-.07-5.87-.1-1.96-6.73-3.54-13.45-5.5-20.18"
                fill="#fff"
              />
              <path
                d="M30.23,44.52c.15,3.47.3,6.94.45,10.41.06,1.39-.18,2.94.88,3.83.34.28.56.47.87.78.32.31.52.8.32,1.19-.24.46-1.06.51-1.57.5-2.08-.03-3.78-.07-5.87-.1-1.96-6.73-3.54-13.45-5.5-20.18"
                fill="none"
                stroke="#231815"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.26"
              />
              {/* 다리 왼쪽 */}
              <path
                d="M12.3,45.2c-.15,3.47-.3,6.94-.45,10.41-.06,1.39.18,2.94-.88,3.83-.34.28-.56.47-.87.78s-.52.8-.32,1.19c.24.46,1.05.51,1.57.5,2.08-.03,3.78-.07,5.87-.1,1.96-6.73,3.54-13.45,5.5-20.18"
                fill="#fff"
              />
              <path
                d="M12.3,45.2c-.15,3.47-.3,6.94-.45,10.41-.06,1.39.18,2.94-.88,3.83-.34.28-.56.47-.87.78s-.52.8-.32,1.19c.24.46,1.05.51,1.57.5,2.08-.03,3.78-.07,5.87-.1,1.96-6.73,3.54-13.45,5.5-20.18"
                fill="none"
                stroke="#231815"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.26"
              />
              {/* 왼팔 */}
              <path
                d="M15.25,26.79c-4.39,2.56-13,9.53-14.62,14.71,1.2-.21,1.82-.22,3.02-.42-.26.67-.34,1.54-.6,2.21.84-.12,1.68-.43,2.52-.55-.07.24.62,2.02.55,2.26,4.03-2.84,7.68-6.84,11.71-9.69"
                fill="#fff"
              />
              <path
                d="M15.25,26.79c-4.39,2.56-13,9.53-14.62,14.71,1.2-.21,1.82-.22,3.02-.42-.26.67-.34,1.54-.6,2.21.84-.12,1.68-.43,2.52-.55-.07.24.62,2.02.55,2.26,4.03-2.84,7.68-6.84,11.71-9.69"
                fill="none"
                stroke="#231815"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.26"
              />
              {/* 흔들리는 오른팔 — 어깨(26.36,30.32) 고정, 팔만 회전 */}
              <motion.g
                style={{
                  transformBox: 'view-box',
                  transformOrigin: '26.36px 30.32px',
                }}
                animate={{ rotate: [0, 30, 0, 30, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
              >
                <path
                  d="M26.36,30.32l20.29-13.18c2.37.14,1.31,2.17,1.31,2.17.75-.23,1.56-.15,1.81.6.25.75-.2,1.65-.94,1.91.51-.24.78-.19,1.46-.14.76.52.83,1.1.34,1.87-.49.77-1.46,1.06-2.15,1.66-7.43,6.43-16.45,10.56-21.06,11.13"
                  fill="#fff"
                />
                <path
                  d="M26.36,30.32l20.29-13.18c2.37.14,1.31,2.17,1.31,2.17.75-.23,1.56-.15,1.81.6.25.75-.2,1.65-.94,1.91.51-.24.78-.19,1.46-.14.76.52.83,1.1.34,1.87-.49.77-1.46,1.06-2.15,1.66-7.43,6.43-16.45,10.56-21.06,11.13"
                  fill="none"
                  stroke="#231815"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.26"
                />
              </motion.g>
              {/* 몸통 */}
              <path
                d="M28.02,27.64c2.08,5.78,4.65,15,5.92,20.7-6.19-.27-18.08.28-24.27.02.58-7.74,4.11-14.77,4.69-22.5"
                fill="#fff"
              />
              <path
                d="M28.02,27.64c2.08,5.78,4.65,15,5.92,20.7-6.19-.27-18.08.28-24.27.02.58-7.74,4.11-14.77,4.69-22.5"
                fill="none"
                stroke="#231815"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.26"
              />
              {/* 머리 흰 배경 */}
              <path
                d="M2.18,14.8c.65-1.24,1.57-1.84,2.81-1.29C6.12,6.42,12.59.81,21.97.81s15.28,5.24,16.66,12.01c1.2-.53,2.05-.03,2.74,1.13.82,1.37.58,3.24-.58,4.33-1.01.94-2.34,1.09-2.34,1.09-1.68,6.24-7.76,10.6-16.49,10.6s-14.54-4.07-16.49-9.99c-1.29.02-1.59-.18-2.67-1.09-1.23-1.02-1.38-2.68-.64-4.09"
                fill="#fff"
              />
              <path
                d="M2.18,14.8c.65-1.24,1.57-1.84,2.81-1.29C6.12,6.42,12.59.81,21.97.81s15.28,5.24,16.66,12.01c1.2-.53,2.05-.03,2.74,1.13.82,1.37.58,3.24-.58,4.33-1.01.94-2.34,1.09-2.34,1.09-1.68,6.24-7.76,10.6-16.49,10.6s-14.54-4.07-16.49-9.99c-1.29.02-1.59-.18-2.67-1.09-1.23-1.02-1.38-2.68-.64-4.09Z"
                fill="none"
                stroke="#231815"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.26"
              />
              {/* 오른눈 */}
              <path
                d="M29.59,16.24c0,1.06-.48,1.72-1.56,1.72s-1.55-.66-1.55-1.72.48-1.72,1.55-1.72,1.56.66,1.56,1.72"
                fill="#231815"
              />
              {/* 왼눈 */}
              <path
                d="M17.73,16.16c0,1.06-.48,1.72-1.56,1.72s-1.55-.66-1.55-1.72.48-1.72,1.55-1.72,1.56.66,1.56,1.72"
                fill="#231815"
              />
              {/* 코/입 */}
              <path
                d="M18.66,21.71c2.09-.08,4.17.1,6.26.02-.66,2.35-1.97,3.47-2.62,5.73-.07.25-.41.29-.54.06-1.25-2.21-2.03-3.26-3.28-5.55"
                fill="none"
                stroke="#231815"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.26"
              />
              {/* 머리카락 */}
              <path
                d="M20.63,7.79c-4.73,2.34-9.55,3.36-14.78,2.95C7.98,4.92,13.96.63,22.16.63c7.2,0,12.58,3.31,15.19,8.05-5.53,2.25-11.51,2.04-16.72-.88"
                fill="#d07741"
              />
              <path
                d="M20.63,7.79c-4.73,2.34-9.55,3.36-14.78,2.95C7.98,4.92,13.96.63,22.16.63c7.2,0,12.58,3.31,15.19,8.05-5.53,2.25-11.51,2.04-16.72-.88Z"
                fill="none"
                stroke="#231815"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.26"
              />
              {/* 눈 테두리 */}
              <path
                d="M20.68,15.92c1.33-.04,1.49.2,2.82.15M27.97,20.54c6.03-.4,5.32-9.7-1.23-8.15-3.95.93-3.68,8.48,1.23,8.15ZM16.11,20.12c7.07-.7,4.4-9.73-1.39-8.01-3.69,1.09-3.51,8.49,1.39,8.01Z"
                fill="none"
                stroke="#231815"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.26"
              />
            </g>
          </svg>
        </motion.div>

        {/* 말풍선 + 타이핑 텍스트 */}
        <motion.div
          className="flex-1 relative bg-white border-4 border-[#222] shadow-[4px_4px_0px_#222] rounded-sm px-4 py-3 ml-2"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={titleDone && visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
          transition={{ delay: 0.45, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* 말풍선 꼬리 */}
          <div className="absolute -left-2.5 top-4 w-0 h-0 border-8 border-transparent border-r-[#222]" />
          <div className="absolute -left-1.5 top-4.5 w-0 h-0 border-[6px] border-transparent border-r-white" />
          <p className="text-sm sm:text-base leading-relaxed text-gray-800 font-medium break-keep"
            style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
            <Typewriter
              text={speechText}
              speed={45}
              enabled={titleDone && visible}
            />
          </p>
        </motion.div>
        </div>{/* end flex-row */}
      </motion.div>
    </div>
  )
}
