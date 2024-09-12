'use client'

import { useQuery } from 'convex/react'

import useSale from '@/hooks/useSale'
import { api } from '@/convex/_generated/api'

const PrintComponent = () => {
  const { customer, products } = useSale()
  console.log(customer)
  if (!customer) {
    return <div>Loading...</div> // or some other fallback component
  }
  const customerObj = useQuery(api.documents.getCustomer, {
    id: customer,
  })
  return (
    <div className='w-full bg-background p-6 '>
      <div className='w-full flex justify-between border-b pb-1'>
        <b>{customerObj?.name}</b>
        <span>
          Qarz: {new Intl.NumberFormat('en-US').format(customerObj?.debt || 0)}
        </span>
        <span>{new Date().toLocaleString()}</span>
      </div>
      <table
        className='w-full table-auto mt-3
      '
      >
        <thead>
          <tr>
            <th className='w-12'>No</th>
            <th>Mahsulot nomi</th>
            <th>Miqdor</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={p.id}>
              <td className='px-2'>{i + 1}</td>
              <td className='px-2'>{p.name}</td>
              <td className='px-2'>
                {p.amount} {p.unit === 'piece' ? 'dona' : p.unit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PrintComponent
