import { useState } from 'react'
import styles from './MenuItem.module.css'
import no_img from '../../../assets/no_image.png'

export const MenuItem = ({ products }) => {

  const [selectedProduct, setSelectedProduct] = useState(null)

  return (
    <>
      {products.map((p) => (
        <div className={`${styles.productItem} ${selectedProduct === p.id ? styles.productOrange : styles.productItem}`} key={p.id} onClick={() => setSelectedProduct(p.id)}  >
          <img src={p.image || no_img } alt={p.name} className={styles.productItemImg} onError={(e) => {
            e.target.onError = null;
            e.target.src = no_img;
          }}/>
          <h4 className={styles.productItemTitle}>{p.name}</h4>
          <p className={styles.productItemDescription}>{p.description} </p>
          <p className={styles.productItemPrice}><b>${p.price} COP</b></p>
        </div>
      ))}
    </>
  )
}