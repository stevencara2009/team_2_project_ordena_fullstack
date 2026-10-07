import { forwardRef } from 'react'
import styles from './Input.module.css'

export const Input = forwardRef(({
  label = "",
  type,
  className,
  placeholder = "",
  name = "",
  value = "",
  min = "",
  max = "",
  maxLength,
  onChange,
  disabled = false
}, ref) => {

  return (
    <div className={styles.inputContainer}>
      <label className={`${styles.label}`} htmlFor={label} >{label}
      </label>
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`${styles.input}`}
        name={name}
        min={min}
        max={max}
        maxLength={maxLength}
        value={value || ""}
        onChange={onChange}
        id={label}
        disabled={disabled}
      />
    </div>
  )
})

export const InputSelect = ({
  label = "Tipo",
  className,
  name,
  value,
  onChange,
  data = [],
  disabled = false
}) => {


  return (
    <div className={styles.inputContainer}>
      <label className={`${styles.label}`} htmlFor={label} >{label}
        <select
          className={`${styles.input}`}
          name={name}
          value={value}
          onChange={onChange}
          id={label}
          disabled={disabled}
        >
          <option value="">Seleccione una opción</option>
          {data.map((d, index) => {

            const option =
              typeof d === "string"
                ? {
                  value: d,
                  label: d
                }
                : d

            return (
              <option
                key={index}
                value={option.value}
              >
                {option.label}
              </option>
            )
          })}

        </select>
      </label>
    </div>
  )
}
