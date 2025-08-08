import { AdminFrame } from "@/components/dashboard/admin-frame"
import { SectionButton } from "@/components/dashboard/section-button"
import { SectionCards } from "@/components/dashboard/section-card"
import { TeacherProfileForm } from "@/components/dashboard/teacher-profile-form"

export default function Page() {
  return (
    <AdminFrame
      activeMenuItem="Teachers"
      pageTitle="Teachers"
    >
        <div className="grid grid-cols-3 gap-4 py-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <SectionCards
        title="Total Teachers"
        value="10"
        trend="up"
        trendValue="+2.5%"
      />
      <SectionCards
        title="Teacher Applications"
        value="2"
        trend="down"
        trendValue="-25%"
        clickable={true}
      />
      <SectionButton
        title="Create New Profile"
        sheetTitle="New Teacher Profile"
        sheetDescription="Input the teacher's information"
        side="right"
      >
        <TeacherProfileForm />
      </SectionButton>
        </div>


    </AdminFrame>
  )
}
