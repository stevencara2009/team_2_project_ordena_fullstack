import { ButtonAdd, ButtonAddUser, ButtonDelete } from '../../components/Button/Button'
import styles from './Products.module.css'
import { ProductItem } from './ProductItem/ProductItem'
import { useEffect, useState } from 'react'

export const Products = () => {
  const [products, setProducts] = useState([])
  const [filter, setFilter] = useState("Todos")

  useEffect(() => {
    fetch('/api/products.json')
      .then(response => response.json())
      .then(result => {
        setProducts(result)
      })
      .catch(error => console.error("Error cargando el archivo: ", error))
  }, [])


  const handleInputChange = (e) => {
    setFilter(e.target.value)
  }

  const productsFiltered = products.filter((product) => {
    if (filter === "" || filter === "Todos") return true;
    return product.category === filter
  })

  return (
    <div className="background">
      <div className="container">
        <h1>Menú</h1>

        <form action="" className="formFlex">
          <label htmlFor="order-id">
            <input type="number" id="order-id" className={styles.inputTable} />
          </label>
          <div className={styles.divSearch}>
            <button type='button' ><i className="fa-solid fa-magnifying-glass" style={{ width: 25, height: 25 }}></i></button>
          </div>
          <label htmlFor="food-type">Tipo
            <select id="food-type" className={styles.inputTable} onChange={handleInputChange}>
              <option value="Todos">Todos</option>
              <option value="Hamburguesas">Hamburguesas</option>
              <option value="Pizzas">Pizzas</option>
              <option value="Ensaladas">Ensaladas</option>
              <option value="Mexicana">Mexicana</option>
              <option value="Japonesa">Japonesa</option>
              <option value="Pastas">Pastas</option>
              <option value="Bebidas">Bebidas</option>
              <option value="Saludable">Saludable</option>
              <option value="Carnes">Carnes</option>
              <option value="Postres">Postres</option>
              <option value="Niños">Niños</option>
              <option value="Acompañamientos">Acompañamientos</option>
              <option value="Entradas">Entradas</option>
              <option value="Internacional">Internacional</option>
            </select>
          </label>
        </form>

        <div className="contentFlex">
          {/* Modulo Formulario Nuevo Platillo*/}
          <div className="module">
            <ProductItem products={productsFiltered} />
          </div>

          {/* Modulo Formulario Nuevo Platillo*/}
          <div className="module">
            <form action="" >

              <h2>Platillo</h2>
              <div className={styles.displayForm}>
                <label htmlFor="product-name">Nombre
                  <input type="text" id="product-name" placeholder="Bandeja Paisa" required className={styles.inputRegister} />
                </label>

                <label htmlFor="product-category">Tipo
                  <select id="product-category" className={styles.inputRegister}>
                    <option value="">Sopas</option>
                    <option value="">Fast food</option>
                    <option value="">Bebidas</option>
                    <option value="">Postres</option>
                    <option value="">Italiana</option>
                    <option value="">Entradas</option>
                    <option value="">Mexicana</option>
                    <option value="">Ensaladas</option>
                    <option value="">Vinos</option>
                  </select>
                </label>

                <label htmlFor="product-price">Precio
                  <input type="number" id="product-price" placeholder="" required className={styles.inputRegister} />
                </label>

                <label htmlFor="product-description">Descripción
                  <input type="text" id="product-description" placeholder="Añada una descripción del producto..." required className={styles.inputRegister} />
                </label>

                <label htmlFor="product-image">Imágenes
                  <input type="file" id="product-description" className={styles.inputRegister} />
                </label>

                <div className={styles.divActionsOrder}>
                  <ButtonDelete />
                  <ButtonAdd />
                </div>

              </div>

            </form>
          </div>

        </div>

      </div>
    </div>
  )
}