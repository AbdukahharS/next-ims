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
import useSale from '@/hooks/useSale'

const SelectCustomer = () => {
  const customers = useQuery(api.documents.getCustomers)
  const getTodaySale = useMutation(api.documents.getSalesOfCustomerToday)
  const { setCustomer, customer, setSale } = useSale()

  const handleSelectCustomer = async (v: string) => {
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
      customer: v as Id<'customers'>,
      localDayStart: midnightTimestamp,
    })

    if (!!todaySale) {
      setSale({
        customer: v as Id<'customers'>,
        products: todaySale.products,
        totalSellPrice: todaySale.totalSellPrice,
        payment: todaySale.payment,
      })
    } else {
      setCustomer(v as Id<'customers'>)
    }
  }

  return (
    <div className='w-full border-b relative'>
      <Select
        onValueChange={handleSelectCustomer}
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
                <span>{new Intl.NumberFormat().format(customer.debt)}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectCustomer
