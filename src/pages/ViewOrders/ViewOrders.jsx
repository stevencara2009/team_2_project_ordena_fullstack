import { useState } from 'react'
import { CardOrder } from '../Dashboard/CardOrder/CardOrder'
import { Tables } from '../Dashboard/Tables/Tables'
import { OrderItem } from './OrderItem/OrderItem'
import styles from './ViewOrders.module.css'
import { InputSelect } from '../../components/Input/Input'

export const ViewOrders = () => {
  const [filter, setFilter] = useState("")

  const FILTERS_BY = ["Más reciente", "Más antiguos", "Mayor precio", "Menor precio"]

  return (
    <div className="background">

      <div className="container">
        <h1>Ver pedidos</h1>
        <div className="contentFlex">

          {/* Modulo mesas*/}
          <div className="module">
            <OrderItem />

          </div>

          {/* Modulo pedidos asociados a mesa*/}
          <div className="module">
            <form action="" className="formFlex">
              <InputSelect
                label="Filtrar por"
                type="text"
                className="inputTable"
                placeholder=""
                onChange={(e) => setFilter(e.target.value)}
                data={FILTERS_BY}
              />
              <div className={styles.divFilter}>
                <button type='button' ><i className="fa-solid fa-filter" style={{ width: 25, height: 25 }}></i></button>
              </div>
            </form>
            <CardOrder />
          </div>

        </div>
      </div>
    </div>
  )
}