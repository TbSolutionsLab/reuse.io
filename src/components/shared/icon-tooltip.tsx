import { InfoIcon } from "lucide-react"
import type { HTMLAttributes } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { cn } from "~/lib/utils"

  
  export const IconTooltip = ({
    Icon = InfoIcon,
    iconClassName,
    children,
  }: {
    Icon?: React.FC<React.SVGProps<SVGSVGElement>>
    iconClassName?: HTMLAttributes<HTMLDivElement>["className"]
    children: React.ReactNode
  }) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Icon className={cn("cursor-pointer", iconClassName)} />
          </TooltipTrigger>
          <TooltipContent>{children}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }