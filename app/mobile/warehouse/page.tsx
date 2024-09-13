'use client'

import React, { useState } from 'react'
import { useQuery } from 'convex/react'

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { cn } from '@/lib/utils'

const Page = () => {
  const warehouses = useQuery(api.documents.getWarehouses)
  const folders = useQuery(api.documents.getCategories)
  const [active, setActive] = useState<Id<'categories'> | null>(null)

  const handleClick = (id: Id<'categories'>) => {
    setActive(active === id ? null : id)
  }

  return (
    <div className='w-full'>
      {folders?.map((folder, i) => (
        <div key={folder._id}>
          <div
            className={cn(
              'w-full py-2 px-4 border-b cursor-pointer',
              active === folder._id && 'bg-gray-50'
            )}
            onClick={() => handleClick(folder._id)}
          >
            {folder.name}
          </div>
          <table
            className={cn(
              'w-full table-auto border-t-2 border-b-2 border-gray-600',
              active !== folder._id && 'hidden'
            )}
          >
            <thead>
              <tr>
                <th>No</th>
                <th>Mahsulot nomi</th>
                <th>Miqdori</th>
                <th>Narxi</th>
              </tr>
            </thead>
            <tbody>
              {warehouses?.map(
                (warehouse, j) =>
                  warehouse.category === folder._id && (
                    <tr key={warehouse._id}>
                      <td className='px-2'>{j + 1}</td>
                      <td className='px-2'>{warehouse.name}</td>
                      <td className='px-2'>
                        {warehouse.amount}{' '}
                        {warehouse.unit === 'piece' ? 'dona' : warehouse.unit}
                      </td>
                      <td className='px-2'>
                        {new Intl.NumberFormat('en-US').format(
                          warehouse.sellPrice
                        )}
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
      ))}
      {warehouses?.length === 0 && (
        <div className='w-full px-8 pt-20 text-center text-gray-600 text-2xl'>
          Omborda hech qanday papka mavjud emas
        </div>
      )}
    </div>
  )
}

export default Page
