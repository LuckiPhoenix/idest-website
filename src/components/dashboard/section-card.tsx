import { ArrowUpRight, TrendingDown, TrendingUp } from "lucide-react"

import { Badge } from "@/shared/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"
import { cn } from "@/modules/utils"

interface SectionCardsProps {
  title: string
  value: string
  trend: "up" | "down"
  trendValue: string
  clickable?: boolean
}

export function SectionCards(
  {
    title,
    value,
    trend,
    trendValue,
    clickable,
  }: SectionCardsProps
) {
  return (
      <Card className={cn("@container/card", clickable && "cursor-pointer")}>
        <CardHeader>
          <CardDescription>{title}</CardDescription>
          <CardTitle className="text-xl font-bold tabular-nums @[250px]/card:text-3xl flex flex-col gap-0.5">
            <span>{value}</span>
            {clickable && (
              <span className="inline-flex gap-1 items-center text-xs text-gray-700">
                See more <ArrowUpRight className="size-4" />
              </span>
            )}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="hidden sm:inline-flex">
              {trend === "up" ? <TrendingUp /> : <TrendingDown />}  
              {trendValue}  
            </Badge>
          </CardAction>
        </CardHeader>
        <div className="flex-1" />
        <CardFooter className="flex-col items-start gap-1.5 text-sm mt-auto">
          <div className="flex gap-2 font-medium line-clamp-1">
            {trend === "up" ? "Trending up this month" : "Trending down this month"}
            {trend === "up" ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
          </div>
        </CardFooter>

      </Card>
  )
}
