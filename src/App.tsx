import { Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import HomePage from '@/pages/HomePage';
import SemesterPage from '@/pages/SemesterPage';

const Unit5Page = lazy(() => import('@/pages/Unit5Page'))
const Unit6Page = lazy(() => import('@/pages/Unit6Page'))
const Unit7Page = lazy(() => import('@/pages/Unit7Page'))
const Unit8Page = lazy(() => import('@/pages/Unit8Page'))
const Unit9Page = lazy(() => import('@/pages/Unit9Page'))
const Unit10Page = lazy(() => import('@/pages/Unit10Page'))
const Unit11Page = lazy(() => import('@/pages/Unit11Page'))


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
        <Route path="/unit5" element={<Unit5Page />} />
        <Route path="/unit6" element={<Unit6Page />} />
        <Route path="/unit7" element={<Unit7Page />} />
        <Route path="/unit8" element={<Unit8Page />} />
        <Route path="/unit9" element={<Unit9Page />} />
        <Route path="/unit10" element={<Unit10Page />} />
        <Route path="/unit11" element={<Unit11Page />} />

        {/* Catch-all redirect to Dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
