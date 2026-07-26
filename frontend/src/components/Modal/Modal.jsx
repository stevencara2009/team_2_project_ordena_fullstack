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
          <button text="Cerrar" onClick={onCloseModal}>
            <i className="fa-solid fa-rectangle-xmark" style={{ color: 'brown', fontSize: '24px', cursor: 'pointer' }}></i>
          </button>
        </div>
        {children}
      </div>
    </div>
  , document.body);
}

