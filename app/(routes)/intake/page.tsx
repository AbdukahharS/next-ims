'use client'

import { useState } from 'react'

import { Id } from '@/convex/_generated/dataModel'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import SearchBar from './_components/SearchBar'
import SupplierList from './_components/SupplierList'
import ProductList from './_components/ProductList'
import useIntake from '@/hooks/useIntake'

const page = () => {
  const [search, setSearch] = useState('')
  const { supplier } = useIntake()

  return (
    <ResizablePanelGroup direction='horizontal'>
      <ResizablePanel minSize={30}>
        <div className='w-full h-full overflow-x-auto flex flex-col'>
          <SearchBar setSearch={setSearch} />
          {!supplier ? (
            <SupplierList search={search} />
          ) : (
            <ProductList search={search} />
          )}
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize={30}>
        {/* <div
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
        </div> */}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default page
