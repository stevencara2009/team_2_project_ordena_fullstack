import { validateProduct, validatePartialProduct } from './products'

describe('Unit Tests: backend/schemas/products.js', () => {

  test('Debe validar exitosamente un producto con todos los datos correctos', () => {
    const inputValido = {
      name: 'Hamburguesa Doble',
      price: 12000,
      category: ["Acompañamientos"],
      availability: true

    }

    const result = validateProduct(inputValido)

    // Afirmamos que la validación sea correcta
    expect(result.success).toBe(true)
  })

  test('Debe fallar si el precio es un número negativo', () => {
    const inputInvalido = {
      name: 'Hamburguesa Doble',
      price: -5.00,
      category: ["Acompañamientos"],
      availability: true
    }

    const result = validateProduct(inputInvalido)

    expect(result.success).toBe(false)
    // Opcional: Verificar que el mensaje de error mencione el precio
    expect(result.error.issues[0].path[0]).toBe('price')
  })

  test('Debe fallar si falta un campo requerido como el nombre', () => {
    const inputIncompleto = {
      price: 10.00
    }

    const result = validateProduct(inputIncompleto)

    expect(result.success).toBe(false)
  })
  
})