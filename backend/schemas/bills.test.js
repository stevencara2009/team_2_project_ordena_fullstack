import { validateBill } from "./bills";

describe("Unit Tests: backend/schemas/bills.js", () => {
  
  test("Debe validar exitosamente una factura con todos los datos correctos", () => {
    const inputValido = {
      order_id: 1,
      cashier_id: 2,
      client_id: 3,
      payment_method: "EFECTIVO",
    };

    const result = validateBill(inputValido);

    // Afirmamos que la validación sea correcta
    expect(result.success).toBe(true);
  });

  test("Debe fallar si el método de pago es incorrecto", () => {
    const inputInvalido = {
      order_id: 1,
      cashier_id: 2,
      client_id: 3,
      payment_method: "PERMUTA",
    };

    const result = validateBill(inputInvalido);

    expect(result.success).toBe(false);
    // Opcional: Verificar que el mensaje de error mencione el capacity
    expect(result.error.issues[0].path[0]).toBe("payment_method");
  });

  test("Debe fallar si falta un campo requerido como el método de pago", () => {
    const inputIncompleto = {
      order_id: 1,
      cashier_id: 2,
      client_id: 3,
    };

    const result = validateBill(inputIncompleto);

    expect(result.success).toBe(false);
  });

});
