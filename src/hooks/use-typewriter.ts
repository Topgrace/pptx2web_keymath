import { useState, useEffect, useRef, useCallback } from 'react'

interface UseTypewriterOptions {
  text: string
  speed?: number
  enabled?: boolean
  onComplete?: () => void
}

export function useTypewriter({ text, speed = 40, enabled = true, onComplete }: UseTypewriterOptions) {
  const [displayed, setDisplayed] = useState('')
  const [isDone, setIsDone] = useState(false)
  const [showCursor, setShowCursor] = useState(false)
  const indexRef = useRef(0)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  const reset = useCallback(() => {
    indexRef.current = 0
    setDisplayed('')
    setIsDone(false)
    setShowCursor(false)
  }, [])

  useEffect(() => {
    if (!enabled || !text) return

    setShowCursor(true)
    indexRef.current = 0
    setDisplayed('')
    setIsDone(false)

    const interval = setInterval(() => {
      if (indexRef.current >= text.length) {
        clearInterval(interval)
        setShowCursor(false)
        setIsDone(true)
        onCompleteRef.current?.()
        return
      }
      indexRef.current++
      setDisplayed(text.slice(0, indexRef.current))
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed, enabled])

  return { displayed, isDone, showCursor, reset }
}
