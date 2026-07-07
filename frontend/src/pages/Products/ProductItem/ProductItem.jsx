import { useState } from 'react'
import styles from './ProductItem.module.css'


export const ProductItem = ({ products, onSelectProduct }) => {

  const [selectedProduct, setSelectedProduct] = useState(null)

  return (
    <>
      {products.map((product) => (
        <div className={`${styles.productItem} ${selectedProduct === product.id ? styles.productOrange : styles.productDark}`} key={product.id || product._id} onClick={() => {
          setSelectedProduct(product.id)
          onSelectProduct(product)
        }}  >
          <h4 className={styles.productItemTitle}>{product.name}</h4>
          <p className={styles.productItemDescription}>{product.description}</p>
          <p className={styles.productItemPrice}><b>{product.price}</b></p>
        </div>
      ))}
    </>
  )
}