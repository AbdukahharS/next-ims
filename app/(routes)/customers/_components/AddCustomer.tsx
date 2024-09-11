'use client'

import { useState } from 'react'
import { useMutation } from 'convex/react'

import { api } from '@/convex/_generated/api'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const AddCustomer = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const createCustomer = useMutation(api.documents.createCustomer)
  const { toast } = useToast()

  const handleClick = () => {
    if (!name) {
      toast({
        title: "Iltimos, t'aminotchi ismini kiriting",
        variant: 'destructive',
      })
      return
    }

    createCustomer({ name, phone })

    setName('')
    setPhone('')
  }

  return (
    <div className='w-full flex flex-row p-2 border-t-2 gap-2'>
      <Input
        placeholder='Mijoz ismi'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Mijoz' telefoni"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <Button onClick={handleClick}>Yangi mijoz qo'shish</Button>
    </div>
  )
}

export default AddCustomer
