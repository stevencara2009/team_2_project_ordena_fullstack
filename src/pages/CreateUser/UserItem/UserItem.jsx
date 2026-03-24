import styles from './UserItem.module.css'

export const UserItem = () => {
  return (
    <div className={styles.userItem}>
      <h4 className={styles.userItemTitle}>Mario José Forero Díaz</h4>
      <p className={styles.userItemName}>Operativo</p>
    </div>
  )
}