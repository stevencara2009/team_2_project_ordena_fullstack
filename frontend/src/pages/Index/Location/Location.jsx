import styles from './Location.module.css'

export const Location = () => {

  return (
    <section className={styles.location}>
      <h2 className={`${styles.title2} ${styles.presentationTitle}`}>Ubicación</h2>
      <iframe
        title="Google Maps"
        src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d6266.992202209579!2d-74.05446698973667!3d4.6711911980960945!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sco!4v1777247350830!5m2!1ses!2sco"
        className={styles.map}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>
  )
}