import { Id } from '@/convex/_generated/dataModel'
import useSale from '@/hooks/useSale'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface ProductItemProps {
  _id: Id<'warehouse'>
  supplier: Id<'suppliers'>
  name: string
  amount: number
  sellPrice: number
  i: number
  unit: 'piece' | 'm' | 'kg' | 'm2'
}

const ProductItem = ({
  _id,
  name,
  amount,
  sellPrice,
  i,
  unit,
}: ProductItemProps) => {
  const { addItem, products, customer } = useSale()
  const [minus, setMinus] = useState(0)

  useEffect(() => {
    if (products.length === 0) return setMinus(0)
    products.forEach((p) => {
      setMinus(0)
      if (p.id === _id) {
        return setMinus(p.amount)
      }
    })
  }, [products, _id])

  const handleClick = () => {
    if (!customer) return alert('Xaridor tanlanmagan')
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

    if (newAmount === 0) return

    addItem(_id, newAmount, unit, name, sellPrice)
  }
  return (
    <tr
      className={cn(
        'w-full h-8 cursor-pointer hover:bg-primary-foreground',
        amount === minus && 'hidden'
      )}
      onClick={handleClick}
    >
      <td className='px-2'>{i + 1}</td>
      <td className='px-2'>
        <div className='w-full truncate'>{name}</div>
      </td>
      <td className='px-2'>
        <div className='text-foreground/60 truncate'>
          {new Intl.NumberFormat().format(sellPrice)}
        </div>
      </td>
      <td className='px-2'>
        <div className='text-foreground/60 truncate'>
          {amount - minus} {unit === 'piece' ? 'dona' : unit}
        </div>
      </td>
    </tr>
  )
}

export default ProductItem
