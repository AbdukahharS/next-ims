'use client'

import { useState } from 'react'
import { useMutation } from 'convex/react'

import { api } from '@/convex/_generated/api'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
// import SupplierList from './_components/SupplierList'
// import ProductList from './_components/ProductList'
// import IntakeList from './_components/IntakeList'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import SelectSupplier from './_components/SelectSupplier'
import useSale from '@/hooks/useSale'
import { Id } from '@/convex/_generated/dataModel'
import ProductList from './_components/ProductList'
import SaleList from './_components/SaleList'
import SelectCustomer from './_components/SelectCustomer'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'

const page = () => {
  const { customer, totalSellPrice, clear, products } = useSale()
  const [supplier, setSupplier] = useState<Id<'suppliers'> | null>(null)
  const createIntake = useMutation(api.documents.createIntake)
  const addToWarehoouse = useMutation(api.documents.addToWarehouse)
  const { toast } = useToast()

  const handleSubmit = () => {
    if (!customer) return
    const approval = window.confirm(
      'Tanlangan mahsulotlar sotuvini tasdiqlaysizmi?'
    )
    //   if (!approval) return
    //   try {
    //     createIntake({
    //       supplier,
    //       products: products.map((p) => ({
    //         amount: p.amount,
    //         buyPrice: p.buyPrice,
    //         id: p.id,
    //         name: p.name,
    //         unit: p.unit,
    //       })),
    //       totalBuyPrice,
    //     })
    //     products.map((p) => {
    //       addToWarehoouse({
    //         name: p.name,
    //         _id: p.id,
    //         sellPrice: p.sellPrice,
    //         unit: p.unit,
    //         amount: p.amount,
    //         fraction: p.fraction ? { ...p.fraction, amount: 0 } : undefined,
    //       })
    //     })
    //     setSearch('')
    //     clear()
    //   } catch (error) {
    //     toast({
    //       title: 'Qandaydir xatolik yuz berdi',
    //       variant: 'destructive',
    //     })
    //   }
  }

  return (
    <ResizablePanelGroup direction='horizontal'>
      <ResizablePanel minSize={30}>
        <div className='w-full h-full overflow-x-auto flex flex-col'>
          <SelectSupplier setSupplier={setSupplier} />
          {!!supplier && <ProductList supplier={supplier} />}
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize={30}>
        <div className='w-full h-full overflow-x-auto flex flex-col'>
          <SelectCustomer />
          <SaleList />
          <div className='w-full'>
            <div className='w-full flex gap-4 px-4 py-2 border-t items-center'>
              <Input placeholder='Naqd' />
              <Input placeholder='Plastik' />
            </div>
            <div className='w-full flex justify-between px-4 py-2 items-center'>
              <span>
                Umumiy narxi:{' '}
                {new Intl.NumberFormat('en-US').format(totalSellPrice)}
              </span>
              <div className='flex items-center'>
                <Checkbox defaultChecked className='mr-2' />
                <label>Chop etish</label>
              </div>
              <Button disabled={!products?.length} onClick={handleSubmit}>
                Savdoni tasdiqlash
              </Button>
            </div>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default page
