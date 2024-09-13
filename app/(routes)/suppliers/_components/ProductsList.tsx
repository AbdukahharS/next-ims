import { useQuery } from 'convex/react'

import SupplierProduct from './SupplierProduct'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'

const ProductsList = ({ activeId }: { activeId: Id<'suppliers'> }) => {
  if (!activeId) return null
  const products = useQuery(api.documents.getSupplierProducts, {
    supplierId: activeId,
  })

  return (
    <div className='flex-1'>
      {products?.length ? (
        <table className='w-full overflow-y-auto table-auto'>
          <thead>
            <tr>
              <th>No</th>
              <th>Mahsulot nomi</th>
              <th>Sotib olish narxi</th>
              <th>Sotish narxi</th>
              <th>Birligi</th>
              <th>Papka</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((doc, i) => (
              <SupplierProduct key={doc._id} {...doc} i={i} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className='text-center text-xl flex-1 mt-8'>
          Bu ta'minotchi uchun mahsulotlar topilmadi
        </p>
      )}
    </div>
  )
}

export default ProductsList
