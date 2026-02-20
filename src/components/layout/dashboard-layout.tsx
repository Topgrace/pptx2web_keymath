import type { ReactNode } from 'react'
import { BottomNav } from './bottom-nav'

interface DashboardLayoutProps {
    children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-black font-body antialiased transition-colors duration-300 flex justify-center">
            {/* The primary mobile container */}
            <div className="w-full max-w-[480px] min-h-screen relative overflow-hidden bg-background-light dark:bg-background-dark shadow-2xl flex flex-col">


                {/* Header Area */}
                <header className="px-6 pt-3 pb-8 shrink-0 z-10 bg-background-light">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-dashboard-primary to-dashboard-secondary rounded-[18px] flex items-center justify-center shadow-glow transform -rotate-[8deg]">
                            <span className="material-icons-round text-white text-[32px]">functions</span>
                        </div>
                        <div className="pt-1.5">
                            <h1 className="text-2xl font-extrabold font-display text-text-light dark:text-text-dark tracking-tight leading-none mb-1">
                                중학교 수학
                            </h1>
                            <p className="text-muted-light dark:text-muted-dark text-[13px] font-medium">
                                수학 실력을 튼튼하게 다져보세요
                            </p>
                        </div>
                    </div>

                    {/* Progress Card */}
                    <div className="bg-card-light dark:bg-card-dark p-4 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-end mb-2">
                            <div>
                                <span className="text-[10px] font-extrabold text-dashboard-primary uppercase tracking-wider">전체 진행률</span>
                                <div className="text-[17px] font-extrabold text-text-light dark:text-text-dark font-display leading-tight mt-0.5">마스터 레벨 2</div>
                            </div>
                            <span className="text-[26px] font-bold font-display text-dashboard-primary tracking-tight leading-none">32%</span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden mt-3">
                            <div className="bg-dashboard-primary h-2 rounded-full w-[32%] transition-all duration-1000 ease-out"></div>
                        </div>
                    </div>
                </header>

                {/* Scrollable Content (Scroll wrapper for the dynamic pages) */}
                <main className="flex-1 w-full overflow-y-auto overflow-x-hidden relative pb-[120px] no-scrollbar">
                    {children}
                </main>

                {/* Fixed Bottom Navigation */}
                <BottomNav />
            </div>
        </div>
    )
}
