import { Doc, Id } from '@/convex/_generated/dataModel'
import { cn } from '@/lib/utils'

interface CustomerItemProps {
  _id: Id<'customers'>
  name: string
  phone: string
  debt: number
  i: number
  _creationTime: number
  handleClick: (_id: Doc<'customers'>) => void
  active: Doc<'customers'> | null
}

const CustomerItem = ({
  _id,
  name,
  phone,
  debt,
  _creationTime,
  i,
  handleClick,
  active,
}: CustomerItemProps) => {
  return (
    <tr
      className={cn(
        'w-full h-8 cursor-pointer hover:bg-primary-foreground',
        active?._id === _id && 'bg-primary-foreground'
      )}
      onClick={() => handleClick({ _id, name, phone, debt, _creationTime })}
    >
      <td className='px-2'>{i + 1}</td>
      <td className='px-2'>
        <div className='w-full truncate'>{name}</div>
      </td>
      <td className='px-2'>
        <div className='text-foreground/60 truncate'>{phone}</div>
      </td>
      <td className='px-2'>
        <div className='text-foreground/60 truncate'>
          {new Intl.NumberFormat('en-US').format(debt)}
        </div>
      </td>
    </tr>
  )
}

export default CustomerItem
