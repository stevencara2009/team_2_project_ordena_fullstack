import z from "zod";

const productSchema = z.object({
  name: z.string({
    invalid_type_error: "Product title must be a string",
    required_error: "Product title is required",
  }),
    description: z.string({
    invalid_type_error: "Description must be a string",
    required_error: "Description is required",
  }).optional(),
  category: z.array(
    z.enum([
      "Todos", "Hamburguesas", "Pizzas", "Ensaladas", "Mexicana", "Japonesa", "Pastas", "Bebidas", "Saludable", "Carnes", "Postres", "Niños", "Acompañamientos", "Entradas", "Internacional"
    ]),
    {
      required_error: "Product category is required",
      invalid_type_error: "Product category must be an array of enum category"
    }
  ),
  price: z.number().int().positive(),
  image: z.string().optional(),
  availability: z.boolean().default(true)
});

export function validateProduct(input) {
  return productSchema.safeParse(input)
}

export function validatePartialProduct(input) {
  return productSchema.partial().safeParse(input)
}
