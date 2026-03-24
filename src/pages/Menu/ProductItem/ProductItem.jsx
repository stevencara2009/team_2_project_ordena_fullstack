import styles from './ProductItem.module.css'

export const ProductItem = () => {
  return (
    <div className={styles.productItem}>
      <h4 className={styles.productItemTitle}>Ajiaco Santafereño</h4>
      <p className={styles.productItemDescription}>Aguacate, arroz, plátano maduro, ensalada blanca</p>
      <p className={styles.productItemPrice}><strong>$50000</strong></p>
    </div>
  )
}