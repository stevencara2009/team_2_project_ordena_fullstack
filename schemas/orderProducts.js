import z from 'zod'

const orderProductSchema = z.object({

  order_id: z.number({
    invalid_type_error: 'Order id must be a number',
    required_error: 'Order id is required'
  }).int().positive(),

  product_id: z.number({
    invalid_type_error: 'Product id must be a number',
    required_error: 'Product id is required'
  }).int().positive(),

  quantity: z.number({
    invalid_type_error: 'Quantity must be a number',
    required_error: 'Quantity is required'
  })
    .int()
    .positive()
    .min(1)
})

export function validateOrderProduct(input) {
  return orderProductSchema.safeParse(input)
}

export function validatePartialOrderProduct(input) {
  return orderProductSchema.partial().safeParse(input)
}