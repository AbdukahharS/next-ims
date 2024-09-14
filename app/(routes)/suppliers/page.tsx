'use client'

import { useEffect, useState } from 'react'
import { useQuery } from 'convex/react'

import { Id } from '@/convex/_generated/dataModel'
import { api } from '@/convex/_generated/api'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import SupplierItem from './_components/SupplierItem'
import AddSupplier from './_components/AddSupplier'
import SearchSupplier from './_components/SearchSupplier'
import AddProduct from './_components/AddProduct'
import { cn } from '@/lib/utils'
import ProductsList from './_components/ProductsList'

const Page = () => {
  const docs = useQuery(api.documents.getSuppliers)
  const [activeId, setActiveId] = useState<Id<'suppliers'> | null>(null)
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
      <ResizablePanel defaultSize={60} minSize={50}>
        <div
          className={cn(
            'w-full h-full flex flex-col',
            !activeId && 'justify-center'
          )}
        >
          {!activeId ? (
            <p className='text-center text-xl'>Ta'minotchi tanlang!</p>
          ) : (
            <ProductsList activeId={activeId} />
          )}
          {activeId && <AddProduct activeId={activeId} />}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default Page
