import { Input, InputSelect } from '../../components/Input/Input'
import { PLATES_TYPE } from '../../data/options'

export const ProductFilters = ({ productSearch, setProductSearch, plateType, setPlateType }) => {

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <fieldset className="form-flex">
        <legend>Filtro</legend>
        <Input
          label="Buscar"
          type="text"
          className="inputPrimary"
          placeholder=""
          name="productName"
          value={productSearch}
          onChange={(e) => setProductSearch(e.target.value)}
          variant='dark'
        />

        <div className="divSearch">
          <button type='button' ><i className="fa-solid fa-magnifying-glass" style={{ width: 25, height: 25 }}></i></button>
        </div>

        <InputSelect
          label="Tipo de comida"
          type="text"
          className="inputPrimary"
          name=""
          value={plateType}
          placeholder=""
          onChange={(e) => setPlateType(e.target.value)}
          data={PLATES_TYPE}
        />

      </fieldset>
    </form>
  )
} 