import { AppSidebar } from "@/components/dashboard/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb"
import { Separator } from "@/shared/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/ui/sidebar"
import { ReactNode } from "react"

interface AdminFrameProps {
  /** The active menu item to highlight in the sidebar */
  activeMenuItem: string
  /** The current page title for the breadcrumb */
  pageTitle: string
  /** Optional breadcrumb items before the current page */
  breadcrumbItems?: Array<{
    title: string
    href?: string
  }>
  /** Main content to render inside the frame */
  children?: ReactNode
}

export function AdminFrame({
  activeMenuItem,
  pageTitle,
  breadcrumbItems = [],
  children,
}: AdminFrameProps) {
  return (
    <SidebarProvider>
      <AppSidebar shouldActive={activeMenuItem} />
      <SidebarInset>
        <header className="flex gap-2 items-center h-16 border-b shrink-0">
          <div className="flex gap-2 items-center px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">
                    Idest
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbItems.map((item, index) => (
                  <>
                    <BreadcrumbSeparator key={`sep-${index}`} className="hidden md:block" />
                    <BreadcrumbItem key={item.title} className="hidden md:block">
                      {item.href ? (
                        <BreadcrumbLink href={item.href}>
                          {item.title}
                        </BreadcrumbLink>
                      ) : (
                        <span>{item.title}</span>
                      )}
                    </BreadcrumbItem>
                  </>
                ))}
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}