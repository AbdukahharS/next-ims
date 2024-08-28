'use client'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import SupplierItem from './_components/SupplierItem'
import { useState } from 'react'

const page = () => {
  const [activeId, setActiveId] = useState<string | null>(null)

  const handleClick = (_id: string) => {
    setActiveId(_id)
  }

  return (
    <ResizablePanelGroup direction='horizontal'>
      <ResizablePanel minSize={30}>
        <div className='w-full h-full overflow-x-auto'>
          {Array.from({ length: 10 }).map((_, i) => (
            <SupplierItem
              key={i}
              i={i}
              name='name'
              phone='phone'
              _id={i.toString()}
              activeId={activeId}
              handleClick={handleClick}
            />
          ))}
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize={30}>Two</ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default page
