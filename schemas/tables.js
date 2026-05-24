import z from "zod";

const tableSchema = z.object({

  number: z.number().int().positive(),
  capacity: z.number().int().positive(),
  state: z.array(
    z.enum([
      "LIBRE",
      "OCUPADA",
      "RESERVADA"]),
    {
      required_error: "Table category is required",
      invalid_type_error: "Table category must be an array of enum category"
    }
  ),
});

export function validateTable(input) {
  return tableSchema.safeParse(input)
}

export function validatePartialTable(input) {
  return tableSchema.partial().safeParse(input)
}
