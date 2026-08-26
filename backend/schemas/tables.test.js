import { validateTable, validatePartialTable } from "./tables";

describe("Unit Tests: backend/schemas/tables.js", () => {
  test("Debe validar exitosamente una mesa con todos los datos correctos", () => {
    const inputValido = {
      number: 1,
      capacity: 10,
      state: "LIBRE"
    };

    const result = validateTable(inputValido);

    // Afirmamos que la validación sea correcta
    expect(result.success).toBe(true);
  });

  test("Debe fallar si la capacidad es número negativo", () => {
    const inputInvalido = {
      number: 1,
      capacity: -10,
      state: "LIBRE"
};

    const result = validateTable(inputInvalido);

    expect(result.success).toBe(false);
    // Opcional: Verificar que el mensaje de error mencione el capacity
    expect(result.error.issues[0].path[0]).toBe("capacity");
  });

  test("Debe fallar si falta un campo requerido como la capacidad", () => {
    const inputIncompleto = {
      number: 1,
      state: "LIBRE"
    };

    const result = validateTable(inputIncompleto);

    expect(result.success).toBe(false);
  });
  
});
