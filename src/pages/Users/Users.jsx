import { Button } from '../../components/Button/Button'
import { Input, InputSelect } from '../../components/Input/Input'
import { UserItem } from './UserItem/UserItem'
import styles from './Users.module.css'
import { useEffect, useState } from 'react'

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [userType, setUserType] = useState("Todos")
  const [productType, setProductType] = useState("")
  const [documentType, setDocumentType] = useState("")

  const USERS_TYPE = ["Todos", "Mesero", "Cocinero", "Administrador", "Cliente"]
  const DOCUMENTS_TYPE = [
    "Cedula de Ciudadanía",
    "Cedula de Extranjería",
    "Pasaporte",
    "NIT",
  ]

  useEffect(() => {
    fetch('/api/users.json')
      .then(response => response.json())
      .then(result => {
        setUsers(result)
      })
      .catch(error => console.log("Error cargando archivo: ", error))
  }, [])



  const usersFiltered = users.filter((user) => {
    if (userType === "" || userType === "Todos") return true;
    return user.role === userType;
  })


  return (
    <div className="background">
      <div className="container">
        <h1>Usuarios</h1>

        <form action="" className="formFlex">
          <Input
            label="Buscar"
            type="text"
            placeholder=""
            className="inputPrimary"
            name=""
            value=""
            onChange=""
            required
          />

          <div className={styles.divSearch}>
            <button type='button' ><i className="fa-solid fa-magnifying-glass" style={{ width: 25, height: 25 }}></i></button>
          </div>

          <InputSelect
            label="Filtrar por:"
            type="text"
            className="inputPrimary"
            placeholder=""
            onChange={(e) => setUserType(e.target.value)}
            data={USERS_TYPE}
            value
          />
        </form>

        <div className="contentFlex">
          {/* Modulo Usuarios */}
          <div className="module">
            <UserItem users={usersFiltered} />
          </div>

          {/* Modulo Formulario Nuevo Usuario*/}
          <div className="module">
            <form action="" >

              <h2>Usuario</h2>
              <div className={styles.displayForm}>
                <Input
                  label="Nombres"
                  type="text"
                  placeholder=""
                  className="inputPrimary"
                  name=""
                  value=""
                  onChange=""
                  required
                />

                <Input
                  label="Apellidos"
                  type="text"
                  placeholder=""
                  className="inputPrimary"
                  name=""
                  value=""
                  onChange=""
                  required
                />

                <Input
                  label="N° de documento"
                  type="password"
                  placeholder=""
                  className="inputPrimary"
                  name=""
                  value=""
                  onChange=""
                  required
                />

                <InputSelect
                  label="Tipo de documento"
                  type="text"
                  className="inputPrimary"
                  placeholder=""
                  onChange={(e) => setDocumentType(e.target.value)}
                  data={DOCUMENTS_TYPE}
                />

                <Input
                  label="N° de documento"
                  type="password"
                  placeholder=""
                  className="inputPrimary"
                  name=""
                  value=""
                  onChange=""
                  required
                />

                <Input
                  label="Fecha de Nacimiento"
                  type="date"
                  placeholder=""
                  className="inputPrimary"
                  name=""
                  value=""
                  onChange=""
                  required
                />

                <Input
                  label="Correo Electrónico"
                  type="email"
                  placeholder="hernan.c@gmail.com"
                  className="inputPrimary"
                  name=""
                  value=""
                  onChange=""
                  required
                />

                <Input
                  label="Contraseña"
                  type="password"
                  placeholder="**************"
                  className="inputPrimary"
                  name=""
                  value=""
                  onChange=""
                  required
                />

                <Input
                  label="Confirme Contraseña"
                  type="password"
                  placeholder="**************"
                  className="inputPrimary"
                  name=""
                  value=""
                  onChange=""
                  required
                />

                <div className={styles.divActionsOrder}>
                  <Button text='Eliminar' className='btnDelete' />
                  <Button text='Añadir' className='btnAdd' />
                </div>

              </div>

            </form>
          </div>

        </div>

      </div>
    </div>
  )
}