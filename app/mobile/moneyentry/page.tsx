'use client'

import { useState } from 'react'
import { useMutation, useQuery } from 'convex/react'

import { Id } from '@/convex/_generated/dataModel'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { api } from '@/convex/_generated/api'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

const Page = () => {
  const customers = useQuery(api.documents.getCustomers)
  const getTodaySale = useMutation(api.documents.getSalesOfCustomerToday)
  const updateSalePayment = useMutation(api.documents.updateSalePayment)
  const createSale = useMutation(api.documents.perfornmSale)
  const updateCustomer = useMutation(api.documents.updateCustomer)
  const [customer, setCustomer] = useState<Id<'customers'> | null>(null)

  const { toast } = useToast()
  const [cash, setCash] = useState(0)
  const [card, setCard] = useState(0)

  const handleSubmit = async () => {
    if (!customer) {
      toast({ title: 'Mijozni tanlang', variant: 'destructive' })
      return
    }
    if (!cash && !card) {
      toast({
        title: 'Naqd yoki plastik summani kiriting',
        variant: 'destructive',
      })
      return
    }

    try {
      const now = new Date()
      const midnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0,
        0
      )
      const midnightTimestamp = midnight.getTime()

      const todaySale = await getTodaySale({
        customer: customer as Id<'customers'>,
        localDayStart: midnightTimestamp,
      })

      if (!!todaySale) {
        await updateSalePayment({
          _id: todaySale._id,
          payment: {
            cash: todaySale.payment.cash + cash,
            card: todaySale.payment.card + card,
          },
        })
      } else {
        await createSale({
          customer: customer as Id<'customers'>,
          products: [],
          totalSellPrice: 0,
          payment: {
            cash,
            card,
          },
        })
      }

      await updateCustomer({
        id: customer as Id<'customers'>,
        debt:
          (customers?.find((c) => c._id === customer)?.debt || 0) - cash - card,
      })

      setCustomer(null)
      setCash(0)
      setCard(0)

      toast({
        title: 'Pul kiritildi',
      })
    } catch (error) {
      toast({ title: 'Xatolik yuz berdi', variant: 'destructive' })
    }
  }

  return (
    <div className='w-full flex justify-between py-20 px-8 flex-col gap-4'>
      <h1 className='text-2xl font-bold'>Mijoz uchun pul kirimi</h1>
      <Select
        onValueChange={(v: Id<'customers'>) => setCustomer(v)}
        value={customer?.toString() || ''}
      >
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Mijozni tanlang' />
        </SelectTrigger>
        <SelectContent>
          {customers?.map((customer) => (
            <SelectItem value={customer._id} key={customer._id}>
              <div className='flex items-center gap-2 justify-between w-full'>
                <span>
                  {customer.name} ({customer.phone})
                </span>
                <span>
                  {new Intl.NumberFormat('en-US').format(customer.debt)}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div>
        <Label>Naqd:</Label>
        <Input
          value={cash}
          onChange={(e) => setCash(Number(e.target.value))}
          type='number'
        />
      </div>
      <div>
        <Label>Karta:</Label>
        <Input
          value={card}
          onChange={(e) => setCard(Number(e.target.value))}
          type='number'
        />
      </div>
      <Button onClick={handleSubmit}>Yuborish</Button>
    </div>
  )
}

export default Page
