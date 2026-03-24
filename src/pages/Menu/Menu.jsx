import { ButtonAdd, ButtonAddUser, ButtonDelete } from '../../components/Button/Button'
import styles from './Menu.module.css'
import { ProductItem } from './ProductItem/ProductItem'

export const Menu = () => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1>Menú</h1>

        <form action="" className={styles.formFlex}>
          <label htmlFor="order-id">
            <input type="number" id="order-id" className={styles.inputTable} />
          </label>
          <div className={styles.divSearch}>
            <button type='button' ><i className="fa-solid fa-magnifying-glass" style={{ width: 25, height: 25 }}></i></button>
          </div>
        </form>

        <ul className={styles.menuUsers}>
          <li>Sopas</li>
          <li>Fast food</li>
          <li>Bebidas</li>
          <li>Postres</li>
          <li>Italiana</li>
          <li>Entradas</li>
          <li>Mexicana</li>
          <li>Ensaladas</li>
          <li>Vinos</li>
          <li><ButtonAddUser /></li>
        </ul>

        <div className={styles.contentFlex}>
          {/* Modulo Formulario Nuevo Platillo*/}
          <div className={styles.module}>
            <ProductItem />
            <ProductItem />
            <ProductItem />
          </div>

          {/* Modulo Formulario Nuevo Platillo*/}
          <div className={styles.module}>
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