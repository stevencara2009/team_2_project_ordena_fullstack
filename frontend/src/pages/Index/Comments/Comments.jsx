import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useComments } from "../../../hooks/useComments";
import { Pagination } from "../../../components/Pagination/Pagination"; // Ajusta la ruta a tu componente
import styles from "./Comments.module.css";

export const Comments = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { comments = [], loading, error, addComment } = useComments();

  // ESTADOS DEL FORMULARIO
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [formError, setFormError] = useState("");
  const [sending, setSending] = useState(false);

  // ESTADOS DE ORDENACIÓN Y PAGINACIÓN
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5; // Ajusta según la cantidad de comentarios por página

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    if (content.trim().length < 3) {
      return setFormError("Escribe al menos 3 caracteres");
    }
    try {
      setSending(true);
      await addComment({ content: content.trim(), rating });
      setContent("");
      setRating(5);
      setCurrentPage(1); // Volver a la primera página para ver el comentario creado
    } catch (err) {
      setFormError(err.message || "Error al enviar el comentario");
    } finally {
      setSending(false);
    }
  };

  // 1. ORDENACIÓN DINÁMICA DE LOS COMENTARIOS
  const sortedComments = useMemo(() => {
    return [...comments].sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.created_at) - new Date(a.created_at);
      }
      if (sortBy === "oldest") {
        return new Date(a.created_at) - new Date(b.created_at);
      }
      if (sortBy === "highest") {
        return (b.rating || 0) - (a.rating || 0);
      }
      if (sortBy === "lowest") {
        return (a.rating || 0) - (b.rating || 0);
      }
      return 0;
    });
  }, [comments, sortBy]);

  // RESETEAR A PÁGINA 1 SI CAMBIA EL ORDEN
  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy]);

  // 2. LÓGICA DE PAGINACIÓN (SLICING)
  const totalPages = Math.ceil(sortedComments.length / commentsPerPage);
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;

  // Comentarios a renderizar en la página actual
  const currentComments = sortedComments.slice(
    indexOfFirstComment,
    indexOfLastComment,
  );

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className={styles.comments}>
      <div className={styles.container}>
        <h2 className={styles.title}>Lo que dicen nuestros clientes</h2>

        {/* Formulario / Caja de autenticación */}
        {user ? (
          <form className={styles.form} onSubmit={handleSubmit}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Cuéntanos tu experiencia..."
              maxLength={500}
              rows={3}
            />
            <div className={styles.formRow}>
              <div className={styles.starPicker}>
                <span>Tu valoración:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={
                      star <= rating ? styles.starActive : styles.starInactive
                    }
                    onClick={() => setRating(star)}
                  >
                    ★
                  </button>
                ))}
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={sending}
              >
                {sending ? "Enviando..." : "Comentar"}
              </button>
            </div>
            {formError && <p className={styles.error}>{formError}</p>}
          </form>
        ) : (
          <div className={styles.loginBox}>
            <p>Inicia sesión para compartir tu opinión</p>
            <button
              onClick={() => navigate("/login", { state: { from: "/" } })}
            >
              Iniciar sesión
            </button>
          </div>
        )}

        {/* Controles de ordenación y contador */}
        <div className={styles.controls}>
          <span className={styles.count}>
            {comments.length}{" "}
            {comments.length === 1 ? "Comentario" : "Comentarios"}
          </span>

          <div className={styles.sortWrapper}>
            <label htmlFor="sortSelect">Ordenar por:</label>
            <select
              id="sortSelect"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Más recientes</option>
              <option value="oldest">Más antiguos</option>
              <option value="highest">Mejor valoración</option>
              <option value="lowest">Peor valoración</option>
            </select>
          </div>
        </div>

        {loading && <p className={styles.statusMsg}>Cargando opiniones...</p>}
        {error && <p className={styles.error}>{error}</p>}

        {!loading && sortedComments.length === 0 && (
          <p className={styles.statusMsg}>
            Aún no hay opiniones. ¡Sé el primero en opinar!
          </p>
        )}

        {/* Lista paginada */}
        <ul className={styles.list}>
          {currentComments.map((c) => (
            <li key={c.id} className={styles.item}>
              <div className={styles.header}>
                <strong className={styles.author}>
                  {c.name
                    ? `${c.name} ${c.lastname || ""}`.trim()
                    : "Usuario"}
                </strong>
                {c.rating && (
                  <span className={styles.stars}>
                    {"★".repeat(c.rating)}
                    {"☆".repeat(5 - c.rating)}
                  </span>
                )}
              </div>
              <p className={styles.content}>{c.content}</p>
              <time className={styles.date}>{formatDate(c.created_at)}</time>
            </li>
          ))}
        </ul>

        {/* Paginador */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
};
