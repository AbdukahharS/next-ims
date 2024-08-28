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
  }).index('by_name', ['name']),
})
