import styles from './CreateOrder.module.css'
import { CardOrder } from '../Viewport/CardOrder/CardOrder'
import { Link } from "react-router-dom"
import { ButtonAdd, ButtonBack } from '../../components/Button/Button'

export const CreateOrder = () => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1>Creá un pedido</h1>

        <div className={styles.contentFlex}>

          {/* Modulo Formulario Nuevo Pedido*/}
          <div className={styles.module}>
            <form action="" >
              <div className={styles.formFlex}>
                <label htmlFor="table-id">N° de mesa
                  <input type="number" id="table-id" className={styles.inputTable} />
                </label>

                <label htmlFor="order-id">N° de pedido
                  <input type="number" id="order-id" className={styles.inputTable} />
                </label>

                <div className={styles.divSearch}>
                  <button type='button' ><i className="fa-solid fa-magnifying-glass" style={{ width: 25, height: 25 }}></i></button>
                </div>
              </div>

              <h2>Añadí a tu pedido</h2>
              <div className={styles.displayForm}>
                <label htmlFor="product-category">Tipo
                  <select id="product-category" className={styles.inputRegister}>
                    <option value="">Sopa</option>
                    <option value="">Plato fuerte</option>
                    <option value="">Bebida</option>
                    <option value="">Comida Rápida</option>
                  </select>
                </label>

                <label htmlFor="productName">Plato
                  <input type="text" id="productName" placeholder="Elegí el platillo" required className={styles.inputRegister} />
                </label>

                <label htmlFor="productQuantity">Cantidad
                  <input type="password" id="productQuantity" placeholder="0" required className={styles.inputRegister} />
                </label>

                <label htmlFor="productDescription">Observación
                  <input type="text" id="productDescription" placeholder='Ingrese alguna nota relevante sobre el pedido...' required className={styles.inputRegister} />
                </label>

                <div className={styles.divActionsOrder}>
                  <ButtonBack />
                  <ButtonAdd />

                </div>

              </div>

            </form>
          </div>

          {/* Modulo Detalle Pedido*/}
          <div className={styles.module}>
            <CardOrder />
          </div>

        </div>
      </div>
    </div>
  )
}