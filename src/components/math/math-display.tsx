import { useRef, useEffect } from 'react'
import { loadKatex } from '@/lib/katex-loader'
import { cn } from '@/lib/utils'

export function MathDisplay({
  tex,
  className,
  sizeClass = 'katex-formula',
}: {
  tex: string
  className?: string
  sizeClass?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const target = ref.current

    if (!target) return

    let cancelled = false

    void loadKatex()
      .then((katex) => {
        if (cancelled || !target.isConnected) return
        katex.render(tex, target, { throwOnError: false, displayMode: true })
      })
      .catch(() => {
        if (cancelled || !target.isConnected) return
        target.textContent = tex
      })

    return () => {
      cancelled = true
    }
  }, [tex])

  return <div ref={ref} className={cn('text-center', sizeClass, className)} />
}

export function MathInline({
  tex,
  className,
  katexFontSize,
}: {
  tex: string
  className?: string
  katexFontSize?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const target = ref.current

    if (!target) return

    let cancelled = false

    void loadKatex()
      .then((katex) => {
        if (cancelled || !target.isConnected) return

        katex.render(tex, target, { throwOnError: false, displayMode: false })
        const katexEl = target.querySelector('.katex') as HTMLElement | null

        if (katexEl) {
          if (katexFontSize) {
            katexEl.style.fontSize = katexFontSize
          } else {
            katexEl.style.removeProperty('font-size')
          }
        }
      })
      .catch(() => {
        if (cancelled || !target.isConnected) return
        target.textContent = tex
      })

    return () => {
      cancelled = true
    }
  }, [tex, katexFontSize])

  return <span ref={ref} className={cn('katex-inline', className)} />
}
