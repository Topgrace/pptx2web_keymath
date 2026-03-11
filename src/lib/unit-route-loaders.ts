import type { ComponentType } from 'react'
import { preloadKatex } from '@/lib/katex-loader'

export const INTRO_ALIAS_PATH = '/1-1-ch1-intro'
export const INTRO_CANONICAL_PATH = '/ch1-intro'

type UnitPageModule = {
  default: ComponentType
}

export type UnitRouteLoader = () => Promise<UnitPageModule>

export function normalizeUnitPath(path: string): string {
  const normalized = path.replace(/\/+$/, '') || '/'
  if (normalized === INTRO_ALIAS_PATH) return INTRO_CANONICAL_PATH
  return normalized
}

export const unitRouteLoaders = {
  '/unit5': () => import('@/pages/2-1-u5'),
  '/unit6': () => import('@/pages/2-1-u6'),
  '/unit7': () => import('@/pages/2-1-u7'),
  '/unit8': () => import('@/pages/2-1-u8'),
  '/unit9': () => import('@/pages/2-1-u9'),
  '/unit10': () => import('@/pages/2-1-u10'),
  '/unit11': () => import('@/pages/2-1-u11'),
  '/ch1-intro': () => import('@/pages/1-1-ch1-intro'),
  '/1-1-u1': () => import('@/pages/1-1-u1'),
  '/1-1-u2': () => import('@/pages/1-1-u2'),
  '/1-1-u3': () => import('@/pages/1-1-u3'),
  '/1-1-u4': () => import('@/pages/1-1-u4'),
  '/1-1-u5': () => import('@/pages/1-1-u5'),
  '/1-1-u6': () => import('@/pages/1-1-u6'),
  '/1-1-u7': () => import('@/pages/1-1-u7'),
  '/1-1-u8': () => import('@/pages/1-1-u8'),
} satisfies Record<string, UnitRouteLoader>

export const unitPageRoutes = [
  { path: '/unit5', loader: unitRouteLoaders['/unit5'] },
  { path: '/unit6', loader: unitRouteLoaders['/unit6'] },
  { path: '/unit7', loader: unitRouteLoaders['/unit7'] },
  { path: '/unit8', loader: unitRouteLoaders['/unit8'] },
  { path: '/unit9', loader: unitRouteLoaders['/unit9'] },
  { path: '/unit10', loader: unitRouteLoaders['/unit10'] },
  { path: '/unit11', loader: unitRouteLoaders['/unit11'] },
  { path: '/ch1-intro', loader: unitRouteLoaders['/ch1-intro'] },
  { path: '/1-1-u1', loader: unitRouteLoaders['/1-1-u1'] },
  { path: '/1-1-u2', loader: unitRouteLoaders['/1-1-u2'] },
  { path: '/1-1-u3', loader: unitRouteLoaders['/1-1-u3'] },
  { path: '/1-1-u4', loader: unitRouteLoaders['/1-1-u4'] },
  { path: '/1-1-u5', loader: unitRouteLoaders['/1-1-u5'] },
  { path: '/1-1-u6', loader: unitRouteLoaders['/1-1-u6'] },
  { path: '/1-1-u7', loader: unitRouteLoaders['/1-1-u7'] },
  { path: '/1-1-u8', loader: unitRouteLoaders['/1-1-u8'] },
] as const

const preloadedUnitPaths = new Set<string>()

export async function preloadUnitRoute(path: string): Promise<void> {
  const normalizedPath = normalizeUnitPath(path)
  const loader = unitRouteLoaders[normalizedPath as keyof typeof unitRouteLoaders]

  if (!loader || preloadedUnitPaths.has(normalizedPath)) return

  preloadedUnitPaths.add(normalizedPath)
  preloadKatex()

  try {
    await loader()
  } catch (error) {
    preloadedUnitPaths.delete(normalizedPath)
    throw error
  }
}
