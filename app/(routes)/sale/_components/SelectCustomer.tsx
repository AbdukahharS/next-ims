import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useQuery } from 'convex/react'

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
  const { setCustomer } = useSale()

  return (
    <div className='w-full border-b relative'>
      <Select onValueChange={(v) => setCustomer(v as Id<'customers'>)}>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Taminotchini tanlang' />
        </SelectTrigger>
        <SelectContent>
          {customers?.map((customer) => (
            <SelectItem value={customer._id} key={customer._id}>
              <div className='flex items-center gap-2 justify-between w-full'>
                <span>
                  {customer.name} ({customer.phone})
                </span>
                <span>{customer.debt}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectCustomer
