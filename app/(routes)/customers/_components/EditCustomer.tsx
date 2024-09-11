import { useEffect, useState } from 'react'
import { useMutation } from 'convex/react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Doc } from '@/convex/_generated/dataModel'
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'

const EditCustomer = ({ customer }: { customer: Doc<'customers'> }) => {
  const [name, setName] = useState(customer.name)
  const [phone, setPhone] = useState(customer.phone)
  const updateCustomer = useMutation(api.documents.updateCustomer)

  useEffect(() => {
    setName(customer.name)
    setPhone(customer.phone)
  }, [customer])

  const handleSubmit = () => {
    updateCustomer({ id: customer._id, name, phone })
  }

  return (
    <div className='w-full flex flex-col gap-4 p-6'>
      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='name'>Mijoz ismi</Label>
        <Input
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='phone'>Mijoz raqami</Label>
        <Input
          id='phone'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div>Qarz: {new Intl.NumberFormat('en-US').format(customer.debt)}</div>
      <Button onClick={handleSubmit}>O'zgartirish</Button>
    </div>
  )
}

export default EditCustomer
