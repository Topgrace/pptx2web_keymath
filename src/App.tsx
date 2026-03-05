import { Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import HomePage from '@/pages/HomePage';
import SemesterPage from '@/pages/SemesterPage';

const Page_2_1_u5 = lazy(() => import('@/pages/2-1-u5'))
const Page_2_1_u6 = lazy(() => import('@/pages/2-1-u6'))
const Page_2_1_u7 = lazy(() => import('@/pages/2-1-u7'))
const Page_2_1_u8 = lazy(() => import('@/pages/2-1-u8'))
const Page_2_1_u9 = lazy(() => import('@/pages/2-1-u9'))
const Page_2_1_u10 = lazy(() => import('@/pages/2-1-u10'))
const Page_2_1_u11 = lazy(() => import('@/pages/2-1-u11'))
const Page_1_1_ch1_intro = lazy(() => import('@/pages/1-1-ch1-intro'))
const Page_1_1_u1 = lazy(() => import('@/pages/1-1-u1'))
const Page_1_1_u2 = lazy(() => import('@/pages/1-1-u2'))
const Page_1_1_u3 = lazy(() => import('@/pages/1-1-u3'))
const Page_1_1_u4 = lazy(() => import('@/pages/1-1-u4'))


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
        <Route path="/unit5" element={<Page_2_1_u5 />} />
        <Route path="/unit6" element={<Page_2_1_u6 />} />
        <Route path="/unit7" element={<Page_2_1_u7 />} />
        <Route path="/unit8" element={<Page_2_1_u8 />} />
        <Route path="/unit9" element={<Page_2_1_u9 />} />
        <Route path="/unit10" element={<Page_2_1_u10 />} />
        <Route path="/unit11" element={<Page_2_1_u11 />} />
        <Route path="/ch1-intro" element={<Page_1_1_ch1_intro />} />
        <Route path="/1-1-u1" element={<Page_1_1_u1 />} />
        <Route path="/1-1-u2" element={<Page_1_1_u2 />} />
        <Route path="/1-1-u3" element={<Page_1_1_u3 />} />
        <Route path="/1-1-u4" element={<Page_1_1_u4 />} />

        {/* Catch-all redirect to Dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
