import styles from './Menu.module.css'
import { useEffect, useRef, useState } from 'react'
import { Input, InputSelect } from '../../components/Input/Input'
import { MenuItem } from './MenuItem/MenuItem'
import { PLATES_TYPE } from '../../data/options'
import { Loader } from '../../components/Loader/Loader'

const ScrollMenu = ({ onSetPlateType }) => {
  const [selectedType, setSelectedType] = useState(null)
  const scrollRef = useRef(null)

  const scroll = (direction) => {

    const scrollAmount = 400

    if (direction === 'left') {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    } else {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }

  }

  return (
    <nav className={styles.carouselContainer}>
      <button className={styles.navButton} onClick={() => scroll('left')}><i className="fa-solid fa-circle-chevron-left" ></i></button>
      <ul className={styles.listTypePlates} ref={scrollRef}>

        {PLATES_TYPE.map((p) => (
          <li className={`${styles.typePlateItem} ${selectedType === p ? styles.productOrange : styles.typePlateItem}`}
            key={p}
            onClick={() => { onSetPlateType(p); setSelectedType(p) }}
            data={PLATES_TYPE}  >{p}</li>
        ))}
      </ul>
      <button className={styles.navButton} onClick={() => scroll('right')}><i className="fa-solid fa-circle-chevron-right" ></i></button>
    </nav>
  )
}

export const Menu = () => {
  const [products, setProducts] = useState([])
  const [plateType, setPlateType] = useState("Todos")
  const [product, setProduct] = useState("")
  const [loading, setLoading] = useState(false)
  const [productSearched, setProductSearched] = useState("")

  useEffect(() => {
    fetch('/api/products.json')
      .then(response => response.json())
      .then(result => {
        setProducts(result)
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
        }, 800)
      })
      .catch(error => console.error("Error cargando el archivo: ", error))
  }, [])

  // Combinar filtro de categoría y el de búsqueda por nombre
  const filteredList = products.filter((p) => {
    const matchesCategory = plateType === "Todos" || p.category.toLowerCase() === plateType.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(productSearched.toLowerCase())
    return matchesCategory && matchesSearch
  })


  // ENVIAR DATOS DE FORMULARIO CREACION DE PRODUCTO
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="background">
      <div className="container">
        <div className='container-form'>
          <h1>Menú</h1>

          <form onSubmit={handleSubmit}>
            <fieldset className="form-flex">
              <legend>Filtro</legend>
              <Input
                label="Buscar"
                type="text"
                className="inputPrimary"
                placeholder=""
                name="productName"
                value={productSearched}
                onChange={(e) => setProductSearched(e.target.value)}
                variant='dark'
              />

              <div className="divSearch">
                <button type='button' ><i className="fa-solid fa-magnifying-glass" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "25px", textAlign: "center", cursor: "pointer" }}></i></button>
              </div>

            </fieldset>
          </form>

          <ScrollMenu onSetPlateType={setPlateType} />

          {loading ? <Loader /> : (
            <div className="container-flex">
              {/* Modulo Platillos*/}
              <div className={styles.gridPlates}>
                <MenuItem products={filteredList} />
              </div>

            </div>
          )}


        </div>


      </div>
    </div>
  )
}