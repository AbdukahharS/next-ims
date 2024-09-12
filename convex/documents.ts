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
  },
  handler: async (ctx, args) => {
    const document = await ctx.db.insert('products', {
      name: args.name,
      supplier: args.supplier,
      buyPrice: args.buyPrice,
      sellPrice: args.sellPrice,
      unit: args.unit,
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
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args

    const existingDocument = await ctx.db.get(id)

    if (!existingDocument) {
      throw new Error("Bunday ta'minotchi topilmadi")
    }

    const document = await ctx.db.patch(id, {
      ...rest,
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
    supplier: v.id('suppliers'),
    amount: v.number(),
    name: v.string(),
    unit: v.union(
      v.literal('piece'),
      v.literal('m'),
      v.literal('kg'),
      v.literal('m2')
    ),
    sellPrice: v.number(),
  },
  handler: async (ctx, args) => {
    const document = await ctx.db.insert('warehouse', {
      name: args.name,
      amount: args.amount,
      supplier: args.supplier,
      unit: args.unit,
      sellPrice: args.sellPrice,
      productId: args._id,
    })

    return document
  },
})

export const getCustomers = query({
  handler: async (ctx) => {
    const customers = await ctx.db
      .query('customers')
      .withIndex('by_name')
      .order('asc')
      .collect()

    return customers
  },
})

export const createCustomer = mutation({
  args: {
    name: v.string(),
    phone: v.string(),
  },
  handler: async (ctx, args) => {
    const document = await ctx.db.insert('customers', {
      name: args.name,
      phone: args.phone,
      debt: 0,
    })

    return document
  },
})

export const getCustomer = query({
  args: {
    id: v.id('customers'),
  },
  handler: async (ctx, args) => {
    const document = await ctx.db.get(args.id)
    return document
  },
})

export const updateCustomer = mutation({
  args: {
    id: v.id('customers'),
    name: v.optional(v.string()),
    phone: v.optional(v.string()),
    debt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args
    const document = await ctx.db.patch(id, rest)
    return document
  },
})

export const getWarehouseWithSupplier = query({
  args: {
    supplier: v.id('suppliers'),
  },
  handler: async (ctx, args) => {
    const document = await ctx.db
      .query('warehouse')
      .filter((q) => q.eq(q.field('supplier'), args.supplier))
      .collect()
    return document
  },
})

export const perfornmSale = mutation({
  args: {
    customer: v.id('customers'),
    products: v.array(
      v.object({
        id: v.id('warehouse'),
        name: v.string(),
        amount: v.number(),
        sellPrice: v.number(),
        unit: v.union(
          v.literal('piece'),
          v.literal('m'),
          v.literal('kg'),
          v.literal('m2')
        ),
      })
    ),
    totalSellPrice: v.number(),
    payment: v.object({
      cash: v.number(),
      card: v.number(),
    }),
  },
  handler: async (ctx, args) => {
    const cust = await ctx.db.get(args.customer)
    if (!cust) {
      throw new Error('Bunday mijoz topilmadi')
    }
    const document = await ctx.db.insert('sales', {
      customer: args.customer,
      products: args.products,
      totalSellPrice: args.totalSellPrice,
      payment: args.payment,
    })

    await ctx.db.patch(args.customer, {
      debt:
        cust.debt + args.totalSellPrice - args.payment.cash - args.payment.card,
    })

    return document
  },
})

export const subtrackFromWarehouse = mutation({
  args: {
    id: v.id('warehouse'),
    amount: v.number(),
  },
  handler: async (ctx, args) => {
    const { id, amount } = args

    const existingDocument = await ctx.db.get(id)

    if (!existingDocument) {
      throw new Error('Bunday mahsulot omborda topilmadi')
    }

    if (existingDocument.amount <= amount) {
      await ctx.db.delete(id)
    } else {
      await ctx.db.patch(id, {
        amount: existingDocument.amount - amount,
      })
    }
  },
})

