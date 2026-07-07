import { Link,useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button/Button'
import styles from './NotFound.module.css'

export const NotFound = () => {
  const navigate = useNavigate()


  const handleClic = (e) => {
    e.stopPropagation();
    navigate('/');
  }

  return (
    <div className="" style={{backgroundColor: "black"}}>
      <br />
      <br />
      <br />
      <br />
      <h1>Pagina no encontrada</h1>
      <div className={styles.divButton} onClick={handleClic} >
        <Link to="/index"><li className={styles.navItem}>Ir a inicio</li></Link>
      </div>
      <br />
    </div>
  )
}