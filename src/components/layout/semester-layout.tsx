import type { ReactNode } from 'react'

interface SemesterLayoutProps {
    children: ReactNode
    header?: ReactNode
}

export function SemesterLayout({ children, header }: SemesterLayoutProps) {
    return (
        <div className="bg-background-light dark:bg-background-dark font-body antialiased transition-colors duration-300 min-h-screen flex justify-center">
            {/* The primary mobile container */}
            <div className="w-full max-w-[480px] min-h-screen relative pb-28 overflow-hidden bg-background-light dark:bg-background-dark shadow-2xl flex flex-col">


                {/* Sticky Header Content Slot */}
                {header && (
                    <header className="px-6 pt-2 pb-6 sticky top-0 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm z-20">
                        {header}
                    </header>
                )}

                {/* Scrollable Main Content */}
                <main className="px-6 space-y-6 flex-1 w-full relative">
                    {children}
                </main>

                {/* Fixed Bottom Action Floating Button ("이어서 학습하기") */}
                <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark z-30 max-w-[480px] mx-auto pointer-events-none">
                    <button className="w-full bg-dashboard-primary hover:bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-glow transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 pointer-events-auto">
                        <span className="material-symbols-outlined">play_circle</span>
                        <span className="text-base tracking-tight">이어서 학습하기</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
