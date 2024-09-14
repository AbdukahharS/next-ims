'use client'

import { useRef, useState } from 'react'
import { useMutation } from 'convex/react'
import { useReactToPrint } from 'react-to-print'

import { api } from '@/convex/_generated/api'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import Folders from './_components/Folders'
import useSale from '@/hooks/useSale'
import { Id } from '@/convex/_generated/dataModel'
import ProductList from './_components/ProductList'
import SaleList from './_components/SaleList'
import SelectCustomer from './_components/SelectCustomer'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import PrintComponent from './_components/PrintComponent'
import { Label } from '@/components/ui/label'

const Page = () => {
  const { customer, totalSellPrice, clear, products, payment, paymentChange } =
    useSale()
  const { toast } = useToast()
  const getTodaySale = useMutation(api.documents.getSalesOfCustomerToday)
  const updateSale = useMutation(api.documents.updateSale)
  const [folder, setFolder] = useState<Id<'categories'> | null>(null)
  const [print, setPrint] = useState(false)
  const perfornmSale = useMutation(api.documents.perfornmSale)
  const subtrackFromWarehouse = useMutation(api.documents.subtrackFromWarehouse)
  const printRef = useRef<HTMLDivElement | null>(null)

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  })

  const handleSubmit = async () => {
    if (!customer) return alert('Mijozni tanlang')
    const approval = window.confirm(
      'Tanlangan mahsulotlar sotuvini tasdiqlaysizmi?'
    )
    if (!approval) return
    try {
      const now = new Date()
      const midnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0,
        0
      )
      const midnightTimestamp = midnight.getTime()

      const todaySale = await getTodaySale({
        customer,
        localDayStart: midnightTimestamp,
      })

      if (!!todaySale) {
        await updateSale({
          _id: todaySale._id,
          products: products.map((p) => ({
            amount: p.amount,
            sellPrice: p.sellPrice,
            id: p.id,
            name: p.name,
            unit: p.unit,
          })),
          totalSellPrice,
          payment: payment,
        })
      } else {
        await perfornmSale({
          customer,
          products: products.map((p) => ({
            amount: p.amount,
            sellPrice: p.sellPrice,
            id: p.id,
            name: p.name,
            unit: p.unit,
          })),
          totalSellPrice,
          payment: payment,
        })
      }

      products.map((p) => {
        subtrackFromWarehouse({
          id: p.id,
          amount: p.amount,
        })
      })
      if (print) {
        handlePrint()
      }
      clear()
      setFolder(null)
      paymentChange(0, 0)
    } catch (error) {
      toast({
        title: 'Qandaydir xatolik yuz berdi',
        variant: 'destructive',
      })
    }
  }

  return (
    <>
      <ResizablePanelGroup
        direction='horizontal'
        className='z-10 bg-background'
      >
        <ResizablePanel minSize={30}>
          <div className='w-full h-full overflow-x-auto flex flex-col'>
            <ResizablePanelGroup direction='horizontal'>
              <ResizablePanel defaultSize={30} minSize={20}>
                <Folders setFolder={setFolder} folder={folder} />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={70} minSize={40}>
                {!!folder && <ProductList folder={folder} />}
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize={30}>
          <div className='w-full h-full overflow-x-auto flex flex-col'>
            <SelectCustomer />
            <SaleList />
            <div className='w-full'>
              <div className='w-full flex gap-4 px-4 py-2 border-t items-center'>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                  <Label>Naqd:</Label>
                  <Input
                    placeholder='Naqd'
                    type='number'
                    value={payment.cash}
                    onChange={(e) => paymentChange(Number(e.target.value))}
                  />
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                  <Label>Bank:</Label>
                  <Input
                    placeholder='Plastik'
                    value={payment.card}
                    type='number'
                    onChange={(e) =>
                      paymentChange(payment.cash, Number(e.target.value))
                    }
                  />
                </div>
              </div>
              <div className='w-full flex justify-between px-4 py-2 items-center'>
                <span>
                  Umumiy narxi:{' '}
                  {new Intl.NumberFormat('en-US').format(totalSellPrice)}
                </span>
                <div className='flex items-center'>
                  <Checkbox
                    defaultChecked={print}
                    onCheckedChange={(v) => setPrint(v as boolean)}
                    className='mr-2'
                  />
                  <label>Chop etish</label>
                </div>
                <Button
                  disabled={!products?.length || !customer}
                  onClick={handleSubmit}
                >
                  Savdoni tasdiqlash
                </Button>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      <div ref={printRef} className='w-full absolute top-0 z-[-10]'>
        {customer && <PrintComponent />}
      </div>
    </>
  )
}

export default Page
