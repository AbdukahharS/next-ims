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
    category: v.id('categories'),
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
      category: args.category,
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
    category: v.optional(v.id('categories')),
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
    category: v.id('categories'),
  },
  handler: async (ctx, args) => {
    const existingDocument = await ctx.db
      .query('warehouse')
      .filter((q) => q.eq(q.field('productId'), args._id))
      .collect()
    if (existingDocument[0]) {
      await ctx.db.patch(existingDocument[0]._id, {
        amount: existingDocument[0].amount + args.amount,
      })
    } else {
      const document = await ctx.db.insert('warehouse', {
        name: args.name,
        amount: args.amount,
        supplier: args.supplier,
        unit: args.unit,
        sellPrice: args.sellPrice,
        productId: args._id,
        category: args.category,
      })
    }
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
export const getSupplier = query({
  args: {
    id: v.id('suppliers'),
  },
  handler: async (ctx, args) => {
    const document = await ctx.db.get(args.id)
    return document
  },
})

export const getSale = query({
  args: {
    id: v.id('sales'),
  },
  handler: async (ctx, args) => {
    const document = await ctx.db.get(args.id)
    return document
  },
})

export const getIntake = query({
  args: {
    id: v.id('intakes'),
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

export const getWarehouseWithFolder = query({
  args: {
    folder: v.id('categories'),
  },
  handler: async (ctx, args) => {
    const documents = await ctx.db
      .query('warehouse')
      .filter((q) => q.eq(q.field('category'), args.folder))
      .collect()
    return documents
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

export const getSalesinDateRange = query({
  args: {
    start: v.number(),
    end: v.number(),
  },
  handler: async (ctx, args) => {
    const documents = await ctx.db
      .query('sales')
      .filter((q) =>
        q.and(
          q.gte(q.field('_creationTime'), args.start),
          q.lte(q.field('_creationTime'), args.end + 86400000)
        )
      )
      .collect()

    return documents
  },
})

export const getIntakesinDateRange = query({
  args: {
    start: v.number(),
    end: v.number(),
  },
  handler: async (ctx, args) => {
    const documents = await ctx.db
      .query('intakes')
      .filter((q) =>
        q.and(
          q.gte(q.field('_creationTime'), args.start),
          q.lte(q.field('_creationTime'), args.end + 86400000)
        )
      )
      .collect()

    return documents
  },
})

export const createCategory = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const documentId = await ctx.db.insert('categories', args)

    return documentId
  },
})

export const getCategories = query({
  handler: async (ctx) => {
    const documents = await ctx.db
      .query('categories')
      .withIndex('by_name')
      .order('asc')
      .collect()
    return documents.length ? documents : []
  },
})

export const getSalesOfCustomerToday = mutation({
  args: {
    customer: v.id('customers'),
    localDayStart: v.number(),
  },
  handler: async (ctx, args) => {
    const documents = await ctx.db
      .query('sales')
      .filter((q) =>
        q.and(
          q.eq(q.field('customer'), args.customer),
          q.gte(q.field('_creationTime'), args.localDayStart)
        )
      )
      .collect()

    return documents[0]
  },
})

export const getWarehouses = query({
  handler: async (ctx) => {
    const documents = await ctx.db.query('warehouse').collect()
    return documents
  },
})

export const updateSalePayment = mutation({
  args: {
    _id: v.id('sales'),
    payment: v.object({
      cash: v.number(),
      card: v.number(),
    }),
  },
  handler: async (ctx, args) => {
    const document = await ctx.db.patch(args._id, {
      payment: args.payment,
    })
    return document
  },
})

export const updateSale = mutation({
  args: {
    _id: v.id('sales'),
    products: v.array(
      v.object({
        id: v.id('warehouse'),
        amount: v.number(),
        sellPrice: v.number(),
        name: v.string(),
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
    const document = await ctx.db.patch(args._id, {
      products: args.products,
      totalSellPrice: args.totalSellPrice,
      payment: args.payment,
    })
    return document
  },
})

export const getWarehouseWithProductId = query({
  args: {
    id: v.id('products'),
  },
  handler: async (ctx, args) => {
    const document = await ctx.db
      .query('warehouse')
      .filter((q) => q.eq(q.field('productId'), args.id))
      .first()

    return document
  },
})

export const getCategory = query({
  args: {
    id: v.id('categories'),
  },
  handler: async (ctx, args) => {
    const document = await ctx.db
      .query('categories')
      .filter((q) => q.eq(q.field('_id'), args.id))
      .first()

    return document
  },
})

export const updateCustomerDebt = mutation({
  args: {
    _id: v.id('customers'),
    change: v.number(),
  },
  handler: async (ctx, args) => {
    const document = await ctx.db.get(args._id)
    if (!document) {
      throw new Error('Document not found')
    }
    const newDebt = document.debt + args.change
    const documentId = await ctx.db.patch(args._id, {
      debt: newDebt,
    })
    return documentId
  },
})