const jwt = require('jsonwebtoken')

const secretKey = 'This is a secret key to decode the token'

const signToken = (user) => {
  if (user) {
    return jwt.sign(user, process.env.SECRET ?? secretKey)
  } else {
    return false
  }
}

const verifyToken = (req, res, next) => {
  const tokenString = req.headers.authorization

  if (!tokenString) {
    return res.status(401).json({ error: 'No token provided' })
  }

  try {
    const token = JSON.parse(tokenString)
    const decoded = jwt.verify(token, process.env.SECRET || secretKey)
    req.user = decoded
    next()
  } catch (error) {
    console.error(error)
    return res.status(401).json({ error: 'Invalid token' })
  }
}

module.exports = { signToken, verifyToken }
