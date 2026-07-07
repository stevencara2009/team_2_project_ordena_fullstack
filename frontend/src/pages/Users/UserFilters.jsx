import styles from './Users.module.css'
import { Input, InputSelect } from '../../components/Input/Input'
import { USERS_TYPE, DOCUMENTS_TYPE, COUNTRIES } from "../../data/options.js"

export const UserFilters = ({ userSearch, setUserSearch, userType, setUserType }) => {

  return (

    <form onSubmit={(e) => e.preventDefault()}>
      <fieldset className="form-flex">
        <legend>Filtro</legend>
        <Input
          label="Buscar"
          type="text"
          placeholder=""
          className="inputPrimary"
          name="userName"
          value={userSearch}
          onChange={(e) => setUserSearch(e.target.value)}
          required
        />

        <div className="divSearch">
          <button type='button' ><i className="fa-solid fa-magnifying-glass" style={{ width: 25, height: 25 }}></i></button>
        </div>

        <InputSelect
          label="Filtrar por:"
          type="text"
          className="inputPrimary"
          name="userType"
          value={userType}
          placeholder=""
          onChange={(e) => setUserType(e.target.value)}
          data={USERS_TYPE}
        />

      </fieldset>
    </form>

  )
} 