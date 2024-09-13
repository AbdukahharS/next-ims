'use client'

import Link from 'next/link'
import { Banknote, Warehouse } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

const Navbar = () => {
  const pathname = usePathname()

  const getLinkClasses = (path: string) =>
    pathname === path
      ? 'underline' // Active link styles
      : ''

  return (
    <nav className='bg-accent h-10 fixed top-0 w-full flex flex-row gap-2 items-center border-b'>
      <Button asChild variant='link'>
        <Link
          href='/mobile/warehouse'
          className={getLinkClasses('/mobile/warehouse')}
        >
          <Warehouse className='mr-2 h-6 w-6' />
          <span className='text-lg'>Ombor</span>
        </Link>
      </Button>
      <Separator className='h-6 w-px bg-accent-foreground' />

      <Button asChild variant='link'>
        <Link
          href='/mobile/moneyentry'
          className={getLinkClasses('/mobile/moneyentry')}
        >
          <Banknote className='mr-2 h-6 w-6' />
          <span className='text-lg'>Pul kiritish</span>
        </Link>
      </Button>
    </nav>
  )
}

export default Navbar
