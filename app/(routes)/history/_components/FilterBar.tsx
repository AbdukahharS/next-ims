import { useState } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

function validateDate(dateString: string) {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(\d{4})$/
  return regex.test(dateString)
}

interface Props {
  type: 'intake' | 'sale'
  setType: (type: 'intake' | 'sale') => void
  start: string
  setStart: (start: string) => void
  end: string
  setEnd: (end: string) => void
}

const FilterBar = ({ type, setType, start, setStart, end, setEnd }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'start') {
      //   if (validateDate(value)) {
      setStart(value)
      //   }
    } else if (name === 'end') {
      //   if (validateDate(value)) {
      setEnd(value)
      //   }
    }
  }

  return (
    <div className='w-full flex flex-row px-6 py-2 border-b gap-6 items-center'>
      <Select onValueChange={setType} defaultValue={type}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Tanlang' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='intake'>Ta'minot kirimi</SelectItem>
          <SelectItem value='sale'>Savdo</SelectItem>
        </SelectContent>
      </Select>
      <div className='flex flex-row items-center gap-3'>
        <Label htmlFor='start'>Boshlash:</Label>
        <Input value={start} name='start' onChange={handleChange} />
      </div>
      <div className='flex flex-row items-center gap-3'>
        <Label htmlFor='end'>Tugash:</Label>
        <Input value={end} name='end' onChange={handleChange} />
      </div>
    </div>
  )
}

export default FilterBar
