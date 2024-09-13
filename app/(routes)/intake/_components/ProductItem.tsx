import { Id } from '@/convex/_generated/dataModel'
import useIntake from '@/hooks/useIntake'

interface ProductItemProps {
  _id: Id<'products'>
  supplier: Id<'suppliers'>
  name: string
  buyPrice: number
  sellPrice: number
  i: number
  unit: 'piece' | 'm' | 'kg' | 'm2'
  category: Id<'categories'>
}

const ProductItem = ({
  _id,
  name,
  buyPrice,
  sellPrice,
  i,
  unit,
  category,
}: ProductItemProps) => {
  const { addItem } = useIntake()

  const handleClick = () => {
    let amount = Number(
      window.prompt(
        `${name} mahsulot miqdori(${unit === 'piece' ? 'dona' : unit}):`
      )
    )

    while (Number.isNaN(amount)) {
      amount = Number(window.prompt('Mahsulot miqdorini to`g`ri kiriting:'))
    }

    addItem(_id, buyPrice, amount, unit, name, sellPrice, category)
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
        <div className='text-foreground/60 truncate'>{sellPrice}</div>
      </td>
      <td className='px-2'>
        <div className='text-foreground/60 truncate'>
          {unit === 'piece' ? 'dona' : unit}
        </div>
      </td>
    </tr>
  )
}

export default ProductItem
