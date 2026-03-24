import { ButtonAdd, ButtonAddUser, ButtonBack, ButtonDelete } from '../../components/Button/Button'
import { UserItem } from './UserItem/UserItem'
import styles from './CreateUser.module.css'

export const CreateUser = () => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1>Usuarios</h1>

        <form action="" className={styles.formFlex}>
          <label htmlFor="order-id">
            <input type="number" id="order-id" className={styles.inputTable} />
          </label>
          <div className={styles.divSearch}>
            <button type='button' ><i className="fa-solid fa-magnifying-glass" style={{ width: 25, height: 25 }}></i></button>
          </div>
        </form>

        <ul className={styles.menuUsers}>
          <li>Todos</li>
          <li>Meseros</li>
          <li>Cocineros</li>
          <li>Administradores</li>
          <li><ButtonAddUser /></li>
        </ul>

        <div className={styles.contentFlex}>
          {/* Modulo Formulario Nuevo Pedido*/}
          <div className={styles.module}>
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
          </div>

          {/* Modulo Formulario Nuevo Pedido*/}
          <div className={styles.module}>
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