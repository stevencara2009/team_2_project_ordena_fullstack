import { useEffect, useState } from 'react'
import { CardOrder } from '../Dashboard/CardOrder/CardOrder'
import { Tables } from '../Tables/Tables'
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
        <div className='container-form'>
          <h1>Ver pedidos</h1>
          
          <div className="container-flex">

            {/* Modulo mesas*/}
            <div className="module">
              <OrderItem orders={orders} />
            </div>

            {/* Modulo pedidos asociados a mesa*/}
            <div className="module">

              <CardOrder />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}