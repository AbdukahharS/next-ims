import { useQuery } from 'convex/react'

import SupplierProduct from './SupplierProduct'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'

const ProductsList = ({ activeId }: { activeId: Id<'suppliers'> }) => {
  if (!activeId) return null
  const products = useQuery(api.documents.getSupplierProducts, {
    supplierId: activeId,
  })

  return products?.length ? (
    <div className='w-full flex-1 overflow-y-auto'>
      {products.map((doc) => (
        <SupplierProduct key={doc._id} />
      ))}
    </div>
  ) : (
    <p className='text-center text-xl flex-1 mt-8'>
      Bu ta'minotchi uchun mahsulotlar topilmadi
    </p>
  )
}

export default ProductsList
