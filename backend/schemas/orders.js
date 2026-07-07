import z from 'zod'

const orderSchema = z.object({
    table_number: z.number({
        invalid_type_error: 'Table number must be a number',
        required_error: 'Table number is required'
    }).int().positive(),

    client_id: z.number({
        invalid_type_error: 'Client id must be a number'
    }).int().positive().optional(),

    user_id: z.number({
        invalid_type_error: 'User id must be a number',
        required_error: 'User id is required'
    }).int().positive(),

    state: z.enum([
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