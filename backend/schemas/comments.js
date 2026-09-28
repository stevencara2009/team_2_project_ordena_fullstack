import z from "zod"

const commentSchema = z.object({
  content: z
    .string({ required_error: "El comentario es obligatorio" })
    .trim()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres"),
  rating: z.number().int().min(1).max(5).optional()
})

export const validateComment = (input) => commentSchema.safeParse(input)