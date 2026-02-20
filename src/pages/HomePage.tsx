import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { semesters } from '@/data/curriculum'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { SemesterCard } from '@/components/dashboard/semester-card'

export default function HomePage() {
    const navigate = useNavigate()

    // Helper to group semesters by grade based on IDs assuming '1-1', '1-2' format
    const grades = [
        { title: '1학년', tag: '기초 과정', semesters: semesters.filter(s => s.id.startsWith('1-')) },
        { title: '2학년', tags: null, semesters: semesters.filter(s => s.id.startsWith('2-')) },
        { title: '3학년', tag: '심화 과정', semesters: semesters.filter(s => s.id.startsWith('3-')) },
    ]

    return (
        <DashboardLayout>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
            >
                {grades.map((grade, idx) => (
                    <section key={grade.title} className="px-1">
                        <div className="flex items-center justify-between mb-4 px-1">
                            <h2 className="text-lg font-extrabold text-text-light dark:text-text-dark font-display">
                                {grade.title}
                            </h2>
                            {grade.tag && (
                                <span className="text-[11px] font-bold text-muted-light dark:text-muted-dark bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-lg tracking-tight">
                                    {grade.tag}
                                </span>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-3.5">
                            {grade.semesters.map((sem, sIdx) => {
                                // Mock statuses for demonstration based on the provided HTML template
                                let status: 'completed' | 'active' | 'locked' | 'new' = 'locked'
                                let progress = 0

                                // Mock visual matching from template logic:
                                if (sem.id === '1-1') {
                                    status = 'completed'; progress = 100;
                                } else if (sem.id === '1-2') {
                                    status = 'active'; progress = 45;
                                } else if (sem.id === '2-1') {
                                    status = 'new'; progress = 5;
                                }

                                return (
                                    <motion.div
                                        key={sem.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3, delay: (idx * 0.1) + (sIdx * 0.1) }}
                                    >
                                        <SemesterCard
                                            id={sem.id}
                                            title={sem.title.replace('중학교 ', '')}
                                            subtitle={sem.id === '1-1' ? "소인수분해, 정수와 유리수" : sem.id === '2-1' ? "유리수와 순환소수" : "추가 단원 학습"}
                                            status={status}
                                            progress={progress}
                                            onClick={() => navigate(`/semester/${sem.id}`)}
                                        />
                                    </motion.div>
                                )
                            })}
                        </div>
                    </section>
                ))}
            </motion.div>
        </DashboardLayout>
    )
}
