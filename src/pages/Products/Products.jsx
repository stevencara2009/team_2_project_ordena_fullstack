import { Button } from '../../components/Button/Button'
import styles from './Products.module.css'
import { ProductItem } from './ProductItem/ProductItem'
import { useEffect, useState } from 'react'
import { Input, InputSelect } from '../../components/Input/Input'

export const Products = () => {
  const [products, setProducts] = useState([])
  const [plateType, setPlateType] = useState("Todos")

  const PLATES_TYPE = ["Todos", "Hamburguesas", "Pizzas", "Ensaladas", "Mexicana", "Japonesa", "Pastas", "Bebidas", "Saludable", "Carnes", "Postres", "Niños", "Acompañamientos", "Entradas", "Internacional"]

  useEffect(() => {
    fetch('/api/products.json')
      .then(response => response.json())
      .then(result => {
        setProducts(result)
      })
      .catch(error => console.error("Error cargando el archivo: ", error))
  }, [])


  const productsFiltered = products.filter((product) => {
    if (plateType === "" || plateType === "Todos") return true;
    return product.category === plateType
  })

  return (
    <div className="background">
      <div className="container">
        <h1>Menú</h1>

        <form action="" className="formFlex">
          <Input
            label="Buscar"
            type="text"
            className="inputPrimary"
            placeholder=""
            name=""
            value=""
            onChange={() =>{}}
            variant='dark'
          />

          <div className={styles.divSearch}>
            <button type='button' ><i className="fa-solid fa-magnifying-glass" style={{ width: 25, height: 25 }}></i></button>
          </div>

          <InputSelect
            label="Tipo de comida"
            type="text"
            className="inputPrimary"
            placeholder=""
            onChange={(e) => setPlateType(e.target.value) }
            data={PLATES_TYPE}
          />
        </form>

        <div className="contentFlex">
          {/* Modulo Platillos*/}
          <div className="module">
            <ProductItem products={productsFiltered} />
          </div>

          {/* Modulo Formulario Nuevo Platillo*/}
          <div className="module">
            <form action="" >
              <h2>Platillo</h2>
              <div className={styles.displayForm}>
                <Input
                  label="Nombre"
                  type="text"
                  className="inputPrimary"
                  placeholder=""
                  name=""
                  value=""
                  onChange={() =>{}}
                  required
                />

                <InputSelect
                  label="Tipo de comida"
                  type="text"
                  className="inputPrimary"
                  placeholder=""
                  onChange={(e) => setPlateType(e.target.value) }
                  data={PLATES_TYPE}
                />

                <Input
                  label="Precio"
                  type="number"
                  className="inputPrimary"
                  placeholder=""
                  name=""
                  value=""
                  onChange={() =>{}}
                  required
                />

                <Input
                  label="Descripción"
                  type="text"
                  className="inputPrimary"
                  placeholder="Añada una descripción del producto..."
                  name=""
                  value=""
                  onChange={() =>{}}
                  required
                />

                <Input
                  label="Imágenes"
                  type="file"
                  className="inputPrimary"
                  placeholder="Añada una descripción del producto..."
                  name=""
                  value=""
                  onChange={() =>{}}
                  required
                />

                <div className={styles.divActionsOrder}>
                  <Button className='btnDelete' text='Eliminar' />
                  <Button className='btnAdd' text='Añadir' />
                </div>

              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  )
}