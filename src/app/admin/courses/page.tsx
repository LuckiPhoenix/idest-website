import { AdminFrame } from "@/components/dashboard/admin-frame"
import { SectionCards } from "@/components/dashboard/section-card"

export default function Page() {
  return (
    <AdminFrame
      activeMenuItem="Courses"
      pageTitle="Courses"
    >
      <div className="grid grid-cols-3 gap-4 py-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <SectionCards
          title="Total Revenue"
          value="$1,250.00"
          trend="up"
          trendValue="+12.5%"
        />
        <SectionCards
        title="Total Users"
        value="1,250"
        trend="down"
        trendValue="-2.5%"
      />
      <SectionCards
        title="Total Courses"
        value="40"
        trend="up"
        trendValue="+2.5%"
      />
      </div>
    </AdminFrame>
  )
}
    