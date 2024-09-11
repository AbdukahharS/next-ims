import { create } from 'zustand'

import { Id } from '@/convex/_generated/dataModel'

type SaleStore = {
  customer: Id<'customers'> | null
  products: {
    id: Id<'warehouse'>
    name: string
    amount: number
    sellPrice: number
    fraction?: {
      unit: 'm' | 'kg' | 'm2'
      wholeAmount: number
      amount: number
    }
    unit: 'piece' | 'm' | 'kg' | 'm2'
  }[] // Make products an array that can be empty
  totalSellPrice: number
  payment: {
    cash: number
    card: number
  }
  addItem: (
    id: Id<'warehouse'>,
    amount: number,
    unit: 'piece' | 'm' | 'kg' | 'm2',
    name: string,
    sellPrice: number,
    fraction?: {
      unit: 'm' | 'kg' | 'm2'
      wholeAmount: number
      amount: number
    }
  ) => void
  setCustomer: (id: Id<'customers'>) => void
  changeAmount: (
    id: Id<'warehouse'>,
    amount: number,
    fractionAmount?: number
  ) => void
  clear: () => void
  paymentChange: (cash?: number, card?: number) => void
}

const useSale = create<SaleStore>((set, get) => ({
  customer: null,
  products: [],
  totalSellPrice: 0,
  payment: { cash: 0, card: 0 },
  addItem: (id, amount, unit, name, sellPrice, fraction) => {
    set((prev) => ({
      ...prev,
      totalSellPrice: prev.totalSellPrice + sellPrice * amount,
      products: [
        ...prev.products,
        {
          id,
          amount,
          unit,
          name,
          sellPrice,
          fraction: fraction
            ? {
                unit: fraction.unit,
                wholeAmount: fraction.wholeAmount,
                amount: fraction.amount || 0,
              }
            : undefined,
        },
      ],
    }))
  },
  setCustomer: (id) => {
    set({ customer: id })
  },
  changeAmount: (id, amount, fractionAmount) => {
    set((prev) => ({
      ...prev,
      products: prev.products.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            amount,
            fraction: p.fraction
              ? { ...p.fraction, amount: fractionAmount || 0 }
              : undefined,
          }
        }
        return p
      }),
    }))
  },
  clear: () => {
    set({ customer: null, products: [], totalSellPrice: 0 })
  },
  paymentChange: (cash, card) => {
    set((prev) => ({
      ...prev,
      payment: {
        cash: cash || prev.payment.cash,
        card: card || prev.payment.card,
      },
    }))
  },
}))

export default useSale
