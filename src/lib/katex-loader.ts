type KatexModule = typeof import('katex')
type KatexInstance = KatexModule['default']

let katexPromise: Promise<KatexInstance> | null = null

export function loadKatex(): Promise<KatexInstance> {
  if (!katexPromise) {
    katexPromise = import('katex').then((module) => module.default)
  }

  return katexPromise
}

export function preloadKatex(): void {
  void loadKatex()
}
