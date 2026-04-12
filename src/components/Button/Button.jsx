import styles from './Button.module.css'

export const Button = ({text, type= 'button', className }) => {
  return (
    <button type={type} className={`${styles.btn} ${styles[className]}`}>{text}</button>
  )
}
