
import Link from 'next/link'
import { buttonVariants } from '~/components/ui/button'
import { cn } from '~/lib/utils'

export const CTA = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/our-collection"
      className={cn(
        className,
        buttonVariants({ variant: 'outline' }),
        'transition-duration-200 h-auto py-3 text-xl transition-[width,all] hover:shadow-lg hover:shadow-accent/70 text-black'
      )}>
      Explore our collection
    </Link>
  )
}