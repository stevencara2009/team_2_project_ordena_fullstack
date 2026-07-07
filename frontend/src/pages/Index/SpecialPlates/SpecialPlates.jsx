import styles from './SpecialPlates.module.css'
import { Button } from "../../../components/Button/Button"


export const SpecialPlates = () => {

  return (
    <>
      <section className={styles.section}>
        <h2 className={`${styles.title2} ${styles.menuTitle}`}>Carta ejecutiva</h2>
        <p className={styles.menuParagraph}>Una selección de los platos más representativos de Colombia, preparados
          con ingredientes frescos y recetas tradicionales que conservan el sabor
          auténtico de cada región.</p>

        <div className={styles.platillos}>

          <article className={styles.platos}>
            <h3 className={styles.platilloTitle}>Sobrebarriga en Salsa</h3><h3>$ 25.900</h3>
            <div className={`${styles.img1}`}></div>
            <p className={styles.platosParagraph}>Tierna sobrebarriga cocinada lentamente en salsa criolla, acompañada de arroz blanco, papa salada y ensalada fresca. Un clásico lleno de sabor.</p>
            {/* <Button text="Ordenar pedido" className="btnLink" /> */}
          </article>

          <article className={styles.platos}>
            <h3 className={styles.platilloTitle}>Mojarra Frita</h3><h3>$ 32.000</h3>
            <div className={`${styles.img2}`}></div>
            <p className={styles.platosParagraph}>Mojarra fresca frita al punto perfecto, acompañada de arroz con coco, patacones y ensalada. Un plato típico de la costa caribe colombiana.</p>
            {/* <Button text="Ordenar pedido" className="btnLink" /> */}
          </article>

          <article className={styles.platos}>
            <h3 className={styles.platilloTitle}>Baby Beef</h3><h3>$ 40.000</h3>
            <div className={`${styles.img2}`}></div>
            <p className={styles.platosParagraph}>Mojarra fresca frita al punto perfecto, acompañada de arroz con coco, patacones y ensalada. Un plato típico de la costa caribe colombiana.</p>
            {/* <Button text="Ordenar pedido" className="btnLink" /> */}
          </article>

        </div>
      </section>
    </>
  )
}