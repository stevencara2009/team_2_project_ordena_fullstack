import { Button } from '../../components/Button/Button'
import styles from './Products.module.css'
import { ProductItem } from './ProductItem/ProductItem'
import { useEffect, useState } from 'react'
import { Input, InputSelect } from '../../components/Input/Input'
import { Loader } from '../../components/Loader/Loader'

export const Products = () => {
  const [products, setProducts] = useState([])
  const [plateType, setPlateType] = useState("Todos")
  const [product, setProduct] = useState("")
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    typeProduct: "",
    price: 0,
    description: "",
    file: ""
  })
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

  // CAPTURAR DATOS DE FORMULARIO CREACION DE USUARIO
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }


  // ENVIAR DATOS DE FORMULARIO CREACION DE PRODUCTO
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.typeProduct === "") {
      alert("Selecione un tipo de producto")
      return
    }
    const emptyFields = Object.entries(formData).some(([key, value]) => value === "")
    if (emptyFields) {
      alert("Hay campos vacíos")
      return
    }
    console.log(`El formulario enviado es: `, formData)
    alert("Producto creado correctamente: ", formData.name)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)

    setFormData({
      name: "",
      typeProduct: "",
      price: 0,
      description: "",
      file: ""
    })

  }

  return (
    <div className="background">
      <div className="container">
        <h1>Productos</h1>

        <form >
          <fieldset className="formFlex">
            <legend></legend>
            <Input
              label="Buscar"
              type="text"
              className="inputPrimary"
              placeholder=""
              name="productName"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              variant='dark'
            />

            <div className={styles.divSearch}>
              <button type='button' ><i className="fa-solid fa-magnifying-glass" style={{ width: 25, height: 25 }}></i></button>
            </div>

            <InputSelect
              label="Tipo de comida"
              type="text"
              className="inputPrimary"
              name=""
              value=""
              placeholder=""
              onChange={(e) => setPlateType(e.target.value)}
              data={PLATES_TYPE}
            />
          </fieldset>
        </form>

        <div className="contentFlex">
          {/* Modulo Platillos*/}
          <div className="module">
            <ProductItem products={productsFiltered} />
          </div>

          {/* Modulo Formulario Nuevo Platillo*/}
          <div className="module">
            <form onSubmit={handleSubmit}>
              <fieldset>
                <legend></legend>
                <h2>Platillo</h2>
                <div className={styles.displayForm}>
                  <Input
                    label="Nombre"
                    type="text"
                    className="inputPrimary"
                    placeholder=""
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                  <InputSelect
                    label="Tipo de comida"
                    className="inputPrimary"
                    name="typeProduct"
                    value={formData.typeProduct}
                    onChange={handleChange}
                    data={PLATES_TYPE}
                  />

                  <Input
                    label="Precio"
                    type="number"
                    className="inputPrimary"
                    placeholder=""
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    label="Descripción"
                    type="text"
                    className="inputPrimary"
                    placeholder="Añada una descripción del producto..."
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    label="Imágenes"
                    type="text"
                    className="inputPrimary"
                    placeholder="Subir URL foto"
                    name="file"
                    value={formData.file}
                    onChange={handleChange}
                    required
                  />

                  <div className={styles.divActionsOrder}>
                    <Button className='btnDelete' text='Eliminar' />
                    <Button className='btnAdd' text='Añadir' type='submit' />
                  </div>

                </div>
              </fieldset>

            </form>
            {loading && <Loader />}
          </div>

        </div>
      </div>
    </div>
  )
}