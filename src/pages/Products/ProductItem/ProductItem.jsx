import styles from './ProductItem.module.css'
export const ProductItem = ({ products }) => {

  return (
    <>
      {products.map((product) => (
        <div className={styles.productItem} key={product.id}>
          <h4 className={styles.productItemTitle}>{product.name}</h4>
          <p className={styles.productItemDescription}>{product.description}</p>
          <p className={styles.productItemPrice}><b>$50000</b></p>
        </div>
      ))}
    </>
  )
}