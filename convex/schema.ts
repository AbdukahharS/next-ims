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
})
