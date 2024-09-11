import { create } from 'zustand'

import { Id } from '@/convex/_generated/dataModel'

type IntakeStore = {
  supplier: Id<'suppliers'> | null
  products: { id: Id<'products'>; amount: number }[] // Make products an array that can be empty
  totalBuyPrice: number
  addItem: (id: Id<'products'>, buyPrice: number, amount: number) => void
  setSupplier: (id: Id<'suppliers'>) => void
}

const useIntake = create<IntakeStore>((set, get) => ({
  supplier: null,
  products: [],
  totalBuyPrice: 0,
  addItem: (id, buyPrice, amount) => {
    set((prev) => ({
      ...prev,
      totalBuyPrice: prev.totalBuyPrice + buyPrice * amount,
      products: [...prev.products, { id, amount }],
    }))
  },
  setSupplier: (id) => {
    set({ supplier: id })
  },
}))

export default useIntake
