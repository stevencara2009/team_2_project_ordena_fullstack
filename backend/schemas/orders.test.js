import { validateOrder, validatePartialOrder } from "./orders";

describe("Unit Tests: backend/schemas/orders.js", () => {
  test("Debe validar exitosamente una orden con todos los datos correctos", () => {
    const inputValido = {
      table_number: 1,
      client_id: 3,
      user_id: 2,
      state: "PENDIENTE",
    };

    const result = validateOrder(inputValido);

    // Afirmamos que la validación sea correcta
    expect(result.success).toBe(true);
  });

  test("Debe fallar si el estado es incorrecto", () => {
    const inputInvalido = {
      table_number: 1,
      client_id: 3,
      user_id: 2,
      state: "VENDIDO",
    };

    const result = validateOrder(inputInvalido);

    expect(result.success).toBe(false);
    // Opcional: Verificar que el mensaje de error mencione el state
    expect(result.error.issues[0].path[0]).toBe("state");
  });

  test("Debe fallar si falta un campo requerido como el estado", () => {
    const inputIncompleto = {
      table_number: 1,
      client_id: 3,
      user_id: 2,
    };

    const result = validateOrder(inputIncompleto);

    expect(result.success).toBe(false);
  });
  
});
