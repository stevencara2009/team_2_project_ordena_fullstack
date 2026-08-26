import { validateUser, validatePartialUser } from "./users";

describe("Unit Tests: backend/schemas/users.js", () => {
  test("Debe validar exitosamente un usuario con todos los datos correctos", () => {
    const inputValido = {
      name: "Marco",
      lastname: "Rubio",
      dni: "1089345678",
      typeDocument: "CEDULA DE CIUDADANIA",
      email: "lola.roa@gmail.com",
      password: "Sena11111#",
      phone: "3123456534",
      role: "MESERO",
      nationality: "Colombia",
      active: true,
      birthdate: "1990-12-11"
    };

    const result = validateUser(inputValido);

    // Afirmamos que la validación sea correcta
    expect(result.success).toBe(true);
  });

  test("Debe fallar si la contraseña es inválida tiene menos de 6 caracteres", () => {
    const inputInvalido = {
      name: "Marco",
      lastname: "Rubio",
      dni: "1089345678",
      typeDocument: "CEDULA DE CIUDADANIA",
      email: "lola.roa@gmail.com",
      password: "Se1#",
      phone: "3123456534",
      role: "MESERO",
      nationality: "Colombia",
      active: true,
      birthdate: "1990-12-11"
};

    const result = validateUser(inputInvalido);

    expect(result.success).toBe(false);
    // Opcional: Verificar que el mensaje de error mencione el password
    expect(result.error.issues[0].path[0]).toBe("password");
  });

  test("Debe fallar si falta un campo requerido como el role", () => {
    const inputIncompleto = {
      name: "Marco",
      lastname: "Rubio",
      dni: "1089345678",
      typeDocument: "CEDULA DE CIUDADANIA",
      email: "lola.roa@gmail.com",
      active: true,
      birthdate: "1990-12-11"
    };

    const result = validateUser(inputIncompleto);

    expect(result.success).toBe(false);
  });
  
});
