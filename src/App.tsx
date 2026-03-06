import { Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import HomePage from '@/pages/HomePage';
import SemesterPage from '@/pages/SemesterPage';
import { unitPageRoutes } from '@/lib/unit-route-loaders'

const lazyUnitRoutes = unitPageRoutes.map(({ path, loader }) => ({
  path,
  Component: lazy(loader),
}))


function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg text-muted-foreground animate-pulse">로딩 중...</p>
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Dashboard Landing Page */}
        <Route path="/" element={<HomePage />} />

        {/* Semester Course Timeline */}
        <Route path="/semester/:id" element={<SemesterPage />} />

        {/* Interactive Unit Routes */}
        {lazyUnitRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}

        {/* Catch-all redirect to Dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
