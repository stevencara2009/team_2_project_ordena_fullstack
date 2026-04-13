import { useState } from 'react'
import styles from './ProductItem.module.css'
export const ProductItem = ({ products }) => {

  const [selectedProduct, setSelectedProduct] = useState(null)

  return (
    <>
      {products.map((product) => (
        <div className={`${styles.productItem} ${selectedProduct === product.id ? styles.productOrange : styles.productDark}`} key={product.id} onClick={() => setSelectedProduct(product.id)}  >
          <h4 className={styles.productItemTitle}>{product.name}</h4>
          <p className={styles.productItemDescription}>{product.description}</p>
          <p className={styles.productItemPrice}><b>$50000</b></p>
        </div>
      ))}
    </>
  )
}