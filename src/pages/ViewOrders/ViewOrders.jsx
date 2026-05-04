import { useEffect, useState } from 'react'
import { CardOrder } from '../Dashboard/CardOrder/CardOrder'
import { Tables } from '../Dashboard/Tables/Tables'
import { OrderItem } from './OrderItem/OrderItem'
import styles from './ViewOrders.module.css'
import { InputSelect } from '../../components/Input/Input'

export const ViewOrders = () => {
  const [filter, setFilter] = useState("")
  const [orders, setOrders] = useState([])

  const FILTERS_BY = ["Más reciente", "Más antiguos", "Mayor precio", "Menor precio"]

  // API GET: OBTENER DATOS DE USUARIOS
  useEffect(() => {
    fetch('/api/orders.json')
      .then(response => response.json())
      .then(result => {
        setOrders(result)
      })
      .catch(error => console.log("Error cargando archivo: ", error))
  }, [])


  return (
    <div className="background">

      <div className="container">
        <h1>Ver pedidos</h1>
        <div className="contentFlex">

          {/* Modulo mesas*/}
          <div className="module">
            <OrderItem orders={orders} />
          </div>

          {/* Modulo pedidos asociados a mesa*/}
          <div className="module">
            <form >
              <fieldset className="formFlex">
                <legend></legend>
                <InputSelect
                  label="Filtrar por"
                  type="text"
                  className="inputPrimary"
                  placeholder=""
                  onChange={(e) => setFilter(e.target.value)}
                  data={FILTERS_BY}
                />
                <div className={styles.divFilter}>
                  <button type='button' ><i className="fa-solid fa-filter" style={{ width: 25, height: 25 }}></i></button>
                </div>
              </fieldset>
            </form>
            <CardOrder />
          </div>

        </div>
      </div>
    </div>
  )
}