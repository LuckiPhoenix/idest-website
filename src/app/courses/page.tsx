'use client'
import { ClassroomDashboard } from '@/components/courses/ClassroomDashboard'
import { Navbar } from '@/shared/components/navBar'

export default function DashboardPage() {
  return (
    <div>
        <Navbar />
      <ClassroomDashboard />
    </div>
  )
}