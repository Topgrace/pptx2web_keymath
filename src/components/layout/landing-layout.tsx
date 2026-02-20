import type { ReactNode } from 'react'
import { BookOpen } from 'lucide-react'

interface LandingLayoutProps {
    children: ReactNode
}

export function LandingLayout({ children }: LandingLayoutProps) {
    return (
        <div className="min-h-screen bg-slate-50 flex justify-center font-sans tracking-tight selection:bg-indigo-100">
            <div className="w-full max-w-[480px] bg-white shadow-[0_0_40px_-10px_rgba(0,0,0,0.08)] flex flex-col relative overflow-hidden">

                {/* Header with high contrast, distinctive and premium academic look */}
                <header className="px-6 pt-12 pb-6 flex items-center gap-4 bg-white border-b border-slate-100">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-200 shrink-0">
                        <BookOpen className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1 className="text-[22px] font-extrabold text-slate-900 tracking-tight leading-none mb-1.5">
                            수학 정규 과정
                        </h1>
                        <p className="text-[13px] font-medium text-slate-500">
                            단계별로 확실하게 마스터하는 커리큘럼
                        </p>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 w-full flex flex-col relative pb-20">
                    {children}
                </main>
            </div>
        </div>
    )
}
