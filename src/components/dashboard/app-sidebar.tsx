import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/shared/ui/sidebar"
import Link from "next/link"
import Image from "next/image"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/general",
      items: [
        {
          title: "General",
          url: "/admin/general",
        },
      ],
    },
    {
      title: "Classroom",
      url: "/admin/classroom",
      items: [
        {
          title: "Courses",
          url: "/admin/courses",
        },
        {
          title: "Meetings",
          url: "/admin/meetings",
        },
        {
          title: "Assignments",
          url: "/admin/assignments",
        },
      ],
    },
    {
      title: "Human Resources",
      url: "#",
      items: [
        {
          title: "Teachers",
          url: "/admin/teachers",
        },
        {
          title: "Students",
          url: "/admin/students",
        },
        {
          title: "All Users",
          url: "/admin/users",
        },
      ],
    },
    {
      title: "Materials",
      url: "#",
      items: [

        {
          title: "Listening",
          url: "/admin/listening",
        },
        {
          title: "Reading",
          url: "/admin/reading",
        },
        {
          title: "Writing",
          url: "/admin/writing",
        },
        {
          title: "Speaking",
          url: "/admin/speaking",
        },
      ],
    },
    {
      title: "Community",
      url: "#",
      items: [
        {
          title: "Feedbacks",
          url: "/admin/feedbacks",
        },
      ],
    },
  ],
}

export function AppSidebar({ shouldActive, ...props }: React.ComponentProps<typeof Sidebar> & { shouldActive: string }) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <Image src="/logo.png" alt="Idest" width={32} height={32} />
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="text-lg font-bold">Idest</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={shouldActive === item.title}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
