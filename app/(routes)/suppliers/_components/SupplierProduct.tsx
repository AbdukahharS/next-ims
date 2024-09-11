import { useRef, useState } from 'react'
import { useMutation } from 'convex/react'
import { Check, Pencil } from 'lucide-react'

import { Id } from '@/convex/_generated/dataModel'
import { useToast } from '@/components/ui/use-toast'
import { api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'

interface SupplierProductProps {
  _id: Id<'products'>
  supplier: Id<'suppliers'>
  name: string
  buyPrice: number
  sellPrice: number
  i: number
  unit: 'piece' | 'm' | 'kg' | 'm2'
  fraction?: {
    unit: 'm' | 'kg' | 'm2'
    wholeAmount: number
  }
}

const SupplierProduct = ({
  _id,
  supplier,
  name,
  buyPrice,
  sellPrice,
  i,
  unit,
  fraction,
}: SupplierProductProps) => {
  const [editing, setEditing] = useState(false)
  const [unitstate, setUnit] = useState<'piece' | 'm' | 'kg' | 'm2'>(unit)
  const [fractionUnit, setFactoriUnit] = useState<'m' | 'kg' | 'm2'>(
    fraction?.unit || 'm'
  )
  const nameInputRef = useRef<HTMLInputElement>(null)
  const buyPriceInputRef = useRef<HTMLInputElement>(null)
  const sellPriceInputRef = useRef<HTMLInputElement>(null)
  const fractionWholeAmountRef = useRef<HTMLInputElement>(null)

  const { toast } = useToast()
  const updateSupplierProduct = useMutation(api.documents.updateSupplierProduct)

  const handleEdit = () => {
    setEditing(!editing)
  }

  const handleEditSubmit = () => {
    if (
      !nameInputRef.current ||
      !buyPriceInputRef.current ||
      !sellPriceInputRef.current
    )
      return
    setEditing(false)
    const nameValue = nameInputRef.current.value
    const buyPriceValue = Number(buyPriceInputRef.current.value)
    const sellPriceValue = Number(sellPriceInputRef.current.value)

    const updatedProduct = {
      id: _id,
      name: nameValue,
      supplier,
      buyPrice: buyPriceValue,
      sellPrice: sellPriceValue,
      unit: unitstate,
      fraction: fraction
        ? {
            unit: fractionUnit,
            wholeAmount: Number(fractionWholeAmountRef.current?.value),
          }
        : undefined,
    }

    try {
      updateSupplierProduct(updatedProduct)
    } catch (error) {
      toast({
        title: 'Xatolik',
        description: "Mahsulotni o'zgartirishda xatolik yuz berdi",
        variant: 'destructive',
      })
    }
  }

  return (
    <tr className='w-full h-8'>
      <td className='px-2'>{i + 1}</td>
      <td className='px-2'>
        {editing ? (
          <Input type='text' defaultValue={name} ref={nameInputRef} />
        ) : (
          <div className='w-full truncate'>{name}</div>
        )}
      </td>
      <td className='px-2'>
        {editing ? (
          <Input type='text' defaultValue={buyPrice} ref={buyPriceInputRef} />
        ) : (
          <div className='text-foreground/60 truncate'>{buyPrice}</div>
        )}
      </td>
      <td className='px-2'>
        {editing ? (
          <Input type='text' defaultValue={sellPrice} ref={sellPriceInputRef} />
        ) : (
          <div className='text-foreground/60 truncate'>{sellPrice}</div>
        )}
      </td>
      <td className='px-2'>
        {editing ? (
          <Select
            value={unitstate}
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
        ) : (
          <div className='text-foreground/60 truncate'>
            {unit === 'piece' ? 'dona' : unit}
          </div>
        )}
      </td>
      <td className='px-2'>
        {editing && !!fraction ? (
          <div className='flex gap-1 items-center'>
            <Input
              ref={fractionWholeAmountRef}
              defaultValue={fraction?.wholeAmount}
            />
            <Select
              value={fractionUnit}
              onValueChange={(v) => setFactoriUnit(v as 'm' | 'kg' | 'm2')}
            >
              <SelectTrigger className='w-12 p-1'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='kg'>kg</SelectItem>
                <SelectItem value='m'>m</SelectItem>
                <SelectItem value='m2'>
                  m<sup>2</sup>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div className='text-foreground/60 truncate'>
            {fraction && `${fraction.wholeAmount} ${fraction.unit}`}
          </div>
        )}
      </td>
      <td className='px-2'>
        {editing ? (
          <Button variant='ghost' size='sm' onClick={handleEditSubmit}>
            <Check className='h-4 w-4' />
          </Button>
        ) : (
          <Button variant='ghost' size='sm' onClick={handleEdit}>
            <Pencil className='h-4 w-4' />
          </Button>
        )}
      </td>
    </tr>
  )
}

export default SupplierProduct
