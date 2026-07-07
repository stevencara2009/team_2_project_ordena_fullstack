import { useState } from "react"
import styles from "./Suscribing.module.css"
import { Input } from "../../../components/Input/Input"
import { Button } from "../../../components/Button/Button"
import { Loader } from "../../../components/Loader/Loader"
import { useNavigate } from "react-router-dom"
export const Suscribing = () => {
  const [formData, setFormData] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formData === "") {
      alert("Ingresa un correo electrónico")
      return
    }
    const validEmail = formData.includes('@')
    if (!validEmail) {
      alert("Debes ingresar un correo válido")
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)

    console.log("El correo se ha suscrito: ", formData)
    setFormData("")
  }

  return (
    <section className={styles.section}>
      <h2 className={`${styles.title2} ${styles.suscriptionTitle}`}>Suscríbete</h2>
      <p className={styles.suscriptionParagraph}>Recibe noticias, promociones especiales y nuevos platos directamente en tu correo. Sé el primero en enterarte de nuestras novedades y disfruta beneficios exclusivos.</p>
      <div className={styles.formText}>
        <form onSubmit={handleSubmit} >
          <fieldset>
            <legend>Datos personales</legend>
            <Input
              label="Correo"
              type="text"
              className="labelBase"
              placeholder=""
              name="email"
              value={formData}
              onChange={(e) => setFormData(e.target.value)}
              variant="Light"
            />
            <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}><Button text="Suscribirse" className="btnLink" type="submit" /></div>
          </fieldset>
        </form>
        {loading && <Loader />}
      </div>
    </section>
  )
}