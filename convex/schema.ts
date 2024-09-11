import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  suppliers: defineTable({
    name: v.string(),
    phone: v.string(),
  }).index('by_name', ['name']),
  products: defineTable({
    name: v.string(),
    buyPrice: v.number(),
    sellPrice: v.number(),
    supplier: v.id('suppliers'),
    unit: v.union(
      v.literal('piece'),
      v.literal('m'),
      v.literal('kg'),
      v.literal('m2')
    ),
    fraction: v.optional(
      v.object({
        unit: v.union(v.literal('m'), v.literal('kg'), v.literal('m2')),
        wholeAmount: v.number(),
      })
    ),
  })
    .index('by_name', ['name'])
    .index('by_supplier', ['supplier']),
  intakes: defineTable({
    supplier: v.id('suppliers'),
    products: v.array(
      v.object({
        id: v.id('products'),
        name: v.string(),
        buyPrice: v.number(),
        unit: v.union(
          v.literal('piece'),
          v.literal('m'),
          v.literal('kg'),
          v.literal('m2')
        ),
        amount: v.number(),
      })
    ),
    totalBuyPrice: v.number(),
  }),
  warehouse: defineTable({
    productId: v.id('products'),
    name: v.string(),
    amount: v.number(),
    unit: v.union(
      v.literal('piece'),
      v.literal('m'),
      v.literal('kg'),
      v.literal('m2')
    ),
    fraction: v.optional(
      v.object({
        unit: v.union(v.literal('m'), v.literal('kg'), v.literal('m2')),
        wholeAmount: v.number(),
        amount: v.number(),
      })
    ),
    sellPrice: v.number(),
  }),
  customers: defineTable({
    name: v.string(),
    phone: v.string(),
    debt: v.number(),
  }).index('by_name', ['name']),
})
