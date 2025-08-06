'use client'

import React from 'react'
import { Button } from '@/shared/ui/button'
import { Card, CardContent } from '@/shared/ui/card'
import { Calendar } from '@/shared/ui/calendar'
import { Skeleton } from '@/shared/ui/skeleton'
import { ChevronDown, Plus, User, X } from 'lucide-react'
import { useClassrooms } from '@/shared/hooks/useClassrooms'
import { useProfile } from '@/shared/hooks/useProfile'
import { ClassListItem } from '@/modules/class/types'
import { Role } from '@/shared/types/role.enum'

// Background colors array for rotating card colors
const backgroundColors = [
  'bg-yellow-100',
  'bg-green-100', 
  'bg-blue-100',
  'bg-red-100'
]

// Mock assignment data as specified
const mockAssignments = [
  { title: 'Essay', date: 'Apr 28' },
  { title: 'Problem Set', date: 'Apr 28' }
]

const ClassroomCard: React.FC<{ classroom: ClassListItem; index: number }> = ({ 
  classroom, 
  index 
}) => {
  const bgColor = backgroundColors[index % backgroundColors.length]
  
  return (
    <Card className={`p-4 rounded-lg ${bgColor}`}>
      <CardContent className="p-0">
        <h3 className="mb-1 text-sm font-bold">{classroom.name}</h3>
        <p className="overflow-hidden mb-2 text-xs text-gray-600 text-ellipsis">
          {classroom.description}
        </p>
        <p className="mb-1 text-xs text-gray-700">
          {classroom.creator.full_name}
        </p>
        <p className="text-xs text-gray-600">
          {classroom._count.members} students
        </p>
      </CardContent>
    </Card>
  )
}

const ClassroomsSkeleton: React.FC = () => (
  <div className="grid grid-cols-2 gap-3">
    {[...Array(4)].map((_, i) => (
      <Card key={i} className="p-4">
        <CardContent className="p-0 space-y-2">
          <Skeleton className="w-3/4 h-4" />
          <Skeleton className="w-full h-3" />
          <Skeleton className="w-2/3 h-3" />
          <Skeleton className="w-1/2 h-3" />
        </CardContent>
      </Card>
    ))}
  </div>
)

const AssignmentCard: React.FC<{ title: string; date: string }> = ({ 
  title, 
  date 
}) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-sm font-medium">{title}</span>
    <span className="text-sm text-gray-500">{date}</span>
  </div>
)

const StudentProfileBanner: React.FC<{ onDismiss: () => void }> = ({ onDismiss }) => (
  <div className="p-4 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
    <div className="flex justify-between items-start">
      <div className="flex gap-3 items-start">
        <div className="flex justify-center items-center w-10 h-10 bg-blue-100 rounded-full">
          <User className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="mb-1 text-sm font-semibold text-blue-900">
            Complete Your Student Profile
          </h3>
          <p className="mb-3 text-sm text-blue-700">
            Set up your student profile to track your IELTS progress, join classes, and access personalized learning materials.
          </p>
          <Button 
            size="sm" 
            className="text-white bg-blue-600 hover:bg-blue-700"
            asChild
          >
            <a href="/auth/student">Create Student Profile</a>
          </Button>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onDismiss}
        className="text-blue-500 hover:text-blue-700 hover:bg-blue-100"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  </div>
)

export const ClassroomDashboard: React.FC = () => {
  const { classrooms, isLoading } = useClassrooms()
  const { user, hasStudentProfile, isAuthenticated } = useProfile()
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())
  const [bannerDismissed, setBannerDismissed] = React.useState(false)

  const canCreateClass = user && (user.role === Role.TEACHER || user.role === Role.ADMIN)
  const shouldShowBanner = isAuthenticated && !hasStudentProfile && !bannerDismissed

  return (
    <div className="p-4 pt-6 min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl">
        {/* Student Profile Banner */}
        {shouldShowBanner && (
          <StudentProfileBanner onDismiss={() => setBannerDismissed(true)} />
        )}
        
        {/* Mobile-first responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
          
          {/* Left Column - Courses */}
          <div className="space-y-4">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
              <h1 className="text-xl font-bold">Courses</h1>
              <div className="flex flex-wrap gap-2">
                {canCreateClass && (
                  <Button size="sm" variant="outline" className="flex gap-1 items-center">
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Create Class</span>
                    <span className="sm:hidden">Create</span>
                  </Button>
                )}
                <Button size="sm" variant="default">
                  <span className="hidden sm:inline">Join new class</span>
                  <span className="sm:hidden">Join</span>
                </Button>
              </div>
            </div>
            
            {/* Classrooms Grid */}
            {isLoading ? (
              <ClassroomsSkeleton />
            ) : classrooms.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                No classes yet
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {classrooms.map((classroom, index) => (
                  <ClassroomCard 
                    key={classroom.id} 
                    classroom={classroom} 
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Assignments & Calendar */}
          <div className="space-y-6">
            
            {/* Assignments Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Assignments</h2>
              
              <Card className="p-4">
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {mockAssignments.map((assignment, index) => (
                      <AssignmentCard
                        key={index}
                        title={assignment.title}
                        date={assignment.date}
                      />
                    ))}
                  </div>
                  
                  {/* Show more button */}
                  <div className="flex justify-center mt-3">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex gap-1 items-center text-sm"
                    >
                      Show more
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Calendar Section */}
            <div className="space-y-4">
              <Card className="p-4">
                <CardContent className="p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="w-full"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}