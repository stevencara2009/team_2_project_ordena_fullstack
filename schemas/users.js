import z from "zod";

const userSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Name must be a string",
      required_error: "Name is required",
    })
    .min(2, "Name must have at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .trim(),

  lastname: z
    .string({
      invalid_type_error: "Lastname must be a string",
      required_error: "Lastname is required",
    })
    .min(2, "Lastname must have at least 2 characters")
    .max(50, "Lastname cannot exceed 50 characters")
    .trim(),

  dni: z
    .string({
      invalid_type_error: "dni must be a string",
      required_error: "dni is required",
    })
    .min(6, "dni must have at least 6 characters")
    .max(30, "dni cannot exceed 30 characters")
    .trim(),

  typeDocument: z.enum(
    ["CEDULA DE CIUDADANIA", "CEDULA DE EXTRANJERIA", "PASAPORTE", "NIT", "TARJETA DE IDENTIDAD"],
    {
      required_error: "Type document is required",
      invalid_type_error: "Invalid type document",
    }
  ),

  email: z
    .string({
      invalid_type_error: "Email must be a string",
      required_error: "Email is required",
    })
    .email("Invalid email format")
    .toLowerCase()
    .trim(),

  password: z
    .string({
      invalid_type_error: "Password must be a string",
      required_error: "Password is required",
    })
    .min(6, "Password must have at least 6 characters")
    .max(100, "Password cannot exceed 100 characters"),

  phone: z
    .string({
      invalid_type_error: "Phone must be a string",
      required_error: "Phone is required",
    })
    // Solo números entre 7 y 13 caracteres
    .regex(/^[0-9]{7,13}$/, {
      message: "Phone must contain only numbers between 7 and 13 digits",
    }),

  role: z.enum(
    ["ADMINISTRADOR", "MESERO", "COCINERO", "CLIENTE"],
    {
      required_error: "User role is required",
      invalid_type_error: "Invalid user role",
    }
  ),

  nationality: z
    .string({
      invalid_type_error: "Nationality must be a string",
      required_error: "Nationality is required",
    })
    .min(2, "Nationality must have at least 2 characters")
    .max(30, "Nationality cannot exceed 30 characters")
    .trim(),

  image: z
    .string()
    .optional(),

  active: z.boolean().default(true),

  birthdate: z
    .coerce // Convierte el string del input/JSON a un objeto Date de JS
    .date({
      invalid_type_error: "Invalid Birthdate format",
    }).nullable()
});

export function validateUser(input) {
  return userSchema.safeParse(input);
}

export function validatePartialUser(input) {
  return userSchema.partial().safeParse(input);
}