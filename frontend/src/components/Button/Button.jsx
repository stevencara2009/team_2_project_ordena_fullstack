import styles from './Button.module.css'

export const Button = ({ 
  text,
  type='button',
  className,
  onClick = () => { },
  disabled=false
 }) => {


  return (
    <button type={type} className={`${styles.btn} ${styles[className]}`} onClick={onClick} disabled={disabled} >{text}</button>
  )
}
