import z from "zod";

const billSchema = z.object({
  order_id: z
    .number({ required_error: "Order id is required" })
    .int()
    .positive(),

  cashier_id: z
    .number({ required_error: "Cashier id is required" })
    .int()
    .positive(),

  client_dni: z.string().trim().min(1).optional().nullable(),

  payment_method: z.enum(["EFECTIVO", "TARJETA"], {
    required_error: "Payment method is required",
  }),
});

export function validateBill(input) {
  return billSchema.safeParse(input);
}
