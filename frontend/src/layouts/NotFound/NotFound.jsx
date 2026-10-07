import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button'; // Importamos tu componente Button
import styles from './NotFound.module.css';

export const NotFound = () => {
  const navigate = useNavigate();

  // Función simplificada para manejar el clic y navegar a inicio
  const handleGoHome = (e) => {
    e.stopPropagation();
    navigate('/index'); // Navega a la raíz, que suele ser tu página de inicio
  };

  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.content}>
        
        {/* Icono visual grande */}
        <div className={styles.iconArea}>
          <i className="fa-solid fa-circle-exclamation fa-7x"></i>
        </div>

        {/* Título y Mensaje */}
        <div className={styles.textArea}>
          <h1 className={styles.title}>404</h1>
          <h2 className={styles.subtitle}>¡Ups! Página no encontrada.</h2>
          <p className={styles.message}>
            Parece que el enlace que seguiste está roto o la página ha sido movida.
          </p>
        </div>

        {/* Botón Principal (Reutilizando tu componente Button) */}
        <div className={styles.buttonArea}>
          <Button 
            onClick={handleGoHome}
            text="Ir a inicio" // Asumimos que tu Button acepta 'text'
          >
            Regresar a Inicio
          </Button>
        </div>

      </div>
    </div>
  );
};