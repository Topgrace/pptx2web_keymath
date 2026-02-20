import { Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import HomePage from '@/pages/HomePage';
import SemesterPage from '@/pages/SemesterPage';

const Unit5Page = lazy(() => import('@/pages/Unit5Page'))
const Unit6Page = lazy(() => import('@/pages/Unit6Page'))


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

        {/* Existing Interactive Unit Routes */}
        <Route path="/unit5" element={<Unit5Page />} />
        <Route path="/unit6" element={<Unit6Page />} />

        {/* Catch-all redirect to Dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
