import styles from './Input.module.css'

export const Input = ({
  label = "",
  type,
  className,
  placeholder = "",
  name = "",
  value = "",
  onChange,
  variant = "dark"
}) => {

  const labelStyle = variant === "dark" ? styles.labelLight : styles.labelDark;

  return (
    <div>
      <label className={`${styles.labelBase} ${labelStyle}`} >{label}
        <input
          type={type}
          placeholder={placeholder}
          className={`${styles.input} ${styles[className]}`}
          name={name}
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  )
}

export const InputSelect = ({
  label = "Tipo",
  type,
  placeholder = "",
  className,
  onChange,
  data,
  variant = "dark"
}) => {

  const labelStyle = variant === "dark" ? styles.labelLight : styles.labelDark

  return (
    <div>
      <label className={`${styles.labelBase} ${labelStyle}`} >{label}
        <select
          type={type}
          placeholder={placeholder}
          className={`${styles.input} ${styles[className]}`}
          onChange={onChange}
        >
          {data.map((d, index) => (
            <option key={index} value={d}>{d}</option>
          ))}

        </select>
      </label>
    </div>
  )
}
