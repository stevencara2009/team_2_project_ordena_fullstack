import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth"; // O la vía por la que obtengas el usuario actual
import defaultAvatar from "../../assets/without_photo_profile.jpg";
import styles from "./Profile.module.css";
import { useBills } from "../../hooks/useBills";
import { BillsTable } from "../../components/Table/BillsTable";
import { Modal } from "../../components/Modal/Modal";
import { BillDetail } from "../../pages/Bills/BillDetail/BillDetail";

export function Profile() {
  const { user } = useAuth();
  const {
    bills,
    selectedBillDetails,
    loadBills,
    loadBillDetails,
    clearSelectedBillDetails,
  } = useBills();
  const [showBillModal, setShowBillModal] = useState(false);
  const [autoPrint, setAutoPrint] = useState(false);

  useEffect(() => {
    if (showBillModal && autoPrint && selectedBillDetails) {
      const timer = setTimeout(() => {
        window.print();
        setAutoPrint(false);
      }, 200); // pequeño delay para asegurar el render
      return () => clearTimeout(timer);
    }
  }, [showBillModal, autoPrint, selectedBillDetails]);

  useEffect(() => {
    if (user?.id) {
      loadBills({ client_id: user.id });
    }
  }, [user?.id]);

  if (!user) {
    return (
      <div className={styles.loading}>Cargando información del usuario...</div>
    );
  }

  // Formateadores auxiliares
  const formatDate = (dateString) => {
    if (!dateString) return "No registrado";
    return new Date(dateString).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleRowClick = async (bill) => {
    await loadBillDetails(bill.id);
    setShowBillModal(true);
  };

  const handleDownloadClick = async (bill) => {
    await loadBillDetails(bill.id);
    setAutoPrint(true);
    setShowBillModal(true);
  };

  const handleCloseModal = () => {
    setShowBillModal(false);
    clearSelectedBillDetails();
  };

  return (
    <div className="background">
      <div className="container">
        <div className={styles.container}>
          <div className={styles.card}>
            {/* Encabezado / Banner con Foto de Perfil */}
            <div className={styles.header}>
              <div className={styles.avatarWrapper}>
                <img
                  src={user.image || defaultAvatar}
                  alt={`${user.name} ${user.lastname}`}
                  className={styles.avatar}
                />
                <span
                  className={`${styles.statusBadge} ${user.active ? styles.active : styles.inactive}`}
                >
                  {user.active ? "Activo" : "Inactivo"}
                </span>
              </div>

              <h2 className={styles.name}>
                {user.name} {user.lastname}
              </h2>
              <span className={styles.roleBadge}>{user.role}</span>
            </div>

            {/* Sección de Datos Personales */}
            <div className={styles.body}>
              <h3 className={styles.sectionTitle}>Información de Cuenta</h3>

              <div className={styles.grid}>
                <div className={styles.infoGroup}>
                  <label>Correo Electrónico</label>
                  <p>{user.email}</p>
                </div>

                <div className={styles.infoGroup}>
                  <label>Teléfono / Celular</label>
                  <p>{user.phone || "No especificado"}</p>
                </div>

                <div className={styles.infoGroup}>
                  <label>Tipo de Documento</label>
                  <p>{user.typeDocument || "No especificado"}</p>
                </div>

                <div className={styles.infoGroup}>
                  <label>Número de Documento (DNI)</label>
                  <p>{user.dni || "No especificado"}</p>
                </div>

                <div className={styles.infoGroup}>
                  <label>Nacionalidad</label>
                  <p>{user.nationality || "No especificada"}</p>
                </div>

                <div className={styles.infoGroup}>
                  <label>Fecha de Nacimiento</label>
                  <p>{formatDate(user.birthdate)}</p>
                </div>
              </div>

              <hr className={styles.divider} />

              <h3 className={styles.sectionTitle}>Detalles del Sistema</h3>
              <div className={styles.grid}>
                <div className={styles.infoGroup}>
                  <label>Miembro desde</label>
                  <p>{formatDate(user.created_at)}</p>
                </div>

                <div className={styles.infoGroup}>
                  <label>Estado</label>
                  <p>{user.active === 1 ? "Activo" : "Inactivo"}</p>
                </div>
              </div>

              <hr className={styles.divider} />
              <h3 className={styles.sectionTitle}>Mis Facturas</h3>
              <BillsTable
                bills={bills}
                onRowClick={handleRowClick}
                onDownloadClick={handleDownloadClick}
                emptyMessage="Aún no tienes facturas asociadas."
              />
            </div>
          </div>
        </div>
      </div>
      {showBillModal && (
        <Modal isOpenModal={showBillModal} onCloseModal={handleCloseModal}>
          <div id="printable-invoice">
            <BillDetail billDetails={selectedBillDetails} />
          </div>
        </Modal>
      )}
    </div>
  );
}
