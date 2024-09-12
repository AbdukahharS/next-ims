'use client'

import { useState } from 'react'
import { useMutation } from 'convex/react'

import { api } from '@/convex/_generated/api'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Id } from '@/convex/_generated/dataModel'

const AddProduct = ({ activeId }: { activeId: Id<'suppliers'> }) => {
  const [name, setName] = useState('')
  const [buyPrice, setBuyPrice] = useState(0)
  const [sellPrice, setSellPrice] = useState(0)
  const [unit, setUnit] = useState<'piece' | 'm' | 'kg' | 'm2'>('piece')
  const [enableFrac, setEnableFrac] = useState(false)
  const [fracUnit, setFracUnit] = useState<'m' | 'kg' | 'm2'>('m')
  const [fracWholeAmount, setFracWholeAmount] = useState(0)

  const createProduct = useMutation(api.documents.createSupplierProduct)
  const { toast } = useToast()

  const handleClick = async () => {
    if (!name) {
      toast({
        title: 'Iltimos, mahsulot nomini kiriting',
        variant: 'destructive',
      })
      return
    }

    if (!buyPrice) {
      toast({
        title: 'Iltimos, sotib olish narxini kiriting',
        variant: 'destructive',
      })
      return
    }

    if (!sellPrice) {
      toast({
        title: 'Iltimos, sotish narxini kiriting',
        variant: 'destructive',
      })
      return
    }

    await createProduct({
      name,
      supplier: activeId,
      buyPrice,
      sellPrice,
      unit,
    })

    setName('')
    setBuyPrice(0)
    setSellPrice(0)
    setUnit('piece')
    setEnableFrac(false)
    setFracUnit('m')
    setFracWholeAmount(0)
  }

  return (
    <div className='w-full p-2 border-t-2'>
      <div className='flex flex-row gap-2 items-center'>
        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='name'>Mahsulot nomi</Label>
          <Input
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='buyPrice'>Sotib olish narxi</Label>
          <Input
            id='buyPrice'
            value={buyPrice}
            type='number'
            onChange={(e) => setBuyPrice(Number(e.target.value))}
          />
        </div>
        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='sellPrice'>Sotish narxi</Label>
          <Input
            id='sellPrice'
            value={sellPrice}
            type='number'
            onChange={(e) => setSellPrice(Number(e.target.value))}
          />
        </div>
        <div className='grid w-full items-center gap-1.5'>
          <Label>O'lchov birligi</Label>
          <Select
            value={unit}
            onValueChange={(v) => setUnit(v as 'piece' | 'm' | 'kg' | 'm2')}
          >
            <SelectTrigger>
              <SelectValue placeholder="O'lchov birligi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='piece'>dona</SelectItem>
              <SelectItem value='kg'>kg</SelectItem>
              <SelectItem value='m'>m</SelectItem>
              <SelectItem value='m2'>
                m<sup>2</sup>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleClick}>Yangi mahsulot qo'shish</Button>
      </div>
    </div>
  )
}

export default AddProduct
