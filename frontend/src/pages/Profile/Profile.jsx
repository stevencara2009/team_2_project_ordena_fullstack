import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import defaultAvatar from "../../assets/without_photo_profile.jpg";
import styles from "./Profile.module.css";
import { useBills } from "../../hooks/useBills";
import { BillsTable } from "../../components/Table/BillsTable";
import { Modal } from "../../components/Modal/Modal";
import { Button } from "../../components/Button/Button";
import { BillDetail } from "../../pages/Bills/BillDetail/BillDetail";
import { useUsers } from "../../hooks/useUsers";

export function Profile() {
  const { user } = useAuth();
  const { editUser } = useUsers();

  // Estado local para forzar el render con los datos actualizados de forma inmediata
  const [currentUser, setCurrentUser] = useState(user);

  const {
    bills,
    selectedBillDetails,
    loadBills,
    loadBillDetails,
    clearSelectedBillDetails,
  } = useBills();

  const [showBillModal, setShowBillModal] = useState(false);
  const [autoPrint, setAutoPrint] = useState(false);

  // Estados locales para la edición
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Sincronizar currentUser y formData cuando user responda o cambie
  useEffect(() => {
    if (user) {
      setCurrentUser(user);
      setFormData({
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (showBillModal && autoPrint && selectedBillDetails) {
      const timer = setTimeout(() => {
        window.print();
        setAutoPrint(false);
      }, 200); // Pequeño delay para asegurar el render
      return () => clearTimeout(timer);
    }
  }, [showBillModal, autoPrint, selectedBillDetails]);

  useEffect(() => {
    if (currentUser?.id) {
      loadBills({ client_id: currentUser.id });
    }
  }, [currentUser?.id]);

  if (!currentUser) {
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

  // Manejadores del Formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setFormData({
      email: currentUser.email || "",
      phone: currentUser.phone || "",
    });
    setErrorMsg("");
    setIsEditing(false);
  };

  // HANDLER UI PATCH - ACTUALIZAR UN USUARIO
  const handleUpdate = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.email || !formData.email.includes("@")) {
      alert("Debes ingresar un correo válido");
      return;
    }
    if (
      formData.phone === "" ||
      formData.phone.length > 10 ||
      formData.phone.length < 10
    ) {
      alert("El número de teléfono debe tener 10 dígitos");
      return;
    }

    try {
      setSubmitted(true);
      await editUser(currentUser.id, formData);

      // Actualizamos el estado local currentUser inmediatamente
      setCurrentUser((prev) => ({
        ...prev,
        ...formData,
      }));

      alert(
        `Se ha actualizado el usuario "${currentUser.name} ${currentUser.lastname}" con éxito`
      );
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      setErrorMsg("Ocurrió un error al intentar actualizar el usuario.");
    } finally {
      setSubmitted(false);
    }
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
                  src={currentUser.image || defaultAvatar}
                  alt={`${currentUser.name} ${currentUser.lastname}`}
                  className={styles.avatar}
                />
                <span
                  className={`${styles.statusBadge} ${
                    currentUser.active ? styles.active : styles.inactive
                  }`}
                >
                  {currentUser.active ? "Activo" : "Inactivo"}
                </span>
              </div>

              <h2 className={styles.name}>
                {currentUser.name} {currentUser.lastname}
              </h2>
              <span className={styles.roleBadge}>{currentUser.role}</span>
            </div>

            {/* Sección de Datos Personales */}
            <div className={styles.body}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Información de Cuenta</h3>
              </div>

              {errorMsg && (
                <div className={styles.errorMessage}>{errorMsg}</div>
              )}

              {isEditing ? (
                <form onSubmit={handleUpdate} className={styles.editForm}>
                  <div className={styles.grid}>
                    <div className={styles.infoGroup}>
                      <label htmlFor="email">Correo Electrónico</label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={styles.input}
                      />
                    </div>

                    <div className={styles.infoGroup}>
                      <label htmlFor="phone">Teléfono / Celular</label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={styles.input}
                      />
                    </div>

                    {/* Campos de solo lectura dentro del modo edición */}
                    <div className={styles.infoGroup}>
                      <label>Tipo de Documento</label>
                      <p>{currentUser.typeDocument || "No especificado"}</p>
                    </div>

                    <div className={styles.infoGroup}>
                      <label>Número de Documento (DNI)</label>
                      <p>{currentUser.dni || "No especificado"}</p>
                    </div>

                    <div className={styles.infoGroup}>
                      <label>Nacionalidad</label>
                      <p>{currentUser.nationality || "No especificada"}</p>
                    </div>

                    <div className={styles.infoGroup}>
                      <label>Fecha de Nacimiento</label>
                      <p>{formatDate(currentUser.birthdate)}</p>
                    </div>
                  </div>

                  <div className={styles.actions}>
                    <div className={styles.inputFlex}>
                      <Button
                        text="Cancelar"
                        type="button"
                        onClick={handleCancel}
                        disabled={submitted}
                        className="btnDelete"
                      />
                      <Button
                        text={submitted ? "Guardando..." : "Guardar Cambios"}
                        type="submit"
                        className="btnUpdate"
                        disabled={submitted}
                      />
                    </div>
                  </div>
                </form>
              ) : (
                <div className={styles.grid}>
                  <div className={styles.infoGroup}>
                    <label>Correo Electrónico</label>
                    <p>{currentUser.email}</p>
                  </div>

                  <div className={styles.infoGroup}>
                    <label>Teléfono / Celular</label>
                    <p>{currentUser.phone || "No especificado"}</p>
                  </div>

                  <div className={styles.infoGroup}>
                    <label>Tipo de Documento</label>
                    <p>{currentUser.typeDocument || "No especificado"}</p>
                  </div>

                  <div className={styles.infoGroup}>
                    <label>Número de Documento (DNI)</label>
                    <p>{currentUser.dni || "No especificado"}</p>
                  </div>

                  <div className={styles.infoGroup}>
                    <label>Nacionalidad</label>
                    <p>{currentUser.nationality || "No especificada"}</p>
                  </div>

                  <div className={styles.infoGroup}>
                    <label>Fecha de Nacimiento</label>
                    <p>{formatDate(currentUser.birthdate)}</p>
                  </div>
                </div>
              )}

              {!isEditing && (
                <Button
                  type="button"
                  text="Editar Datos"
                  className="btnUpdate"
                  onClick={() => setIsEditing(true)}
                />
              )}

              <hr className={styles.divider} />

              <h3 className={styles.sectionTitle}>Detalles del Sistema</h3>
              <div className={styles.grid}>
                <div className={styles.infoGroup}>
                  <label>Miembro desde</label>
                  <p>{formatDate(currentUser.created_at)}</p>
                </div>

                <div className={styles.infoGroup}>
                  <label>Estado</label>
                  <p>{currentUser.active === 1 ? "Activo" : "Inactivo"}</p>
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