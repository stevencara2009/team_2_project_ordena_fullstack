import { Footer } from "../../layouts/Footer/Footer"
import { SpecialPlates } from "./SpecialPlates/SpecialPlates"
import styles from "./Index.module.css"
import { Button } from "../../components/Button/Button"
import { Statistics } from "./Statistics/Statistics"
import { Suscribing } from "./Suscribing/Suscribing"
import { CommonPlates } from "./CommonPlates/CommonPlates"
import { Hero } from "./Hero/Hero"
import { Location } from "./Location/Location"
import { FinalText } from "./FinalText/FinalText"


export const Index = () => {

  return (
    <main className={styles.main}>

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
      <FinalText/>

      {/* Seccion Suscríbete */}
      <Suscribing />

      {/* Pie de página */}
      <Footer />

    </main>

  )
}