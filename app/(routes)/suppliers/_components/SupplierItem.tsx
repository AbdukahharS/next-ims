'use client'

import { Pencil } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SupplierItemProps {
  _id: string
  i: number
  name: string
  phone: string
  activeId: string | null
  handleClick: (_id: string) => void
}

const SupplierItem = ({
  _id,
  i,
  name,
  phone,
  activeId,
  handleClick,
}: SupplierItemProps) => {
  return (
    <div
      className={cn(
        'w-full border-b-2 flex items-center justify-between relative gap-4',
        activeId === _id
          ? 'bg-slate-200/50 dark:bg-slate-800/50'
          : 'bg-background'
      )}
      onClick={() => handleClick(_id)}
    >
      <div className='flex items-center gap-3'>
        <div className='border-r w-10 px-1'>{i + 1}</div>
        <div className='text-lg truncate max-w-full'>{name}</div>
      </div>
      <div className='flex items-center gap-2'>
        <div className='text-foreground/60 truncate'>{phone}</div>
        <Button variant='ghost' size='sm'>
          <Pencil className='h-4 w-4' />
        </Button>
      </div>
    </div>
  )
}

export default SupplierItem
