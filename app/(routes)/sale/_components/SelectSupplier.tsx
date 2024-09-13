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

const SelectSupplier = ({
  setSupplier,
  supplier,
}: {
  setSupplier: (supplier: Id<'suppliers'> | null) => void
  supplier: Id<'suppliers'> | null
}) => {
  const suppliers = useQuery(api.documents.getSuppliers)

  return (
    <div className='w-full border-b relative'>
      <Select
        onValueChange={(v) => setSupplier(v as Id<'suppliers'>)}
        value={supplier?.toString() || ''}
      >
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Taminotchini tanlang' />
        </SelectTrigger>
        <SelectContent>
          {suppliers?.map((supplier) => (
            <SelectItem value={supplier._id} key={supplier._id}>
              {supplier.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectSupplier
