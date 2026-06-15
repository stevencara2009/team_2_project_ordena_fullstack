import { CardOrder } from './CardOrder/CardOrder'
import { Tables } from '../Tables/Tables'
import { useState } from 'react'


export const Dashboard = () => {
  const [selectedTable, setSelectedTable] = useState(null);


  return (
    <div className="background">
      <div className="container">
        <div className="container-form">
          <h1>Mesas</h1>
          <div className="container-flex">

            {/* Modulo mesas*/}
            <div className="module">
              <Tables selectedTable={selectedTable}
                setSelectedTable={setSelectedTable} />
            </div>

            {/* Modulo pedidos asociados a mesa*/}
            <div className="module">
              <CardOrder selectedTable={selectedTable} />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}