import styles from './Modal.module.css';
import { createPortal } from 'react-dom';

export function Modal({ isOpenModal, onCloseModal, children }) {
  if (!isOpenModal) return null;

  return createPortal(
    <div className={styles.modalOverlay} onClick={onCloseModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}  >

        <div onClick={(e) => e.stopPropagation()} style={{
          display: 'flex', width: '100%', justifyContent: 'end', alignItems: "center"
        }}  >
          <button text="Cerrar" onClick={onCloseModal} style={{border:"none"}}>
            <i className={`fa-solid fa-rectangle-xmark  ${styles.closeButton}`} ></i>
          </button>
        </div>
        {children}
      </div>
    </div>
  , document.body);
}

