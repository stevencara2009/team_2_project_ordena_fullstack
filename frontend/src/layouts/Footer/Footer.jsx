import styles from "./Footer.module.css"

export const Footer = () => {
  return (
    <footer className={styles.footer} >

      <section className={styles.footerContainer}>
        <article className={styles.footerContainerDiv}>
          <h3>Nosotros</h3>
          <p> Somos un restaurante enfocado en resaltar la riqueza gastronómica colombiana, ofreciendo platos tradicionales con ingredientes de alta calidad y un servicio cercano.</p>
        </article>

        <article className={styles.footerContainerDiv}>
          <h3>Nuestro compromiso</h3>
          <p>Nos esforzamos por brindar una experiencia única en cada visita, cuidando cada detalle
            desde la cocina hasta la atención al cliente.</p>
        </article>

        <article className={styles.footerContainerDiv}>
          <h3>Horarios</h3>
          <p>Lunes a sábado: 11:00 AM - 9:00 PM<br />
            Domingos y festivos: 11:00 AM - 6:00 PM</p>
        </article>

        <article className={styles.footerContainerDiv}>
          <h3>Contacto</h3>

          <p style={{ marginBottom: "0px" }}><i className="fa-solid fa-phone" style={{ color: 'rgb(255, 255, 255)' }}></i> 300 123 4567</p>
          <p style={{ marginBottom: "0px" }}><i className="fa-solid fa-envelope" style={{ color: 'rgb(255, 255, 255)' }}></i> contacto@avenidalaspalmas.com</p>
          <p style={{ marginBottom: "0px" }}><i className="fa-solid fa-location-dot" style={{ color: 'rgb(255, 255, 255)' }}></i> Calle 90 #11-20 Chapinero, Bogotá, Colombia
          </p>
          
          <h3>Redes Sociales</h3>
          <i className={`fa-brands fa-square-facebook ${styles.icon}`}></i>
          <i className={`fa-brands fa-instagram ${styles.icon}`}></i>
          <i className={`fa-brands fa-youtube ${styles.icon}`}></i>

        </article>

      </section>

      <section>
        <p>2026 | Todos los Derechos Reservados ®</p>
      </section>

    </footer>
  )
}