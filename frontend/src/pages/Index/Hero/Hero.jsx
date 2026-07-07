import styles from './Hero.module.css'
import { Button } from "../../../components/Button/Button"
import { useEffect, useState } from 'react'
import img1 from "../../../assets/background.jpg"
import img2 from "../../../assets/background2.jpg"
import img3 from "../../../assets/background3.jpg"
import { Navigate, useNavigate } from 'react-router-dom'

export const Hero = () => {
  const imagesHero = [img1, img2, img3]
  const [imgHero, setImgHero] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const intervalo = setInterval(() => {
      setImgHero((prev) => (prev + 1) % imagesHero.length)
    }, 5000);

    return () => clearInterval(intervalo)
  }, [])



  return (
    <section className={styles.corpus} style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
      url(${imagesHero[imgHero]})`, backgroundSize: 'cover', backgroundPosition:'center'
    }}
    >
      <div className={styles.corpusTxt}>
        <h1 className={styles.title1}>Resturante Avenida las Palmas</h1>
        <p className={styles.corpusParagraph}>Disfruta lo mejor de la comida típica colombiana en un solo lugar.
          Sabores auténticos, recetas tradicionales y el sazón de casa que
          nos caracteriza. Desde un buen ajiaco santafereño hasta una bandeja
          paisa bien servida, aquí encuentras el verdadero gusto de nuestra tierra.</p>
        <Button text="Ver menú" className="btnLink" onClick={()=>navigate("/menu")} />
      </div>
    </section>
  )
}