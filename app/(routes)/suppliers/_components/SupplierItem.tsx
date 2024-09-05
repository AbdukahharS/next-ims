'use client'

import { useState, useRef, useEffect } from 'react'
import { Check, Pencil } from 'lucide-react'
import { useMutation } from 'convex/react'

import { Id } from '@/convex/_generated/dataModel'
import { api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

interface SupplierItemProps {
  _id: Id<'suppliers'>
  i: number
  name: string
  phone: string
  activeId: string | null
  handleClick: (_id: Id<'suppliers'>) => void
}

const SupplierItem = ({
  _id,
  i,
  name,
  phone,
  activeId,
  handleClick,
}: SupplierItemProps) => {
  const [editing, setEditing] = useState(false)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const phoneInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const updateSupplier = useMutation(api.documents.updateSupplier)

  useEffect(() => {
    if (activeId !== _id) {
      setEditing(false)
    }
  }, [activeId, _id])

  const handleEdit = () => {
    setEditing(!editing)
  }

  const handleEditSubmit = () => {
    if (!nameInputRef.current || !phoneInputRef.current) return
    setEditing(false)
    const nameValue = nameInputRef.current.value
    const phoneValue = phoneInputRef.current.value
    if (nameValue === '') {
      toast({
        title: 'Xatolik',
        description: "Ta'minotchi ismini kiriting",
        variant: 'destructive',
      })
    }
    try {
      updateSupplier({ id: _id, name: nameValue, phone: phoneValue })
    } catch (error) {
      toast({
        title: 'Xatolik',
        description: "Ta'minotchi o'zgartirishda xatolik yuz berdi",
        variant: 'destructive',
      })
    }
  }

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
        {editing ? (
          <input
            className='w-full border-none bg-transparent px-2'
            type='text'
            defaultValue={name}
            ref={nameInputRef}
          />
        ) : (
          <div className='w-full truncate'>{name}</div>
        )}
      </div>
      <div className='flex items-center gap-2'>
        {editing ? (
          <input
            className='w-full border-none bg-transparent px-2'
            type='text'
            defaultValue={phone}
            ref={phoneInputRef}
          />
        ) : (
          <div className='text-foreground/60 truncate'>{phone}</div>
        )}
        {editing ? (
          <Button variant='ghost' size='sm' onClick={handleEditSubmit}>
            <Check className='h-4 w-4' />
          </Button>
        ) : (
          <Button variant='ghost' size='sm' onClick={handleEdit}>
            <Pencil className='h-4 w-4' />
          </Button>
        )}
      </div>
    </div>
  )
}

export default SupplierItem
