import { useEffect, useState } from 'react'
import { useQuery } from 'convex/react'

import { Doc, Id } from '@/convex/_generated/dataModel'
import SupplierItem from './SupplierItem'
import { api } from '@/convex/_generated/api'

interface SupplierListProps {
  search: string
}

const SupplierList = ({ search }: SupplierListProps) => {
  const docs = useQuery(api.documents.getSuppliers)
  const [suppliers, setSuppliers] = useState<Doc<'suppliers'>[]>([])

  useEffect(() => {
    if (docs) {
      setSuppliers(
        docs.filter(
          (doc) =>
            doc.name.toLowerCase().includes(search.toLowerCase()) ||
            doc.phone.toLowerCase().includes(search.toLowerCase())
        )
      )
    }
  }, [docs, search])

  return (
    <div className='w-full flex-1 overflow-y-auto'>
      <table className='w-full overflow-y-auto table-auto'>
        <thead>
          <tr>
            <th>No</th>
            <th>Ta'minotchi ismi</th>
            <th>Telefon raqam</th>
          </tr>
        </thead>
        <tbody>
          {suppliers?.map((doc, i) => <SupplierItem key={i} {...doc} i={i} />)}
        </tbody>
      </table>
      {!suppliers?.length && (
        <p className='text-center text-xl pt-6'>Ta'minotchi topilmadi</p>
      )}
    </div>
  )
}

export default SupplierList
