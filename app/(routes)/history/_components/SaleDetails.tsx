import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import React from 'react'

function formatDate(date: number) {
  const d = new Date(date)
  const day = d.getDate()
  const month = d.getMonth() + 1 // Months are zero-indexed
  const year = d.getFullYear()

  return `${day}.${month}.${year}`
}

interface Props {
  active: Id<'sales'> | Id<'intakes'> | null
}

const SaleDetails = ({ active }: Props) => {
  if (!active) return <div>SaleDetails</div>
  const sale = useQuery(api.documents.getSale, { id: active as Id<'sales'> })
  const customer = useQuery(api.documents.getCustomer, {
    id: sale?.customer as Id<'customers'>,
  })
  return (
    <div className='w-full p-6'>
      <h1 className='text-3xl'>Savdo tafsilotlari</h1>
      <p>Mijoz: {customer?.name}</p>
      <p>Sana: {formatDate(sale?._creationTime as number)}</p>
      <p>
        Naqd:{' '}
        {new Intl.NumberFormat('en-US').format(sale?.payment?.cash as number)}{' '}
        <br />
        Karta:{' '}
        {new Intl.NumberFormat('en-US').format(sale?.payment?.card as number)}
      </p>
      <p>
        Jami summa:{' '}
        {new Intl.NumberFormat('en-US').format(sale?.totalSellPrice as number)}
      </p>
      <table className='w-full overflow-y-auto table-auto mt-4'>
        <thead>
          <tr>
            <th>No</th>
            <th>Mahsulot nomi</th>
            <th>Miqdori</th>
            <th>Narxi</th>
            <th>Summa</th>
          </tr>
        </thead>
        <tbody>
          {sale?.products.map((product, i) => (
            <tr key={product.id}>
              <td className='px-2'>{i + 1}</td>
              <td className='px-2'>{product.name}</td>
              <td className='px-2'>
                {product.amount}{' '}
                {product.unit === 'piece' ? 'dona' : product.unit}
              </td>
              <td className='px-2'>
                {new Intl.NumberFormat('en-US').format(product.sellPrice)}
              </td>
              <td className='px-2'>
                {new Intl.NumberFormat('en-US').format(
                  product.sellPrice * product.amount
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SaleDetails
