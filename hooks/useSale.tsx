import { create } from 'zustand'

import { Id } from '@/convex/_generated/dataModel'

type SaleStore = {
  customer: Id<'customers'> | null
  products: {
    id: Id<'warehouse'>
    name: string
    amount: number
    sellPrice: number
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
    sellPrice: number
  ) => void
  setCustomer: (id: Id<'customers'>) => void
  changeAmount: (id: Id<'warehouse'>, amount: number) => void
  clear: () => void
  removeItem: (id: Id<'warehouse'>) => void
  paymentCash: (cash?: string) => void
  paymentCard: (card?: string) => void
  setSale: ({
    customer,
    products,
    totalSellPrice,
    payment,
  }: {
    customer: Id<'customers'>
    products: {
      id: Id<'warehouse'>
      name: string
      amount: number
      sellPrice: number
      unit: 'piece' | 'm' | 'kg' | 'm2'
    }[]
    totalSellPrice: number
    payment: {
      cash: number
      card: number
    }
  }) => void
}

const useSale = create<SaleStore>((set, get) => ({
  customer: null,
  products: [],
  totalSellPrice: 0,
  payment: { cash: 0, card: 0 },
  addItem: (id, amount, unit, name, sellPrice) => {
    const doesExist = get().products.some((p) => p.id === id)
    if (!doesExist) {
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
          },
        ],
      }))
    } else {
      set((prev) => ({
        ...prev,
        products: prev.products.map((p) => {
          if (p.id === id) {
            return {
              ...p,
              amount: p.amount + amount,
            }
          }
          return p
        }),
      }))
    }
  },
  setCustomer: (id) => {
    set({ customer: id })
  },
  setSale: ({ customer, products, totalSellPrice, payment }) => {
    set({
      customer,
      products,
      totalSellPrice,
      payment,
    })
  },
  changeAmount: (id, amount) => {
    set((prev) => ({
      ...prev,
      products: prev.products.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            amount,
          }
        }
        return p
      }),
    }))
  },
  clear: () => {
    set({
      customer: null,
      products: [],
      totalSellPrice: 0,
      payment: { cash: 0, card: 0 },
    })
  },
  paymentCash: (cash) => {
    set((prev) => ({
      ...prev,
      payment: {
        cash: Number(cash),
        card: prev.payment.card,
      },
    }))
  },
  paymentCard(card) {
    set((prev) => ({
      ...prev,
      payment: {
        card: Number(card),
        cash: prev.payment.cash,
      },
    }))
  },
  removeItem: (id) => {
    set((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== id),
    }))
  },
}))

export default useSale
