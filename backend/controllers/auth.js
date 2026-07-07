
export class AuthController {
  
  constructor ({ userModel }) {
    this.userModel = userModel
  }

  login = async (req, res) => {
    const { email, password } = req.body

    try {
      const user = await this.userModel.usernameLogin({ email })

      if (!user) {
        return res.status(401).json({ success: false, message: 'Credenciales inválidas' })
      }

      if (user.password !== password) {
        return res.status(401).json({ success: false, message: 'Credenciales inválidas' })
      }

      const { password: _, ...userWithoutPassword } = user
      
      return res.status(200).json({
        success: true,
        user: userWithoutPassword
      })

    } catch (error) {
      console.error(error)
      return res.status(500).json({ success: false, message: 'Error interno' })
    }

  }
}

