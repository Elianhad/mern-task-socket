import User from '../models/User.js'
import { idGenerator, jwtGenerator } from '../helpers/index.js'
const createdNewUser = async (req, res) => {
  // evitar registros duplicados
  const { email } = req.body
  const isUserDB = await User.findOne({ email })
  if (isUserDB) {
    const error = new Error('Usuario ya registrado')
    return res.status(400).json({ msg: error.message })
  }
  try {
    const newUser = new User(req.body)
    newUser.token = idGenerator()
    const saveUser = await newUser.save()
    res.json(saveUser)
  } catch (error) {
    console.error(error)
  }
}
const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    const error = new Error('El usuario no existe')
    res.status(404).json({ msg: error.message })
  }
  if (!user.confirmed) {
    const error = new Error('La cuenta no fue confirmada')
    res.status(403).json({ msg: error.message })
  }
  if (await user.checkPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: jwtGenerator(user._id)
    })
  } else {
    const error = new Error('La contraseña es incorrecta')
    res.status(403).json({ msg: error.message })
  }
}
const confirmAccount = async (req, res) => {
  const { token } = req.params
  const userToConfirm = await User.findOne({ token })
  if (!userToConfirm) {
    const error = new Error('Hubo un error en la validación')
    res.status(403).json({ msg: error.message })
  }
  try {
    userToConfirm.confirmed = true
    userToConfirm.token = ''
    await userToConfirm.save()
    res.json({ msg: 'Usuario confirmado' })
  } catch (error) {
    console.log(error)
  }
}
const resetPassword = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    const error = new Error('El usuario no existe')
    res.status(404).json({ msg: error.message })
  }
  try {
    user.token = idGenerator()
    await user.save()
    res.json({ msg: 'Revisa tu correo para cambiar contraseña' })
  } catch (error) {
    console.log(error)
  }
}
const resetPasswordWithToken = async (req, res) => {
  const { token } = req.params
  const userToReset = await User.findOne({ token })
  if (userToReset) {
    res.json({ msg: 'Token válido' })
  } else {
    const error = new Error('Hubo un error en la validación')
    res.status(402).json({ msg: error.message })
  }
}
const setNewPassword = async (req, res) => {
  const { token } = req.params
  const { password } = req.body
  const userToReset = await User.findOne({ token })
  if (userToReset) {
    userToReset.password = password
    userToReset.token = ''
    try {
      await userToReset.save()
    } catch (error) {
      console.log(error)
    }
    res.json({ msg: 'Su contraseña ha sido cambiada' })
  } else {
    const error = new Error('Hubo un error en la validación')
    res.status(402).json({ msg: error.message })
  }
}
const getProfile = async (req, res) => {
  const { user } = req
  res.json(user)
}

export { createdNewUser, login, confirmAccount, resetPassword, resetPasswordWithToken, setNewPassword, getProfile }
