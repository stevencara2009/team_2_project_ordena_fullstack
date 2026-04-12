import { ButtonAdd, ButtonAddUser, ButtonBack, ButtonDelete } from '../../components/Button/Button'
import { UserItem } from './UserItem/UserItem'
import styles from './Users.module.css'
import { useEffect, useState } from 'react'

export const Users = () => {
  const [users, setUsers] = useState([]);

  const [filter, setFilter] = useState("Todos")

  useEffect(() => {
    fetch('/api/users.json')
      .then(response => response.json())
      .then(result => {
        setUsers(result)
      })
      .catch(error => console.log("Error cargando archivo: ", error))
  }, [])


  const handleSelectChange = (e) => {
    setFilter(e.target.value)
  }

  const usersFiltered = users.filter((user) => {
    if (filter === "" || filter === "Todos") return true;
    return user.role === filter;
  })


  return (
    <div className="background">
      <div className="container">
        <h1>Usuarios</h1>

        <form action="" className="formFlex">
          <label htmlFor="order-id">
            <input type="text" id="order-id" className={styles.inputTable} />
          </label>
          <div className={styles.divSearch}>
            <button type='button' ><i className="fa-solid fa-magnifying-glass" style={{ width: 25, height: 25 }}></i></button>
          </div>
          <label htmlFor="filter-orders">Filtrar por:
            <select name="" id="filter-orders" className={styles.inputTable} onChange={handleSelectChange}>
              <option value="Todos"  >Todos</option>
              <option value="Mesero" >Meseros</option>
              <option value="Cocinero" >Cocineros</option>
              <option value="Administrador" >Administradores</option>
              <option value="Cliente" >Clientes</option>
            </select>
          </label>
        </form>

        <div className="contentFlex">
          {/* Modulo Formulario Nuevo Pedido*/}
          <div className="module">
            <UserItem users={usersFiltered} />
          </div>

          {/* Modulo Formulario Nuevo Pedido*/}
          <div className="module">
            <form action="" >

              <h2>Usuario</h2>
              <div className={styles.displayForm}>
                <label htmlFor="user-name">Nombres
                  <input type="text" id="user-name" placeholder="Hernán" required className={styles.inputRegister} />
                </label>

                <label htmlFor="user-lastname">Apellidos
                  <input type="text" id="user-name" placeholder="Cortés" required className={styles.inputRegister} />
                </label>

                <label htmlFor="user-number-document">N° de documento
                  <input type="password" id="user-number-document" placeholder="**************" required className={styles.inputRegister} />
                </label>

                <label htmlFor="user-type-document">Tipo
                  <select id="user-type-document" className={styles.inputRegister}>
                    <option value="">Cedula de Ciudadanía</option>
                    <option value="">Cedula de Extranjería</option>
                    <option value="">Pasaporte</option>
                    <option value="">NIT</option>
                  </select>
                </label>

                <label htmlFor="user-birthdate">Fecha de Nacimiento
                  <input type="date" id="user-birthdate" required className={styles.inputRegister} />
                </label>

                <label htmlFor="user-email">Correo Electrónico
                  <input type="email" id="user-email" placeholder="hernan.c@gmail.com" required className={styles.inputRegister} />
                </label>


                <label htmlFor="user-password">Contraseña
                  <input type="password" id="user-password" placeholder="**************" required className={styles.inputRegister} />
                </label>

                <label htmlFor="user-confirm-password">Confirme Contraseña
                  <input type="password" id="user-confirm-password" placeholder="**************" required className={styles.inputRegister} />
                </label>

                <div className={styles.divActionsOrder}>
                  <ButtonDelete />
                  <ButtonAdd />

                </div>

              </div>

            </form>
          </div>

        </div>

      </div>
    </div>
  )
}