const userModel = require('../models/userModel')
const { signToken, verifyToken } = require('../token')
const jwt = require('jsonwebtoken')
const secretKey = 'This is a secret key to decode the token'

const getUser = async (req, res) => {
  const { email, password } = req.body
  const user = await userModel.getUser({ email, password })
  if (user.length > 0) {
    console.log(user[0].email)
    const token = jwt.sign(user[0].email, process.env.SECRET ?? secretKey)
    res.json(token)
  } else {
    res.status(404).json(false)
  }
}

const getUserByToken = async (req, res) => {
  const token = req.headers.authorization
  console.log(token)
  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }
  jwt.verify(token, process.env.SECRET ?? secretKey, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(401).json({ error: 'Invalid token' })
    }
    const currentUser = userModel.getUserByToken(decoded)
    console.log(currentUser)
    if (currentUser) {
      res.json(currentUser)
    } else {
      res.status(404).json({ error: 'No se ha encontrado el usuario' })
    }
  })
}

const createUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ error: 'Complete todos los datos' })
  }
  const user = await userModel.createUser({
    first_name,
    last_name,
    email,
    password,
  })
  if (user) {
    res.json(user)
  } else {
    res.status(500).json({ error: 'No se pudo crear el usuario' })
  }
}

const modifyUser = async (req, res) => {
  const user = await userModel.modifyUser(req.body)
  if (user) {
    res.json(user)
  } else {
    res.status(500).json({ error: 'No se pudo modificar el usuario' })
  }
}

const deleteUser = async (req, res) => {
  const codedUser = req.headers.authorization
  const user = await userModel.deleteUser(codedUser)
  if (user) {
    res.json(user)
  } else {
    res.status(500).json({ error: 'No se pudo eliminar el usuario' })
  }
}

module.exports = { getUser, getUserByToken, createUser, modifyUser, deleteUser }
