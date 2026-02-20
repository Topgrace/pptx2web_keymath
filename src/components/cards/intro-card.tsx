import type { ReactNode } from 'react'
import { useState } from 'react'
import { StepCard } from './step-card'
import { Typewriter } from '@/components/animations'
import { CharacterStagger } from '@/components/animations'

export function IntroCard({
  visible,
  characterImg,
  speechText,
  topicTitle,
  children,
}: {
  visible: boolean
  characterImg?: string
  speechText: string
  topicTitle: string
  children?: ReactNode
}) {
  const [speechDone, setSpeechDone] = useState(false)

  return (
    <StepCard visible={visible} className="text-center pt-10 pb-8 mt-6">
      {/* Character + Speech bubble */}
      <div className="flex items-start justify-center gap-3 mb-5">
        {characterImg && (
          <img
            src={characterImg}
            alt="캐릭터"
            className="w-14 h-[46px] shrink-0"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        )}
        <div className="bg-white rounded-2xl py-3 px-4 text-[15px] text-slide-brown leading-relaxed text-left relative shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
          <div className="absolute -left-2 top-3.5 w-0 h-0 border-[6px] border-transparent border-r-white" />
          <Typewriter
            text={speechText}
            speed={40}
            enabled={visible}
            onComplete={() => setSpeechDone(true)}
          />
        </div>
      </div>

      {/* Topic title with character stagger */}
      <div className="text-4xl font-extrabold text-slide-brown mt-2 tracking-tight">
        <CharacterStagger text={topicTitle} enabled={visible && speechDone} />
      </div>

      {/* Quiz area (deferred until speech done) */}
      {speechDone && children}
    </StepCard>
  )
}
