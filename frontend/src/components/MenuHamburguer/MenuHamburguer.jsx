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
  };

  const toggleModal = (e) => {
    e.stopPropagation();
    setIsOpenModal(true);
  };

  // 3. Efecto para detectar clics fuera del contenedor
  useEffect(() => {
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
      style={{ display: "flex", width: "100%", height: "100%" }}
      ref={menuRef}
    >
      <div className={styles.icon}>
        <i className={`fa-solid fa-bars `} onClick={toggleMenu}></i>
      </div>
      <div className={`${styles.menu} ${isOpen ? styles.open : ""} `}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "10px",
          }}
        >
          <i
            className={"fa-solid fa-xmark"}
            style={{ color: "white", fontSize: "24px", width: 32, height: 32 }}
            onClick={toggleMenu}
          ></i>
        </div>

        {/* MENU OPCIONES PARA CLIENTES */}
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

        {/* MENU OPCIONES PARA ADMINISTRADORES */}
        {user?.role === "ADMINISTRADOR" && (
          <ul>
            <Link to="/dashboard">
              <li className={styles.menuItem} onClick={toggleMenu}>
                Mesas
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
                Facturas
              </li>
            </Link>
            <li className={styles.menuItem} onClick={toggleModal}>
              Cerrar Sesión
            </li>

            <Modal
              isOpenModal={isOpenModal}
              onCloseModal={() => setIsOpenModal(false)}
            >
              <h2 style={{ color: "black" }}>Cerrar Sesión</h2>
              <p style={{ color: "black" }}>
                ¿Estás seguro que deseas cerrar sesión?
              </p>

              <Button
                text="Aceptar"
                onClick={() => {
                  setIsOpenModal(false);
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    setIsOpen(false);
                    logout();
                    navigate("/index");
                  }, 2000);
                }}
                className="btnSignOut"
                type="button"
              />
              <Button
                text="Cancelar"
                onClick={() => {
                  setIsOpenModal(false);
                  setIsOpen(false);
                }}
                className="btnBack"
                type="button"
              />
            </Modal>
          </ul>
        )}

        {/* MENU OPCIONES PARA COCINEROS */}
        {user?.role === "COCINERO" && (
          <ul>
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
            <li className={styles.menuItem} onClick={toggleModal}>
              Cerrar Sesión
            </li>

            <Modal
              isOpenModal={isOpenModal}
              onCloseModal={() => setIsOpenModal(false)}
            >
              <h2 style={{ color: "black" }}>Cerrar Sesión</h2>
              <p style={{ color: "black" }}>
                ¿Estás seguro que deseas cerrar sesión?
              </p>

              <Button
                text="Aceptar"
                onClick={() => {
                  setIsOpenModal(false);
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    setIsOpen(false);
                    logout();
                    navigate("/index");
                  }, 2000);
                }}
                className="btnSignOut"
                type="button"
              />
              <Button
                text="Cancelar"
                onClick={() => {
                  setIsOpenModal(false);
                  setIsOpen(false);
                }}
                className="btnBack"
                type="button"
              />
            </Modal>
          </ul>
        )}

        {/* MENU OPCIONES PARA MESEROS */}
        {user?.role === "MESERO" && (
          <ul>
            <Link to="/dashboard">
              <li className={styles.menuItem} onClick={toggleMenu}>
                Mesas
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
            <li className={styles.menuItem} onClick={toggleModal}>
              Cerrar Sesión
            </li>

            <Modal
              isOpenModal={isOpenModal}
              onCloseModal={() => setIsOpenModal(false)}
            >
              <h2 style={{ color: "black" }}>Cerrar Sesión</h2>
              <p style={{ color: "black" }}>
                ¿Estás seguro que deseas cerrar sesión?
              </p>

              <Button
                text="Aceptar"
                onClick={() => {
                  setIsOpenModal(false);
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    setIsOpen(false);
                    logout();
                    navigate("/index");
                  }, 2000);
                }}
                className="btnSignOut"
                type="button"
              />
              <Button
                text="Cancelar"
                onClick={() => {
                  setIsOpenModal(false);
                  setIsOpen(false);
                }}
                className="btnBack"
                type="button"
              />
            </Modal>
          </ul>
        )}

        {loading && <Loader />}
        
      </div>
    </div>
  );
};
