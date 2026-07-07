import styles from './FinalText.module.css'

export const FinalText = () => {

  return (
    <section className={styles.section}>
      <h2 className={`${styles.title2} ${styles.finalTxtTitle}`} >El sabor de Colombia en cada bocado</h2>
      <p className={styles.finalTxtParagraph}> En Restaurante Avenida Las Palmas trabajamos cada día para llevar a tu mesa lo mejor de nuestra tradición culinaria. Cada plato es preparado con dedicación,
        ingredientes frescos y ese toque casero que nos hace sentir como en familia.</p>
    </section>
  )
}