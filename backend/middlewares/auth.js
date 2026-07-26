import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token

  if (!token) {
    return res.status(401).json({ success: false, message: 'No autenticado' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded // { id, email, role }
    next()
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Sesión inválida o expirada' })
  }
}

// Middleware opcional para proteger rutas por rol
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'No tienes permiso para esto' })
    }
    next()
  }
}