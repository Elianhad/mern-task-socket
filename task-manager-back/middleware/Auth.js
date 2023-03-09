import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const auth = async (req, res, next) => {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password -confirmed -token -createdAt -updatedAt -__v')
      if (!req.user) {
        const error = new Error('No tiene inicio de sesión')
        return res.json({ msg: error })
      }
      return next()
    } catch (error) {
      return res.status(404).json({ msg: 'Hubo un error' })
    }
  }
  if (!token) {
    const error = new Error('Ha ocurrido un error de autenticación')
    return res.status(401).json({ msg: error.message })
  }
  next()
}
export default auth
