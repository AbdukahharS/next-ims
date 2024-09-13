import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { cn } from '@/lib/utils'
import { useQuery } from 'convex/react'

interface SaleItemProps {
  _id: Id<'sales'>
  totalSellPrice: number
  i: number
  _creationTime: number
  handleClick: (_id: Id<'sales'> | Id<'intakes'>) => void
  active: Id<'sales'> | Id<'intakes'> | null
  products: {
    id: Id<'warehouse'>
    name: string
    sellPrice: number
    unit: 'piece' | 'm' | 'kg' | 'm2'
    amount: number
  }[]
  payment: {
    card: number
    cash: number
  }
  customer: Id<'customers'>
}

const SaleItem = ({
  _id,
  totalSellPrice,
  products,
  _creationTime,
  i,
  handleClick,
  active,
  payment,
  customer,
}: SaleItemProps) => {
  const customerObj = useQuery(api.documents.getCustomer, { id: customer })

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
        <div className='w-full truncate'>{customerObj?.name}</div>
      </td>
      <td className='px-2'>
        <div className='text-foreground/60 truncate'>
          {new Intl.NumberFormat('en-US').format(totalSellPrice)}
        </div>
      </td>
      <td className='px-2'>
        <div className='text-foreground/60 truncate'>
          {new Intl.NumberFormat('en-US').format(payment.cash)}
        </div>
      </td>
      <td className='px-2'>
        <div className='text-foreground/60 truncate'>
          {new Intl.NumberFormat('en-US').format(payment.card)}
        </div>
      </td>
      <td className='px-2'>
        <div className='text-foreground/60 truncate'>
          {new Intl.NumberFormat('en-US').format(
            totalSellPrice - payment.cash - payment.card
          )}
        </div>
      </td>
    </tr>
  )
}

export default SaleItem
