import { CardOrder } from './CardOrder/CardOrder'
import { Tables } from './Tables/Tables'
import styles from './Dashboard.module.css'
import { InputSelect } from '../../components/Input/Input'
import { useState } from 'react'

export const Dashboard = () => {
  const [filter, setFilter] = useState("")

  const FILTERS_BY = ["Más reciente", "Más antiguos", "Mayor precio", "Menor precio"]


  return (
    <div className="background">

      <div className="container">
        <h1>Mesas</h1>
        <div className="contentFlex">

          {/* Modulo mesas*/}
          <div className="module">
            <Tables />
          </div>

          {/* Modulo pedidos asociados a mesa*/}
          <div className="module">
            <form action="" className="formFlex">
              <InputSelect
                label="Tipo de comida"
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