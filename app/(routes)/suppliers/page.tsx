'use client'

import { useEffect, useState } from 'react'
import { useQuery } from 'convex/react'

import { api } from '@/convex/_generated/api'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import SupplierItem from './_components/SupplierItem'
import AddSupplier from './_components/AddSupplier'

const page = () => {
  const [activeId, setActiveId] = useState<string | null>(null)
  // const [suppliers, setSuppliers] = useState([])
  const suppliers = useQuery(api.documents.getSuppliers)

  const handleClick = (_id: string) => {
    setActiveId(_id)
  }

  return (
    <ResizablePanelGroup direction='horizontal'>
      <ResizablePanel minSize={30}>
        <div className='w-full h-full overflow-x-auto flex flex-col'>
          <div className='w-full flex-1'>
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
          </div>
          <AddSupplier />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize={30}>Two</ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default page
