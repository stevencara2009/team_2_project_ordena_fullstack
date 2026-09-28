import z from 'zod'

const orderSchema = z.object({
    table_number: z.number({
        invalid_type_error: 'Table number must be a number',
        required_error: 'Table number is required'
    }).int().positive(),

    client_id: z.number({
        invalid_type_error: 'Client id must be a number'
    }).int().positive().optional().nullable(),

    user_id: z.number({
        invalid_type_error: 'User id must be a number',
        required_error: 'User id is required'
    }).int().positive().optional().nullable(),

    state: z.enum([
        'POR CONFIRMAR',
        'PENDIENTE',
        'EN PREPARACION',
        'LISTO',
        'ENTREGADO',
        'FACTURADO'
    ]).optional()
})

export function validateOrder(input) {
    return orderSchema.safeParse(input)
}

export function validatePartialOrder(input) {
    return orderSchema.partial().safeParse(input)
}

// Esquema específico para el pedido que crea el cliente desde el carrito
const clientOrderSchema = z.object({
  table_number: z.number().int().positive(),
  items: z.array(z.object({
    product_id: z.number().int().positive(),
    quantity: z.number().int().positive().min(1),
    notes: z.string().max(255).optional().nullable()
  })).min(1, 'El carrito no puede estar vacío')
})

export function validateClientOrder(input) {
  return clientOrderSchema.safeParse(input)
}