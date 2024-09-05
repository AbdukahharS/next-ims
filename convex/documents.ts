import { v } from 'convex/values'

import { mutation, query } from './_generated/server'

export const getSuppliers = query({
  handler: async (ctx) => {
    const suppliers = await ctx.db
      .query('suppliers')
      .withIndex('by_name')
      .order('asc')
      .collect()

    return suppliers
  },
})

export const updateSupplier = mutation({
  args: {
    id: v.id('suppliers'),
    name: v.optional(v.string()),
    phone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args

    const existingDocument = await ctx.db.get(id)

    if (!existingDocument) {
      throw new Error("Bunday ta'minotchi topilmadi")
    }

    const document = await ctx.db.patch(id, { ...rest })

    return document
  },
})

export const createSupplier = mutation({
  args: {
    name: v.string(),
    phone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const document = await ctx.db.insert('suppliers', {
      name: args.name,
      phone: args.phone || '',
    })

    return document
  },
})

export const getSupplierProducts = mutation({
  args: {
    supplierId: v.id('suppliers'),
  },
  handler: async (ctx, args) => {
    const products = await ctx.db
      .query('products')
      .withIndex('by_supplier', (q) => q.eq('supplier', args.supplierId))
      .order('asc')
      .collect()

    return products
  },
})
