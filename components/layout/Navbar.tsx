'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  ChartNoAxesCombined,
  Download,
  Factory,
  History,
  ShoppingBag,
  UsersRound,
  Warehouse,
} from 'lucide-react'
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
      <Link href='/'>
        <Image src='/icons/icon.svg' width={46} height={46} alt='Logo' />
      </Link>
      <Separator className='h-6 w-px bg-accent-foreground' />

      {/* <Button asChild variant='link'>
        <Link href='/warehouse' className={getLinkClasses('/warehouse')}>
          <Warehouse className='mr-2 h-6 w-6' />
          <span className='text-lg'>Ombor</span>
        </Link>
      </Button>
      <Separator className='h-6 w-px bg-accent-foreground' /> */}

      <Button asChild variant='link'>
        <Link href='/sale' className={getLinkClasses('/sale')}>
          <ShoppingBag className='mr-2 h-6 w-6' />
          <span className='text-lg'>Savdo</span>
        </Link>
      </Button>
      <Separator className='h-6 w-px bg-accent-foreground' />

      <Button asChild variant='link'>
        <Link href='/customers' className={getLinkClasses('/customers')}>
          <UsersRound className='mr-2 h-6 w-6' />
          <span className='text-lg'>Mijozlar</span>
        </Link>
      </Button>
      <Separator className='h-6 w-px bg-accent-foreground' />

      <Button asChild variant='link'>
        <Link href='/suppliers' className={getLinkClasses('/suppliers')}>
          <Factory className='mr-2 h-6 w-6' />
          <span className='text-lg'>Ta'minotchilar</span>
        </Link>
      </Button>
      <Separator className='h-6 w-px bg-accent-foreground' />

      <Button asChild variant='link'>
        <Link href='/intake' className={getLinkClasses('/intake')}>
          <Download className='mr-2 h-6 w-6' />
          <span className='text-lg'>Ta'minot kirimi</span>
        </Link>
      </Button>
      <Separator className='h-6 w-px bg-accent-foreground' />

      <Button asChild variant='link'>
        <Link href='/history' className={getLinkClasses('/history')}>
          <History className='mr-2 h-6 w-6' />
          <span className='text-lg'>Kirim-chiqim tarixi</span>
        </Link>
      </Button>
      <Separator className='h-6 w-px bg-accent-foreground' />

      <Button asChild variant='link'>
        <Link href='/statistics' className={getLinkClasses('/statistics')}>
          <ChartNoAxesCombined className='mr-2 h-6 w-6' />
          <span className='text-lg'>Statistika</span>
        </Link>
      </Button>
    </nav>
  )
}

export default Navbar
