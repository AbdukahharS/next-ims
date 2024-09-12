'use client'

import { useState } from 'react'

import { Doc, Id } from '@/convex/_generated/dataModel'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import FilterBar from './_components/FilterBar'
import SaleList from './_components/SaleList'
import IntakeList from './_components/IntakeList'
import SaleDetails from './_components/SaleDetails'
import IntakeDetails from './_components/IntakeDetails'

function formatDate(date: Date) {
  const day = date.getDate()
  const month = date.getMonth() + 1 // Months are zero-indexed
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}

const Page = () => {
  const [active, setActive] = useState<Id<'sales'> | Id<'intakes'> | null>(null)
  const [type, setType] = useState<'sale' | 'intake'>('sale')
  const [start, setStart] = useState(formatDate(new Date()))
  const [end, setEnd] = useState(formatDate(new Date()))

  const handleClick = (act: Id<'sales'> | Id<'intakes'>) => {
    setActive(act)
  }

  return (
    <ResizablePanelGroup direction='horizontal'>
      <ResizablePanel minSize={30}>
        <div className='w-full h-full overflow-x-auto flex flex-col'>
          <FilterBar
            setType={setType}
            setStart={setStart}
            setEnd={setEnd}
            type={type}
            start={start}
            end={end}
          />
          {type === 'sale' ? (
            <SaleList
              start={start}
              end={end}
              active={active}
              handleClick={handleClick}
            />
          ) : (
            <IntakeList
              start={start}
              end={end}
              active={active}
              handleClick={handleClick}
            />
          )}
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize={30}>
        {!!active && (
          <>
            {type === 'sale' && <SaleDetails active={active} />}
            {type === 'intake' && <IntakeDetails active={active} />}
          </>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default Page
