import { Footer } from "../../layouts/Footer/Footer"
import { SpecialPlates } from "./SpecialPlates/SpecialPlates"
import styles from "./Index.module.css"
import { Button } from "../../components/Button/Button"
import { Statistics } from "./Statistics/Statistics"
import { Suscribing } from "./Suscribing/Suscribing"
import { CommonPlates } from "./CommonPlates/CommonPlates"
import { Hero } from "./Hero/Hero"
import { Location } from "./Location/Location"

export const Index = () => {

  return (
    <main className={styles.hero}>

      {/* Seccion Hero */}
      <Hero />

      {/* Seccion Platos clásicos */}
      <CommonPlates />

      {/* Seccion Carta Ejecutiva */}
      <SpecialPlates />

      {/* Seccion Reseñas */}
      <Statistics />

      {/* Seccion Ubicación */}
      <Location />

      {/* Seccion Texto Final */}
      <section className={styles.finalTxt}>
        <p className={styles.finalTxtParagraph}> En Restaurante Avenida Las Palmas trabajamos cada día para llevar a tu mesa lo mejor de nuestra tradición culinaria. Cada plato es preparado con dedicación,
          ingredientes frescos y ese toque casero que nos hace sentir como en familia.</p>
        <h2 className={`${styles.title2} ${styles.finalTxtTitle}`} >El sabor de Colombia en cada bocado</h2>
      </section>

      {/* Seccion Suscríbete */}
      <Suscribing />

      {/* Pie de página */}
      <Footer />
    </main>

  )
}