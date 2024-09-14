import { useQuery } from 'convex/react'

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import useIntake from '@/hooks/useIntake'
import { cn } from '@/lib/utils'

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
  const { addItem, products } = useIntake()
  const warehouseItem = useQuery(api.documents.getWarehouseWithProductId, {
    id: _id,
  })
  const folder = useQuery(api.documents.getCategory, { id: category })

  const handleClick = () => {
    let amount = Number(
      window.prompt(
        `${name} mahsulot miqdori(${unit === 'piece' ? 'dona' : unit}):`
      )
    )

    while (Number.isNaN(amount)) {
      amount = Number(window.prompt('Mahsulot miqdorini to`g`ri kiriting:'))
    }

    if (!amount) return

    addItem(_id, buyPrice, amount, unit, name, sellPrice, category)
  }
  return (
    <tr
      className={cn(
        'w-full h-8 cursor-pointer hover:bg-primary-foreground',
        products.some((p) => p.id === _id) && 'hidden'
      )}
      onClick={handleClick}
    >
      <td className='px-2'>{i + 1}</td>
      <td className='px-2'>
        <div className='w-full truncate'>{name}</div>
      </td>
      <td className='px-2'>
        <div className='w-full truncate'>{folder?.name}</div>
      </td>
      <td className='px-2'>
        <div className='text-foreground/60 truncate'>
          {new Intl.NumberFormat().format(buyPrice)}
        </div>
      </td>
      <td className='px-2'>
        <div className='text-foreground/60 truncate'>
          {new Intl.NumberFormat().format(sellPrice)}
        </div>
      </td>
      <td className='px-2'>
        <div className='text-foreground/60 truncate'>
          {warehouseItem?.amount || 0} {unit === 'piece' ? 'dona' : unit}
        </div>
      </td>
    </tr>
  )
}

export default ProductItem
