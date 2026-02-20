import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { semesters } from '@/data/curriculum'
import { SemesterLayout } from '@/components/layout/semester-layout'
import { CoursePath } from '@/components/course/course-path'

export default function SemesterPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const activeData = semesters.find(s => s.id === id)

    // Redirect safety
    if (!activeData) {
        return <Navigate to="/" replace />
    }

    // Configure visuals similar to what we did in SemesterCard
    const isGrade1 = id?.startsWith('1-');
    const bgClasses = isGrade1 ? "bg-blue-50 dark:bg-blue-900/10" : "bg-purple-50 dark:bg-purple-900/10";
    const accentClass = isGrade1 ? "bg-dashboard-primary" : "bg-purple-500";
    const fillPercent = isGrade1 ? "75%" : "5%";
    const icon = isGrade1 ? "calculate" : "timeline";

    // Hero Header Component defined inline to pass into SemesterLayout
    const heroHeader = (
        <div className="w-full">
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={() => navigate('/')}
                    className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-text-light dark:text-text-dark border border-gray-100 dark:border-gray-700 active:scale-95 transition-transform"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-xl font-extrabold font-display text-text-light dark:text-text-dark tracking-tight">
                    {activeData.title.replace('중학교 ', '')}
                </h1>
                <div className="w-10" /> {/* Spacer for centering */}
            </div>

            <div className="bg-card-light dark:bg-card-dark p-5 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 relative overflow-hidden">
                <div className={`absolute -right-4 -top-4 w-24 h-24 ${bgClasses} rounded-full opacity-50`} />
                <div className={`absolute right-12 bottom-0 w-16 h-16 ${isGrade1 ? 'bg-indigo-50 dark:bg-indigo-900/10' : 'bg-pink-50 dark:bg-pink-900/10'} rounded-full opacity-50`} />

                <div className="relative z-10 flex items-center space-x-4">
                    <div className={`w-16 h-16 ${isGrade1 ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-purple-50 dark:bg-purple-900/20'} rounded-xl flex items-center justify-center relative overflow-hidden flex-shrink-0`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                            {isGrade1 ? (
                                <>
                                    <div className="w-12 h-12 bg-blue-400 rounded-lg transform rotate-12 opacity-80" />
                                    <div className="w-12 h-12 bg-indigo-500 rounded-full absolute -ml-4 mt-4 opacity-80 mix-blend-multiply dark:mix-blend-screen" />
                                </>
                            ) : (
                                <>
                                    <div className="w-14 h-14 border-4 border-purple-400 rounded-full opacity-60" />
                                    <div className="w-1 bg-purple-500 h-16 absolute transform rotate-45 rounded-full" />
                                </>
                            )}
                            <span className="material-symbols-outlined text-white absolute text-3xl drop-shadow-md">{icon}</span>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                            <div>
                                <h2 className="text-lg font-bold text-text-light dark:text-text-dark">정규 진도</h2>
                                <p className="text-xs text-muted-light dark:text-muted-dark tracking-tight">총 {activeData.chapters.length}개 대단원</p>
                            </div>
                            <div className="text-right">
                                <span className={`text-2xl font-bold font-display tracking-tighter ${isGrade1 ? 'text-dashboard-primary' : 'text-purple-600'}`}>
                                    {fillPercent}
                                </span>
                            </div>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 mt-2 overflow-hidden">
                            <div className={`h-2 rounded-full shadow-glow transition-all duration-1000 ease-out ${accentClass}`} style={{ width: fillPercent }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <SemesterLayout header={heroHeader}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full relative"
                >
                    <CoursePath chapters={activeData.chapters} />
                </motion.div>
            </AnimatePresence>
        </SemesterLayout>
    )
}
