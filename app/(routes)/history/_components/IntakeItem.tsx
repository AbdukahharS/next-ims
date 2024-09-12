import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { cn } from '@/lib/utils'
import { useQuery } from 'convex/react'

interface IntakeItemProps {
  _id: Id<'intakes'>
  totalBuyPrice: number
  i: number
  _creationTime: number
  handleClick: (_id: Id<'sales'> | Id<'intakes'>) => void
  active: Id<'sales'> | Id<'intakes'> | null
  products: {
    id: Id<'products'>
    name: string
    buyPrice: number
    unit: 'piece' | 'm' | 'kg' | 'm2'
    amount: number
  }[]
  supplier: Id<'suppliers'>
}

function formatDate(date: number) {
  const d = new Date(date)
  const day = d.getDate()
  const month = d.getMonth() + 1 // Months are zero-indexed
  const year = d.getFullYear()

  return `${day}.${month}.${year}`
}

const IntakeItem = ({
  _id,
  totalBuyPrice,
  products,
  _creationTime,
  i,
  handleClick,
  active,
  supplier,
}: IntakeItemProps) => {
  const supplierObj = useQuery(api.documents.getSupplier, { id: supplier })

  return (
    <tr
      className={cn(
        'w-full h-8 cursor-pointer hover:bg-primary-foreground',
        active === _id && 'bg-primary-foreground'
      )}
      onClick={() => handleClick(_id)}
    >
      <td className='px-2'>{i + 1}</td>
      <td className='px-2'>
        <div className='w-full truncate'>{supplierObj?.name}</div>
      </td>
      <td className='px-2'>
        <div className='text-foreground/60 truncate'>
          {formatDate(_creationTime)}
        </div>
      </td>
      <td className='px-2'>
        <div className='text-foreground/60 truncate'>
          {new Intl.NumberFormat('en-US').format(totalBuyPrice)}
        </div>
      </td>
    </tr>
  )
}

export default IntakeItem
