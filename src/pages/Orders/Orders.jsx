import styles from './Orders.module.css'
import { CardOrder } from '../Dashboard/CardOrder/CardOrder'
import { Link } from "react-router-dom"
import { Button } from '../../components/Button/Button'
import { Input, InputSelect } from '../../components/Input/Input'
import { useState } from 'react'

export const Orders = () => {
  const [plateType, setPlateType] = useState("")
  const PLATES_TYPE = ["Todos", "Hamburguesas", "Pizzas", "Ensaladas", "Mexicana", "Japonesa", "Pastas", "Bebidas", "Saludable", "Carnes", "Postres", "Niños", "Acompañamientos", "Entradas", "Internacional"]



  return (
    <div className="background">
      <div className="container">
        <h1>Creá un pedido</h1>

        <div className="contentFlex">

          {/* Modulo Formulario Nuevo Pedido*/}
          <div className="module">
            <form action="" >
              <div className="formFlex">

                <Input
                  label="N° de mesa"
                  type="number"
                  className="inputTable"
                  placeholder=""
                  name=""
                  value=""
                  onChange={() => { }}
                  required
                  variant='dark'
                />

                <Input
                  label="N° de pedido"
                  type="number"
                  className="inputTable"
                  placeholder=""
                  name=""
                  value=""
                  onChange={() => { }}
                  required
                  variant='dark'
                />

                <div className={styles.divSearch}>
                  <button type='button' ><i className="fa-solid fa-magnifying-glass" style={{ width: 25, height: 25 }}></i></button>
                </div>

              </div>

              <h2>Añadí a tu pedido</h2>
              <div className={styles.displayForm}>

                <InputSelect
                  label="Tipo de comida"
                  type="text"
                  className="inputTable"
                  placeholder=""
                  onChange={(e) => setPlateType(e.target.value)}
                  data={PLATES_TYPE}
                />

                <Input
                  label="Platillo"
                  type="text"
                  className="inputPrimary"
                  placeholder="Elegí el platillo"
                  name=""
                  value=""
                  onChange={() => { }}
                  required
                  variant='dark'
                />

                <Input
                  label="Cantidad"
                  type="0"
                  className="inputPrimary"
                  placeholder="Elegí el platillo"
                  name=""
                  value=""
                  onChange={() => { }}
                  required
                  variant='dark'
                />

                <Input
                  label="Observación"
                  type="0"
                  className="inputPrimary"
                  placeholder="Ingrese alguna nota relevante sobre el pedido..."
                  name=""
                  value=""
                  onChange={() => { }}
                  required
                  variant='dark'
                />


                <div className={styles.divActionsOrder}>
                  <Button className="btnBack" text="Atrás" />
                  <Button text='Añadir' className='btnAdd' />
                </div>

              </div>

            </form>
          </div>

          {/* Modulo Detalle Pedido*/}
          <div className="module">
            <CardOrder />
          </div>

        </div>
      </div>
    </div>
  )
}