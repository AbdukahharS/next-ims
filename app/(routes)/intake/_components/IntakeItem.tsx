import { Id } from '@/convex/_generated/dataModel'
import useIntake from '@/hooks/useIntake'

interface IntakeItemProps {
  i: number
  name: string
  id: Id<'products'>
  amount: number
  buyPrice: number
  unit: 'piece' | 'm' | 'kg' | 'm2'
}

const IntakeItem = ({
  id,
  name,
  amount,
  buyPrice,
  unit,
  i,
}: IntakeItemProps) => {
  const { changeAmount } = useIntake()

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
        <div className='text-foreground/60 truncate'>{buyPrice}</div>
      </td>
      <td className='px-2'>
        <div className='text-foreground/60 truncate'>
          {amount} {unit === 'piece' ? 'dona' : unit}
        </div>
      </td>
    </tr>
  )
}

export default IntakeItem
