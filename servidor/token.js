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
  const token = req.headers.authorization
  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }

  jwt.verify(token, process.env.SECRET ?? secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' })
    }

    req.userId = decoded.id
    next()
  })
}

module.exports = { signToken, verifyToken }
