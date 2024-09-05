'use client'

import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'convex/react'

import { Id, Doc } from '@/convex/_generated/dataModel'
import { api } from '@/convex/_generated/api'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import SupplierItem from './_components/SupplierItem'
import AddSupplier from './_components/AddSupplier'
import SearchSupplier from './_components/SearchSupplier'
import SupplierProduct from './_components/SupplierProduct'
import AddProduct from './_components/AddProduct'
import { cn } from '@/lib/utils'

const page = () => {
  const docs = useQuery(api.documents.getSuppliers)
  const getProducts = useMutation(api.documents.getSupplierProducts)
  const [activeId, setActiveId] = useState<Id<'suppliers'> | null>(null)
  const [activeProducts, setActiveProducts] = useState<Doc<'products'>[]>([])
  const [suppliers, setSuppliers] = useState(docs)
  const [search, setSearch] = useState('')

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

  useEffect(() => {
    if (activeId) {
      getProducts({ supplierId: activeId }).then((docs) => {
        if (docs.length) {
          setActiveProducts(docs)
        }
      })
    }
  }, [activeId])

  const handleClick = (_id: Id<'suppliers'>) => {
    setActiveId(_id)
  }

  return (
    <ResizablePanelGroup direction='horizontal'>
      <ResizablePanel minSize={30}>
        <div className='w-full h-full overflow-x-auto flex flex-col'>
          <SearchSupplier setSearch={setSearch} />
          <div className='w-full flex-1 overflow-y-auto'>
            {suppliers?.map(({ _id, name, phone }, i) => (
              <SupplierItem
                key={i}
                i={i}
                name={name}
                phone={phone}
                _id={_id}
                activeId={activeId}
                handleClick={handleClick}
              />
            ))}
            {!suppliers?.length && (
              <p className='text-center text-xl pt-6'>Ta'minotchi topilmadi</p>
            )}
          </div>
          <AddSupplier />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize={30}>
        <div
          className={cn(
            'w-full h-full flex flex-col',
            !activeId && 'justify-center'
          )}
        >
          {!activeId ? (
            <p className='text-center text-xl'>Ta'minotchi tanlang!</p>
          ) : activeProducts?.length ? (
            <div className='w-full flex-1 overflow-y-auto'>
              {activeProducts.map((doc) => (
                <SupplierProduct key={doc._id} />
              ))}
            </div>
          ) : (
            <p className='text-center text-xl flex-1 mt-8'>
              Bu ta'minotchi uchun mahsulotlar topilmadi
            </p>
          )}
          {activeId && <AddProduct />}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default page
