import styles from "./Pagination.module.css";

export function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className={styles.paginationContainer}>
      <button
        className={styles.pageButton}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <i className="fa-solid fa-chevron-left"></i> Anterior
      </button>

      <div className={styles.pagesList}>
        {pages.map((page) => (
          <button
            key={page}
            className={`${styles.pageNumber} ${
              currentPage === page ? styles.activePage : ""
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className={styles.pageButton}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Siguiente <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );
}
