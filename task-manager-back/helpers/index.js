import jwt from 'jsonwebtoken'

const idGenerator = () => {
  const random = Math.random().toString(32).substring(2)
  const fecha = Date.now().toString(32)
  return random + fecha
}
const jwtGenerator = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '10d' })
}

export { idGenerator, jwtGenerator }
