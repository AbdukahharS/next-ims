'use client'

import { useState } from 'react'
import { useMutation } from 'convex/react'

import { api } from '@/convex/_generated/api'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import SearchBar from './_components/SearchBar'
import SupplierList from './_components/SupplierList'
import ProductList from './_components/ProductList'
import useIntake from '@/hooks/useIntake'
import IntakeList from './_components/IntakeList'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

const Page = () => {
  const [search, setSearch] = useState('')
  const { supplier, totalBuyPrice, clear, products } = useIntake()
  const createIntake = useMutation(api.documents.createIntake)
  const addToWarehoouse = useMutation(api.documents.addToWarehouse)
  const { toast } = useToast()

  const handleSubmit = () => {
    if (!supplier) return
    const approval = window.confirm(
      'Tanlangan mahsulotlarni omborga kiritishni tasdiqlaysizmi?'
    )
    if (!approval) return
    try {
      createIntake({
        supplier,
        products: products.map((p) => ({
          amount: p.amount,
          buyPrice: p.buyPrice,
          id: p.id,
          name: p.name,
          unit: p.unit,
        })),
        totalBuyPrice,
      })
      products.map((p) => {
        addToWarehoouse({
          name: p.name,
          _id: p.id,
          sellPrice: p.sellPrice,
          unit: p.unit,
          amount: p.amount,
          supplier: supplier,
          category: p.category,
        })
      })
      setSearch('')
      clear()
    } catch (error) {
      toast({
        title: 'Qandaydir xatolik yuz berdi',
        variant: 'destructive',
      })
    }
  }

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
        <div className='w-full h-full overflow-x-auto flex flex-col'>
          <IntakeList />
          <div className='w-full flex justify-between px-4 py-2 border-t items-center'>
            <span>
              Umumiy narxi:{' '}
              {new Intl.NumberFormat('en-US').format(totalBuyPrice)}
            </span>
            <Button disabled={!products?.length} onClick={handleSubmit}>
              Kirimni tasdiqlash
            </Button>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default Page
