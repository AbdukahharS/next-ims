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

export const getSupplierProducts = query({
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

export const createSupplierProduct = mutation({
  args: {
    supplier: v.id('suppliers'),
    name: v.string(),
    buyPrice: v.number(),
    sellPrice: v.number(),
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
  },
  handler: async (ctx, args) => {
    const document = await ctx.db.insert('products', {
      name: args.name,
      supplier: args.supplier,
      buyPrice: args.buyPrice,
      sellPrice: args.sellPrice,
      unit: args.unit,
      fraction: args.fraction,
    })

    return document
  },
})

export const updateSupplierProduct = mutation({
  args: {
    id: v.id('products'),
    supplier: v.id('suppliers'),
    name: v.optional(v.string()),
    buyPrice: v.optional(v.number()),
    sellPrice: v.optional(v.number()),
    unit: v.optional(
      v.union(
        v.literal('piece'),
        v.literal('m'),
        v.literal('kg'),
        v.literal('m2')
      )
    ),
    fraction: v.optional(
      v.object({
        unit: v.union(v.literal('m'), v.literal('kg'), v.literal('m2')),
        wholeAmount: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args

    const existingDocument = await ctx.db.get(id)

    if (!existingDocument) {
      throw new Error("Bunday ta'minotchi topilmadi")
    }

    const document = await ctx.db.patch(id, {
      ...rest,
      fraction: rest.fraction ? rest.fraction : existingDocument.fraction,
    })

    return document
  },
})

export const createIntake = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const document = await ctx.db.insert('intakes', {
      supplier: args.supplier,
      products: args.products,
      totalBuyPrice: args.totalBuyPrice,
    })

    return document
  },
})
export const addToWarehouse = mutation({
  args: {
    _id: v.id('products'),
    amount: v.number(),
    name: v.string(),
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
  },
  handler: async (ctx, args) => {
    const document = await ctx.db.insert('warehouse', {
      name: args.name,
      amount: args.amount,
      unit: args.unit,
      fraction: args.fraction,
      sellPrice: args.sellPrice,
      productId: args._id,
    })

    return document
  },
})
