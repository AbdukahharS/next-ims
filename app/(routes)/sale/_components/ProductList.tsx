import { useQuery } from 'convex/react'

// import SupplierProduct from './SupplierProduct'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import ProductItem from './ProductItem'

const ProductList = ({ folder }: { folder: Id<'categories'> | null }) => {
  if (!folder) return null
  const products = useQuery(api.documents.getWarehouseWithFolder, {
    folder,
  })

  return (
    <div className='flex-1'>
      {products?.length ? (
        <table className='w-full overflow-y-auto table-auto'>
          <thead>
            <tr>
              <th>No</th>
              <th>Mahsulot nomi</th>
              <th>Narxi</th>
              <th>Qoldiq</th>
            </tr>
          </thead>
          <tbody>
            {products.map((doc, i) => (
              <ProductItem key={doc._id} {...doc} i={i} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className='text-center text-xl flex-1 mt-8'>
          Bu papkada mahsulotlar topilmadi
        </p>
      )}
    </div>
  )
}

export default ProductList
