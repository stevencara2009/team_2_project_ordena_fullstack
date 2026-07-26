import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Input } from '../../components/Input/Input'
import { Button } from '../../components/Button/Button'
import * as authService from '../../services/authService' // ajustaremos el nombre exacto cuando vea tus archivos

export const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!token) {
    return (
      <div className="background">
        <div className="container">
          <p>Enlace inválido o incompleto.</p>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres")
      return
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }

    setSubmitting(true)
    try {
      await authService.resetPassword({ token, password })
      alert("Contraseña actualizada. Ya puedes iniciar sesión.")
      navigate('/login')
    } catch (error) {
      alert(error.message || "No fue posible restablecer la contraseña")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="background">
      <div className="container">
        <div className="container-form">
          <h1>Restablecer contraseña</h1>
          <form onSubmit={handleSubmit}>
            <Input
              label="Nueva contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              label="Confirmar contraseña"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button
              className="btnRegister"
              text={submitting ? "Guardando..." : "Guardar contraseña"}
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  )
}