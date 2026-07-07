import { useUsers } from "../../hooks/useUsers";
import { Button } from '../../components/Button/Button'
import { UserItem } from './UserItem/UserItem'
import { useState } from 'react'
import { Loader } from '../../components/Loader/Loader'
import { UserFilters } from "./UserFilters.jsx";
import { UserEditForm } from "./UserEditForm.jsx";
import { UserCreateModal } from "./UserCreateModal.jsx";
import { UserDeleteModal } from "./UserDeleteModal.jsx";


export const Users = () => {

  const [userSearch, setUserSearch] = useState("")
  const [openModal, setOpenModal] = useState(false); // Modal para Crear
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // Modal para Eliminar  

  const [userType, setUserType] = useState("Todos")
  const [editingId, setEditingId] = useState(null);

  const {
    users,
    loading,
    addUser,
    editUser,
    removeUser
  } = useUsers();


  // ESTADO FORMULARIO DETALLE / EDICIÓN (PATCH)
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    lastname: "",
    dni: "",
    typeDocument: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    nationality: "",
    image: "",
    active: true,
    birthdate: "",
    confirmPassword: ""
  })

  // ESTADO FORMULARIO CREACIÓN (POST)
  const [createFormData, setCreateFormData] = useState({
    name: "",
    lastname: "",
    dni: "",
    typeDocument: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    nationality: "",
    image: "",
    active: true,
    birthdate: "",
    confirmPassword: ""
  });


  // Combinar filtro de categoría y el de búsqueda por nombre
  const usersFiltered = users.filter((u) => {
    const matchesCategory = userType === "Todos" || u.role.toLowerCase() === userType.toLowerCase();
    const matchesSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.lastname.toLowerCase().includes(userSearch.toLowerCase())
    return matchesCategory && matchesSearch
  })


  // AUTOCOMPLETAR FORMULARIO DE DETALLE/EDICIÓN
  const handleSelectUser = (selectedUser) => {
    console.log(selectedUser)
    const id = selectedUser.id || selectedUser._id || "";
    setEditingId(id);
    setFormData({
      id: selectedUser.id || selectedUser._id || "",
      name: selectedUser.name || "",
      lastname: selectedUser.lastname || "",
      dni: selectedUser.dni || "",
      typeDocument: selectedUser.typeDocument?.trim().toUpperCase() || "",
      email: selectedUser.email || "",
      password: "",
      phone: selectedUser.phone || "",
      role: selectedUser.role?.trim().toUpperCase() || "",
      nationality: selectedUser.nationality || "",
      image: selectedUser.image || "",
      active: selectedUser.active || 1,
      birthdate: selectedUser.birthdate || "",
    })
  }

  // HANDLERS PARA CAPTURAR DATOS INDEPENDIENTES EDITAR
  const handleChangeEdit = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // HANDLERS PARA CAPTURAR DATOS INDEPENDIENTES CREAR
  const handleChangeCreate = (e) => {
    const { name, value, type, checked } = e.target
    setCreateFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }


  // HANDLER UI POST - CREAR UN USUARIO
  const handleCreate = async (e) => {
    e.preventDefault();

    if (createFormData.name === "" || createFormData.lastname === "") {
      alert("Debes ingresar nombres y apellidos")
      return
    }
    if (!createFormData.typeDocument || createFormData.typeDocument === "") {
      alert("Seleccione un tipo de documento de identidad")
      return
    }
    if (!createFormData.dni || createFormData.dni === "") {
      alert("Debes ingresar número de documento de identidad")
      return
    }
    if (!createFormData.email || !createFormData.email.includes('@')) {
      alert("Debes ingresar un correo válido")
      return
    }
    if (!createFormData.phone || createFormData.phone.length > 10 || createFormData.phone.length < 10) {
      alert("El número de teléfono debe tener 10 dígitos")
      return
    }
    if (!createFormData.nationality || createFormData.nationality === "") {
      alert("Seleccione su país de orígen")
      return
    }
    if (!createFormData.role || createFormData.role === "Todos" || createFormData.role === "") {
      alert("Seleccione un tipo de usuario")
      return
    }
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!regex.test(createFormData.password)) {
      alert("La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial");
      return;
    }
    if (createFormData.password !== createFormData.confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }

    try {
      // Sanitizamos el objeto antes de enviarlo
      const data = {
        ...createFormData,
        typeDocument: createFormData?.typeDocument?.toUpperCase(),
        role: createFormData?.role?.toUpperCase(),
        active: Boolean(createFormData.active),
        birthdate: createFormData.birthdate ? new Date(createFormData.birthdate).toISOString() : null
      }

      await addUser(data);
      setOpenModal(false)
      alert(`Se ha creado el usuario "${createFormData.name} ${createFormData.lastname}" con éxito`);

      setFormData({
        name: "",
        lastname: "",
        dni: "",
        typeDocument: "",
        birthdate: "",
        email: "",
        phone: "",
        nationality: "",
        password: "",
        confirmPassword: ""
      })

      return true;
    } catch (error) {
      console.error(error);
    }
  }



  // HANDLER UI PATCH - ACTUALIZAR UN USUARIO
  const handleUpdate = async (e) => {

    e.preventDefault();

    if (!editingId) return alert("Selecciona un usuario de la lista para actualizar");

    if (formData.name === "" || formData.lastname === "") {
      alert("Debes ingresar nombres y apellidos")
      return
    }
    if (!formData.typeDocument || formData.typeDocument === "") {
      alert("Seleccione un tipo de documento de identidad")
      return
    }
    if (!formData.dni || formData.dni === "") {
      alert("Debes ingresar número de documento de identidad")
      return
    }
    if (!formData.email || !formData.email.includes('@')) {
      alert("Debes ingresar un correo válido")
      return
    }
    if (formData.phone === "" || formData.phone.length > 10 || formData.phone.length < 10) {
      alert("El número de teléfono debe tener 10 dígitos")
      return
    }
    if (!formData.nationality || formData.nationality.trim() === "") {
      alert("Seleccione su país de orígen")
      return
    }
    if (!formData.role || formData.role === "Todos" || formData.role === "") {
      alert("Seleccione un tipo de usuario")
      return
    }
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!regex.test(formData.password)) {
      alert("La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }

    try {
      const data = {
        ...formData,
        typeDocument: formData?.typeDocument?.toUpperCase(),
        role: formData?.role?.toUpperCase(),
        active: Boolean(formData.active),
        birthdate: formData.birthdate ? new Date(formData.birthdate).toISOString() : null
      };

      await editUser(editingId, data);

      alert(`Se ha actualizado el usuario "${formData.name} ${formData.lastname}" con éxito`);

      // Limpiar el detalle tras eliminar
      setEditingId(null);
      setCreateFormData({
        name: "",
        lastname: "",
        dni: "",
        typeDocument: "",
        email: "",
        password: "",
        phone: "",
        role: "",
        nationality: "",
        image: "",
        active: true,
        birthdate: "",
        confirmPassword: ""
      })
      return true;
    } catch (error) {
      console.error(error);
    }
  };

  // HANDLER UI DELETE - ELIMINAR USUARIO
  const handleDelete = async () => {
    if (!formData.id) return alert("Selecciona un usuario de la lista para eliminar");;

    try {
      removeUser(formData.id)
      alert(`Se ha eliminado el usuario "${formData.name}" con éxito`)
      // Limpiar el detalle tras eliminar
      setEditingId(null);
      setFormData({
        name: "",
        lastname: "",
        dni: "",
        typeDocument: "",
        birthdate: "",
        email: "",
        phone: "",
        nationality: "",
        password: "",
        confirmPassword: ""
      })

      setOpenDeleteModal(false)
    } catch (error) {
      console.error(error);
    }
  };




  return (
    <div className="background">
      <div className="container">
        <div className="container-form">
          <h1>Usuarios</h1>

          {/* Filtro */}
          <UserFilters
            userSearch={userSearch}
            setUserSearch={setUserSearch}
            userType={userType}
            setUserType={setUserType}
          />

          <div className="container-flex">
            {/* Modulo Usuarios */}
            <div className="module">
              <UserItem users={usersFiltered} onSelectUser={handleSelectUser} />
            </div>


            {/* Modulo Detalle Usuario (EDICIÓN / PATCH) */}
            <div className="module">
              <Button className='btnAdd' text='+ Crear usuario' type='submit' onClick={() => setOpenModal(true)} />

              <UserEditForm
                formData={formData}
                handleChangeEdit={handleChangeEdit}
                handleUpdate={handleUpdate}
                setOpenDeleteModal={setOpenDeleteModal}
              />
            </div>
          </div>

          {/* Modal Creación de Usuario (POST) */}
          <UserCreateModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            createFormData={createFormData}
            handleChangeCreate={handleChangeCreate}
            handleCreate={handleCreate}
            setCreateFormData={setCreateFormData}
          />

          {/* Modal de Confirmación de Eliminación */}
          <UserDeleteModal
            openDeleteModal={openDeleteModal}
            setOpenDeleteModal={setOpenDeleteModal}
            formData={formData}
            handleDelete={handleDelete}
          />

          {loading && <Loader />}

        </div>
      </div>
    </div>
  )
}