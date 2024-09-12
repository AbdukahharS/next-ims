import { Id } from '@/convex/_generated/dataModel'
import useSale from '@/hooks/useSale'

interface SaleItemProps {
  i: number
  name: string
  id: Id<'warehouse'>
  amount: number
  sellPrice: number
  unit: 'piece' | 'm' | 'kg' | 'm2'
}

const SaleItem = ({ id, name, amount, sellPrice, unit, i }: SaleItemProps) => {
  const { changeAmount } = useSale()

  const handleClick = () => {
    let newAmount = Number(
      window.prompt(
        `${name} mahsulot miqdorini o'zgartirish (${unit === 'piece' ? 'dona' : unit}):`,
        amount.toString()
      )
    )

    while (Number.isNaN(newAmount)) {
      newAmount = Number(
        window.prompt('Mahsulot miqdorini to`g`ri kiriting:', amount.toString())
      )
    }

    changeAmount(id, newAmount)
  }

  return (
    <tr
      className='w-full h-8 cursor-pointer hover:bg-primary-foreground'
      onClick={handleClick}
    >
      <td className='px-2'>{i + 1}</td>
      <td className='px-2'>
        <div className='w-full truncate'>{name}</div>
      </td>
      <td className='px-2'>
        <div className='text-foreground/60 truncate'>{sellPrice}</div>
      </td>
      <td>
        <div className='text-foreground/60 truncate'>
          {amount} {unit === 'piece' ? 'dona' : unit}
        </div>
      </td>
      <td>
        <div className='text-foreground/60 truncate'>{sellPrice * amount}</div>
      </td>
    </tr>
  )
}

export default SaleItem
