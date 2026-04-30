import { useTypewriter } from '@/hooks/use-typewriter'
import { cn } from '@/lib/utils'

export function Typewriter({
  text,
  speed = 40,
  enabled = true,
  onComplete,
  className,
}: {
  text: string
  speed?: number
  enabled?: boolean
  onComplete?: () => void
  className?: string
}) {
  const { displayed, showCursor } = useTypewriter({ text, speed, enabled, onComplete })
  const isMultiline = text.includes('\n')

  if (isMultiline) {
    const lines = displayed.split('\n')

    return (
      <span className={cn('block leading-[1.8]', className)}>
        {lines.map((line, index) => {
          const isLastLine = index === lines.length - 1

          return (
            <span
              key={index}
              className={cn(
                'block',
                index === 0
                  ? 'mb-2 text-center font-extrabold text-[#496AA3]'
                  : 'mt-1 font-bold text-[#4A5F7B]',
              )}
            >
              {line}
              {showCursor && isLastLine && (
                <span className="inline-block w-[2px] h-[1.1em] bg-slide-brown ml-[1px] align-text-bottom animate-tw-blink" />
              )}
            </span>
          )
        })}
      </span>
    )
  }

  return (
    <span className={cn(className)}>
      {displayed}
      {showCursor && (
        <span className="inline-block w-[2px] h-[1.1em] bg-slide-brown ml-[1px] align-text-bottom animate-tw-blink" />
      )}
    </span>
  )
}
