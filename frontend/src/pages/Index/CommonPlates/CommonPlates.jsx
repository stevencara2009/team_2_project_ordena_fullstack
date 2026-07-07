import styles from './CommonPlates.module.css'

export const CommonPlates = () => {

  return (
    <section className={styles.menu}>
      <h2 className={`${styles.title2} ${styles.menuTitle}`}>Platos clásicos</h2>
      <p className={styles.menuParagraph}>Una selección de los platos más representativos de Colombia, preparados
        con ingredientes frescos y recetas tradicionales que conservan el sabor
        auténtico de cada región.</p>

      <div className={styles.platillos}>

        <article className={styles.platos}>
          <h3 className={styles.platilloTitle}>Bandeja Paisa</h3>
          <div className={styles.img1}></div>
          <h3>$ 25.900</h3>
          <p className={styles.platosParagraph}>Frijoles, arroz, carne molida, chicharrón, huevo frito, plátano maduro, arepa y aguacate. Un plato completo y lleno de tradición antioqueña.</p>
        </article>

        <article className={styles.platos}>
          <h3 className={styles.platilloTitle}>Ajiaco Santafereño</h3><h3>$ 18.500</h3>
          <div className={styles.img2}></div>
          <p className={styles.platosParagraph}>Sopa típica bogotana preparada con pollo, papa criolla, mazorca y guascas, acompañada de arroz, alcaparras y crema de leche.</p>
        </article>

        <article className={styles.platos}>
          <h3 className={styles.platilloTitle}>Sancocho de Gallina</h3>
          <div className={styles.img3}></div>
          <h3>$ 22.000</h3>
          <p className={styles.platosParagraph}> Caldo espeso con gallina criolla, yuca, papa, plátano y mazorca,
            perfecto para compartir en familia con arroz y aguacate.</p>
        </article>

      </div>
    </section>
  )
}