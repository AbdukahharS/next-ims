import { create } from 'zustand'

import { Id } from '@/convex/_generated/dataModel'

type IntakeStore = {
  supplier: Id<'suppliers'> | null
  products: {
    id: Id<'products'>
    name: string
    amount: number
    buyPrice: number
    sellPrice: number
    fraction?: {
      unit: 'm' | 'kg' | 'm2'
      wholeAmount: number
    }
    unit: 'piece' | 'm' | 'kg' | 'm2'
  }[] // Make products an array that can be empty
  totalBuyPrice: number
  addItem: (
    id: Id<'products'>,
    buyPrice: number,
    amount: number,
    unit: 'piece' | 'm' | 'kg' | 'm2',
    name: string,
    sellPrice: number,
    fraction?: {
      unit: 'm' | 'kg' | 'm2'
      wholeAmount: number
    }
  ) => void
  setSupplier: (id: Id<'suppliers'>) => void
  changeAmount: (id: Id<'products'>, amount: number) => void
  clear: () => void
}

const useIntake = create<IntakeStore>((set, get) => ({
  supplier: null,
  products: [],
  totalBuyPrice: 0,
  addItem: (id, buyPrice, amount, unit, name, sellPrice, fraction) => {
    set((prev) => ({
      ...prev,
      totalBuyPrice: prev.totalBuyPrice + buyPrice * amount,
      products: [
        ...prev.products,
        { id, amount, buyPrice, unit, name, sellPrice, fraction },
      ],
    }))
  },
  setSupplier: (id) => {
    set({ supplier: id })
  },
  changeAmount: (id, amount) => {
    set((prev) => ({
      ...prev,
      products: prev.products.map((p) => {
        if (p.id === id) {
          return { ...p, amount }
        }
        return p
      }),
    }))
  },
  clear: () => {
    set({ supplier: null, products: [], totalBuyPrice: 0 })
  },
}))

export default useIntake
