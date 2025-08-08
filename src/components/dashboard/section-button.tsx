"use client"

import * as React from "react"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/modules/utils"
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
} from "@/shared/ui/card"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetFooter as DialogFooter,
} from "@/shared/ui/sheet"

type SheetSide = "top" | "right" | "bottom" | "left"

interface SectionButtonProps {
  /** Large title shown bottom-right inside the card */
  title: string
  /** Optional className to customize the card */
  className?: string
  /** Side from which the sheet appears */
  side?: SheetSide
  /** Optional title to render inside the sheet header (defaults to title) */
  sheetTitle?: string
  /** Optional description to render under the sheet title */
  sheetDescription?: string
  /** Content rendered inside the sheet */
  children?: React.ReactNode
}

export function SectionButton({
  title,
  className,
  side = "right",
  sheetTitle,
  sheetDescription,
  children,
}: SectionButtonProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card
          aria-label={title}
          className={cn(
            "overflow-hidden relative transition-colors cursor-pointer group border-accent/60",
            "bg-orange-50 hover:bg-orange-100 hover:border-accent",
            className
          )}
        >
          <CardHeader className="min-h-14">
            <CardAction>
              <ArrowUpRight className="size-5 text-accent-foreground transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </CardAction>
          </CardHeader>

          <CardFooter className="justify-start mt-auto">
            <div className="text-right">
              <div className="text-3xl font-extrabold tracking-tight leading-none text-orange-600 sm:text-l md:text-4xl">
                {title}
              </div>
            </div>
          </CardFooter>
        </Card>
      </SheetTrigger>

      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>{sheetTitle ?? title}</SheetTitle>
          {sheetDescription ? (
            <SheetDescription>{sheetDescription}</SheetDescription>
          ) : null}
        </SheetHeader>

        {children}

        <DialogFooter />
      </SheetContent>
    </Sheet>
  )
}

