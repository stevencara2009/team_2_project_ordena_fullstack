import styles from './Button.module.css'

export const ButtonBack = () => {
  return (
    <div className={`${styles.button} ${styles.buttonBack}`}>Atrás</div>
  )
}

export const ButtonAdd = () => {
  return (
    <div className={`${styles.button} ${styles.buttonAdd}`}>Añadir</div>
  )
}

export const ButtonUpdate = () => {
  return (
    <div className={`${styles.button} ${styles.buttonUpdate}`}>Actualizar</div>
  )
}

export const ButtonDelete = () => {
  return (
    <div className={`${styles.button} ${styles.buttonDelete}`}>Eliminar</div>
  )
}

export const ButtonAddUser = () => {
  return (
    <div className={`${styles.button} ${styles.buttonAdd}`}>+ Crear usuario</div>
  )
}

