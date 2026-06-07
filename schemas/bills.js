import z from 'zod'

const billSchema = z.object({

  order_id: z.number({
    required_error: 'Order id is required'
  })
    .int()
    .positive(),

  user_id: z.number({
    required_error: 'User id is required'
  })
    .int()
    .positive(),

  client_id: z.number()
    .int()
    .positive()
    .optional()

})

export function validateBill(input) {
  return billSchema.safeParse(input)
}