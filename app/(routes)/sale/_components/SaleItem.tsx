import { Id } from '@/convex/_generated/dataModel'
import useSale from '@/hooks/useSale'

interface IntakeItemProps {
  i: number
  name: string
  id: Id<'warehouse'>
  amount: number
  sellPrice: number
  unit: 'piece' | 'm' | 'kg' | 'm2'
  fraction?: {
    unit: 'm' | 'kg' | 'm2'
    wholeAmount: number
    amount: number
  }
}

const IntakeItem = ({
  id,
  name,
  amount,
  sellPrice,
  unit,
  i,
  fraction,
}: IntakeItemProps) => {
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

    let fractionAmount = 0
    if (fraction) {
      fractionAmount = Number(
        window.prompt(
          `Mahsulot bo'lak miqdori (${fraction.unit}):`,
          fractionAmount.toString()
        )
      )
      while (Number.isNaN(fractionAmount)) {
        fractionAmount = Number(
          window.prompt('Mahsulot miqdorini to`g`ri kiriting:')
        )
      }
    }

    changeAmount(id, newAmount, fractionAmount)
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
      <td className='px-2'>
        <div className='text-foreground/60 truncate'>
          {amount} {unit === 'piece' ? 'dona' : unit}{' '}
          {fraction ? `(${fraction.amount} ${fraction.unit})` : ''}
        </div>
      </td>
    </tr>
  )
}

export default IntakeItem
