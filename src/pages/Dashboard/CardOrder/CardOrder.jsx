import styles from './CardOrder.module.css'
import { Button } from '../../../components/Button/Button'
import { Input } from '../../../components/Input/Input'
import { useEffect } from 'react'

export const CardOrder = ({ products, setProducts, orders=[] }) => {

  useEffect(() => {
    // console.log("Productos se ha actualizado", products)
  }, [products])

  const totalResumen = products?.reduce((acc, product) => {
    const price = product.price ? product.price : 50000
    return acc + (price * product.quantity)
  }, 0)

  const deleteProduct = (indexToDelete) => {
    const updatedProducts = products.filter(( _,index) => indexToDelete !== index)
    setProducts(updatedProducts)
  }

  return (
    <div className={styles.cardOrder}>
      <h2 className={styles.cardTitle}>Mesa {orders.id} - Pedido #1053</h2>
      <div className={styles.state}>Pendiente</div>

      <label className={styles.labelCardItem}>Mesero: </label><span className={styles.spanCardItem}>Maria Isabel Perez</span>
      <br />
      <label className={styles.labelCardItem}>Fecha: </label><span className={styles.spanCardItem}>10/06/2025</span>

      {/* Tabla Orden */}
      <table className={styles.tableOrder}>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cant.</th>
            <th>Precio</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.price ? Number(product.price) : 50000}</td>
              <td>{(product.price ? Number(product.price) : 50000) * (product.quantity)}</td>
              <td><i className="fa-solid fa-trash-can" style={{color:"red"}}
              onClick={() => deleteProduct(index) }></i></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3"><strong>Total</strong></td>
            <td colSpan="1"><strong>$ {totalResumen}</strong></td>
          </tr>
        </tfoot>
      </table>

      <p>Observaciones</p>
      <ul className={styles.description}>
        {products?.map((product, index) => (
          <li key={index}>{product.description}</li>
        ))}
      </ul>

      <div className={styles.divActionsOrder}>
        <Button className='btnDelete' text='Eliminar' />
        <Button className='btnUpdate' text='Actualizar' />
      </div>

    </div>
  )
}