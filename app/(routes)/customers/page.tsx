'use client'

import { useEffect, useState } from 'react'
import { useQuery } from 'convex/react'

import { Doc } from '@/convex/_generated/dataModel'
import { api } from '@/convex/_generated/api'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import SearchBar from './_components/SearchBar'
import CustomerList from './_components/CustomerList'
import AddCustomer from './_components/AddCustomer'
import EditCustomer from './_components/EditCustomer'

const Page = () => {
  const docs = useQuery(api.documents.getCustomers)
  const [active, setActive] = useState<Doc<'customers'> | null>(null)
  const [customers, setCustomers] = useState<Doc<'customers'>[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (docs) {
      setCustomers(
        docs.filter(
          (doc) =>
            doc.name.toLowerCase().includes(search.toLowerCase()) ||
            doc.phone.toLowerCase().includes(search.toLowerCase())
        )
      )
    }
  }, [docs, search])

  const handleClick = (customer: Doc<'customers'>) => {
    setActive(customer)
  }

  return (
    <ResizablePanelGroup direction='horizontal'>
      <ResizablePanel minSize={30}>
        <div className='w-full h-full overflow-x-auto flex flex-col'>
          <SearchBar setSearch={setSearch} />
          <CustomerList
            customers={customers}
            handleClick={handleClick}
            active={active}
          />
          {/* <AddSupplier /> */}
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize={30}>
        <div className='w-full h-full overflow-x-auto flex flex-col'>
          <div className='w-full flex-1'>
            {!!active && <EditCustomer customer={active} />}
          </div>
          <AddCustomer />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default Page
