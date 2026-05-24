import z from "zod";

const productSchema = z.object({
  name: z.string({
    invalid_type_error: "Product title must be a string",
    required_error: "Product title is required",
  }),
  category: z.array(
    z.enum([
      "Entrada",
      "Plato fuerte",
      "Sopa",
      "Comida colombiana"
    ]),
    {
      required_error: "Product category is required",
      invalid_type_error: "Product category must be an array of enum category"
    }
  ),
  price: z.number().int().positive(),
  image: z.string().url({ message: "poster must be a valid url" }),
  availability: z.boolean().default(true)
});

export function validateProduct(input) {
  return productSchema.safeParse(input)
}

export function validatePartialProduct(input) {
  return productSchema.partial().safeParse(input)
}
