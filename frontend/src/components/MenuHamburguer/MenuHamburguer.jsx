import { useEffect, useRef, useState } from "react";
import styles from "./MenuHamburguer.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "../../components/Modal/Modal";
import { Button } from "../Button/Button";
import { Loader } from "../Loader/Loader";
import { useAuth } from "../../hooks/useAuth";

export const MenuHamburguer = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const navigate = useNavigate();

  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsOpenModal(false);
  };

  const toggleModal = (e) => {
    e.stopPropagation();
    setIsOpenModal(true);
    setIsOpen(false);
  };

  const handleLogout = () => {
    setIsOpenModal(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsOpen(false);
      logout();
      navigate("/index");
    }, 2000);
  };

  // Cierre al hacer clic fuera del menú
  useEffect(() => {
    console.log(user?.role);
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        if (!isOpenModal) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isOpenModal]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "70px",
        height: "100%",
        cursor: "pointer",
      }}
      ref={menuRef}
      onClick={toggleMenu}
    >
      <div className={styles.icon}>
        <i className="fa-solid fa-bars"></i>
      </div>

      <div className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "10px",
          }}
        >
          <i
            className="fa-solid fa-xmark"
            style={{ color: "white", fontSize: "24px", width: 32, height: 32 }}
            onClick={toggleMenu}
          ></i>
        </div>

        {/* MENÚ PÚBLICO */}
        <ul>
          <Link to="/index">
            <li className={styles.menuItem} onClick={toggleMenu}>
              Inicio
            </li>
          </Link>
          <Link to="/menu">
            <li className={styles.menuItem} onClick={toggleMenu}>
              Menú
            </li>
          </Link>
        </ul>

        {user?.role === undefined && (
          <ul>
            <Link to="/cart">
              <li className={styles.menuItem} onClick={toggleMenu}>
                Ver mi pedido
              </li>
            </Link>
          </ul>
        )}

        {/* CLIENTE */}
        {user?.role === "CLIENTE" && (
          <ul>
            <Link to="/cart">
              <li className={styles.menuItem} onClick={toggleMenu}>
                Ver mi pedido
              </li>
            </Link>
            <Link to="/profile">
              <li className={styles.menuItem} onClick={toggleMenu}>
                Información personal
              </li>
            </Link>
            <li className={styles.menuItem} onClick={toggleModal}>
              Cerrar Sesión
            </li>
          </ul>
        )}

        {/* ADMINISTRADOR */}
        {user?.role === "ADMINISTRADOR" && (
          <ul>
            <Link to="/dashboard">
              <li className={styles.menuItem} onClick={toggleMenu}>
                Dashboard (mesas)
              </li>
            </Link>
            <Link to="/view-orders">
              <li className={styles.menuItem} onClick={toggleMenu}>
                Ver Pedidos
              </li>
            </Link>
            <Link to="/orders">
              <li className={styles.menuItem} onClick={toggleMenu}>
                Crear pedido
              </li>
            </Link>
            <Link to="/users">
              <li className={styles.menuItem} onClick={toggleMenu}>
                Usuarios
              </li>
            </Link>
            <Link to="/products">
              <li className={styles.menuItem} onClick={toggleMenu}>
                Productos
              </li>
            </Link>
            <Link to="/bills">
              <li className={styles.menuItem} onClick={toggleMenu}>
                Facturar
              </li>
            </Link>
            <Link to="/bills-history">
              <li className={styles.menuItem} onClick={toggleMenu}>
                Historial de facturas
              </li>
            </Link>
            <Link to="/profile">
              <li className={styles.menuItem} onClick={toggleMenu}>
                Información personal
              </li>
            </Link>
            <li className={styles.menuItem} onClick={toggleModal}>
              Cerrar Sesión
            </li>
          </ul>
        )}

        {/* COCINERO */}
        {user?.role === "COCINERO" && (
          <ul>
            <Link to="/view-orders">
              <li className={styles.menuItem} onClick={toggleMenu}>
                Ver Pedidos
              </li>
            </Link>
            <Link to="/profile">
              <li className={styles.menuItem} onClick={toggleMenu}>
                Información personal
              </li>
            </Link>
            <li className={styles.menuItem} onClick={toggleModal}>
              Cerrar Sesión
            </li>
          </ul>
        )}

        {/* MESERO */}
        {user?.role === "MESERO" && (
          <ul>
            <Link to="/dashboard">
              <li className={styles.menuItem} onClick={toggleMenu}>
                Dashboard (mesas)
              </li>
            </Link>
            <Link to="/view-orders">
              <li className={styles.menuItem} onClick={toggleMenu}>
                Ver Pedidos
              </li>
            </Link>
            <Link to="/orders">
              <li className={styles.menuItem} onClick={toggleMenu}>
                Crear pedido
              </li>
            </Link>
            <Link to="/profile">
              <li className={styles.menuItem} onClick={toggleMenu}>
                Información personal
              </li>
            </Link>
            <li className={styles.menuItem} onClick={toggleModal}>
              Cerrar Sesión
            </li>
          </ul>
        )}

        {/* CAJERO */}
        {user?.role === "CAJERO" && (
          <ul>
            <Link to="/dashboard">
              <li className={styles.menuItem} onClick={toggleMenu}>
                Dashboard (mesas)
              </li>
            </Link>
            <Link to="/view-orders">
              <li className={styles.menuItem} onClick={toggleMenu}>
                Ver Pedidos
              </li>
            </Link>
            <Link to="/orders">
              <li className={styles.menuItem} onClick={toggleMenu}>
                Crear pedido
              </li>
            </Link>
            <Link to="/bills">
              <li className={styles.menuItem} onClick={toggleMenu}>
                Facturar
              </li>
            </Link>
            <Link to="/bills-history">
              <li className={styles.menuItem} onClick={toggleMenu}>
                Historial de facturas
              </li>
            </Link>
            <Link to="/profile">
              <li className={styles.menuItem} onClick={toggleMenu}>
                Información personal
              </li>
            </Link>
            <li className={styles.menuItem} onClick={toggleModal}>
              Cerrar Sesión
            </li>
          </ul>
        )}

        {loading && <Loader />}
      </div>

      {/* MODAL ÚNICO DE CERRAR SESIÓN */}
      <Modal
        isOpenModal={isOpenModal}
        onCloseModal={() => setIsOpenModal(false)}
      >
        <h2 className={styles.title}>Cerrar Sesión</h2>
        <p className={styles.paragraph}>
          ¿Estás seguro que deseas cerrar sesión?
        </p>

        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Button
            text="Cancelar"
            onClick={() => setIsOpenModal(false)}
            className="btnBack"
            type="button"
          />
          <Button
            text="Aceptar"
            onClick={handleLogout}
            className="btnAdd"
            type="button"
          />
        </div>
      </Modal>
    </div>
  );
};
