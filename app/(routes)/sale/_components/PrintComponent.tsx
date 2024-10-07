'use client'

import { useQuery } from 'convex/react'

import useSale from '@/hooks/useSale'
import { api } from '@/convex/_generated/api'

const products = [
  {
    id: 'warehouse_1',
    name: 'Item_1',
    amount: 46,
    sellPrice: 45.11,
    unit: 'm2',
  },
  {
    id: 'warehouse_2',
    name: 'Item_2',
    amount: 33,
    sellPrice: 33.75,
    unit: 'piece',
  },
  {
    id: 'warehouse_3',
    name: 'Item_3',
    amount: 53,
    sellPrice: 467.37,
    unit: 'piece',
  },
  {
    id: 'warehouse_4',
    name: 'Item_4',
    amount: 26,
    sellPrice: 129.96,
    unit: 'm2',
  },
  {
    id: 'warehouse_5',
    name: 'Item_5',
    amount: 59,
    sellPrice: 421.19,
    unit: 'm',
  },
  {
    id: 'warehouse_6',
    name: 'Item_6',
    amount: 39,
    sellPrice: 486.36,
    unit: 'piece',
  },
  {
    id: 'warehouse_7',
    name: 'Item_7',
    amount: 95,
    sellPrice: 202.6,
    unit: 'piece',
  },
  {
    id: 'warehouse_8',
    name: 'Item_8',
    amount: 13,
    sellPrice: 260.99,
    unit: 'm2',
  },
  {
    id: 'warehouse_9',
    name: 'Item_9',
    amount: 88,
    sellPrice: 91.61,
    unit: 'kg',
  },
  {
    id: 'warehouse_10',
    name: 'Item_10',
    amount: 13,
    sellPrice: 434.15,
    unit: 'm',
  },
  {
    id: 'warehouse_11',
    name: 'Item_11',
    amount: 92,
    sellPrice: 416.44,
    unit: 'm',
  },
  {
    id: 'warehouse_12',
    name: 'Item_12',
    amount: 66,
    sellPrice: 421.69,
    unit: 'piece',
  },
  {
    id: 'warehouse_13',
    name: 'Item_13',
    amount: 35,
    sellPrice: 33.3,
    unit: 'kg',
  },
  {
    id: 'warehouse_14',
    name: 'Item_14',
    amount: 60,
    sellPrice: 354.35,
    unit: 'piece',
  },
  {
    id: 'warehouse_15',
    name: 'Item_15',
    amount: 85,
    sellPrice: 318.86,
    unit: 'm2',
  },
  {
    id: 'warehouse_16',
    name: 'Item_16',
    amount: 78,
    sellPrice: 200.36,
    unit: 'kg',
  },
  {
    id: 'warehouse_17',
    name: 'Item_17',
    amount: 90,
    sellPrice: 492.43,
    unit: 'piece',
  },
  {
    id: 'warehouse_18',
    name: 'Item_18',
    amount: 97,
    sellPrice: 480.5,
    unit: 'piece',
  },
  {
    id: 'warehouse_19',
    name: 'Item_19',
    amount: 96,
    sellPrice: 313.79,
    unit: 'piece',
  },
  {
    id: 'warehouse_20',
    name: 'Item_20',
    amount: 59,
    sellPrice: 254.28,
    unit: 'm',
  },
]

const PrintComponent = () => {
  const { customer, totalSellPrice, payment } = useSale()
  // console.log(customer)
  // if (!customer) {
  //   return <div>Loading...</div> // or some other fallback component
  // }
  // const customerObj = useQuery(api.documents.getCustomer, {
  //   id: customer,
  // })
  return (
    <div className='w-[50%] mx-auto bg-background pt-6 text-xs'>
      <div className='w-full flex justify-between border-b pb-1'>
        <b>ISM</b>
        <span>Qarz: 3245.34</span>
        <span>{new Date().toLocaleString('en-US', { hour12: false })}</span>
      </div>
      <table className='w-full table-auto mt-3 print-table'>
        <thead>
          <tr>
            <th>No</th>
            <th>Mahsulot nomi</th>
            <th>Narx</th>
            <th>Miqdor</th>
            <th>Summa</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={p.id}>
              <td className='px-1'>{i + 1}</td>
              <td className='px-1'>{p.name}</td>
              <td className='px-1'>
                {new Intl.NumberFormat('en-US').format(p.sellPrice)}
              </td>
              <td className='px-1'>
                {p.amount} {p.unit === 'piece' ? 'ta' : p.unit}
              </td>
              <td className='px-1'>
                {new Intl.NumberFormat('en-US').format(p.sellPrice * p.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='w-full flex items-center gap-6 mt-2'>
        <span className='pr-2 border-r'>
          Umumiy summa: {new Intl.NumberFormat('en-US').format(totalSellPrice)}
        </span>
        <span>Naqd: {new Intl.NumberFormat('en-US').format(payment.cash)}</span>
        <span>
          Plastik: {new Intl.NumberFormat('en-US').format(payment.card)}
        </span>
      </div>
    </div>
  )
}

export default PrintComponent
