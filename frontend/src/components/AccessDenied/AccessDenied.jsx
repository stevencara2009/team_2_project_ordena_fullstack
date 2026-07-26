import styles from "./AccessDenied.module.css";

export const AccessDenied = ({
  message = "No tienes los permisos necesarios para acceder a este módulo del restaurante.",
  onGoBack,
  onGoHome,
}) => {
  const handleBack = () => {
    if (onGoBack) {
      onGoBack();
    } else {
      window.history.back();
    }
  };

  const handleHome = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      window.location.href = "/index";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Badge de Error */}
        <span className={styles.badge}>Error 403</span>

        {/* Icono de Candado / Cloche (Restaurante) */}
        <div className={styles.iconContainer}>
          <svg
            className={styles.icon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        <h2 className={styles.title}>Acceso Denegado</h2>
        <p className={styles.description}>{message}</p>

        {/* Acciones del Usuario */}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={handleBack}
          >
            Volver atrás
          </button>

          <button
            type="button"
            className={styles.btnPrimary}
            onClick={handleHome}
          >
            Ir al Inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
