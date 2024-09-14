import { useEffect, useState } from 'react'
import { useQuery } from 'convex/react'

// import SupplierProduct from './SupplierProduct'
import { api } from '@/convex/_generated/api'
import { Doc } from '@/convex/_generated/dataModel'
import ProductItem from './ProductItem'
import useIntake from '@/hooks/useIntake'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

const ProductList = ({ search }: { search: string }) => {
  const { supplier, setSupplier } = useIntake()
  if (!supplier) return null
  const docs = useQuery(api.documents.getSupplierProducts, {
    supplierId: supplier,
  })
  const [products, setProducts] = useState<Doc<'products'>[]>([])

  useEffect(() => {
    if (docs) {
      setProducts(
        docs.filter((doc) =>
          doc.name.toLowerCase().includes(search.toLowerCase())
        )
      )
    }
  }, [docs, search])

  return (
    <div className='flex-1'>
      {products?.length ? (
        <table className='w-full overflow-y-auto table-auto'>
          <thead>
            <tr>
              <th>
                <Button
                  size='icon'
                  className='h-8'
                  onClick={() => setSupplier(null)}
                >
                  <ArrowLeft className='w-5 h-5' />
                </Button>
              </th>
              <th>Mahsulot nomi</th>
              <th>Papka</th>
              <th>Sotib olish narxi</th>
              <th>Sotish narxi</th>
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
          Bu ta'minotchi uchun mahsulotlar topilmadi
        </p>
      )}
    </div>
  )
}

export default ProductList
