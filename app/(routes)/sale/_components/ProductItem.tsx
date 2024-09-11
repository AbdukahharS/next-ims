import { Id } from '@/convex/_generated/dataModel'
import useSale from '@/hooks/useSale'

interface ProductItemProps {
  _id: Id<'warehouse'>
  supplier: Id<'suppliers'>
  name: string
  amount: number
  sellPrice: number
  i: number
  unit: 'piece' | 'm' | 'kg' | 'm2'
  fraction?: {
    unit: 'm' | 'kg' | 'm2'
    wholeAmount: number
    amount: number
  }
}

const ProductItem = ({
  _id,
  name,
  amount,
  sellPrice,
  i,
  unit,
  fraction,
}: ProductItemProps) => {
  const { addItem } = useSale()

  const handleClick = () => {
    let newAmount = Number(
      window.prompt(
        `${name} mahsulot miqdori(${unit === 'piece' ? 'dona' : unit}):`,
        '0'
      )
    )
    while (Number.isNaN(newAmount)) {
      newAmount = Number(window.prompt('Mahsulot miqdorini to`g`ri kiriting:'))
    }

    while (newAmount > amount) {
      newAmount = Number(
        window.prompt('Mahsulot miqdorini ombordagidan oshmasligi kerak:')
      )
    }
    let fractionAmount = 0
    if (fraction) {
      fractionAmount = Number(
        window.prompt(`Mahsulot bo'lak miqdori (${fraction.unit}):`, '0')
      )
      while (Number.isNaN(fractionAmount)) {
        fractionAmount = Number(
          window.prompt('Mahsulot miqdorini to`g`ri kiriting:')
        )
      }
    }

    const fractionData = fraction
      ? {
          amount: fractionAmount,
          unit: fraction.unit,
          wholeAmount: fraction.wholeAmount,
        }
      : undefined
    addItem(_id, newAmount, unit, name, sellPrice, fractionData)
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
          {fraction?.amount ? `(${fraction.amount} ${fraction.unit})` : ''}
        </div>
      </td>
    </tr>
  )
}

export default ProductItem
