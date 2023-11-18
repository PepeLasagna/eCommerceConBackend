const userModel = require("../models/userModel");

const getUser = async (req, res) => {
  const id = req.params.id
  const user = await userModel.getUser(id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).json({ error: "No se encontraron usuarios" })
  }
}

const createUser = async (req, res) => {
  const user = await userModel.createUser(req.body)
  if (user) {
    res.json(user)
  } else {
    res.status(500).json({ error: "No se pudo crear el usuario" })
  }
}

const modifyUser = async (req, res) => {
  const user = await userModel.modifyUser(req.body)
  if (user) {
    res.json(user)
  } else {
    res.status(500).json({ error: "No se pudo modificar el usuario" })
  }
}

const deleteUser = async (req, res) => {
  const id = req.params.id
  const user = await userModel.deleteUser(id)
  if (user) {
    res.json(user)
  } else {
    res.status(500).json({ error: "No se pudo eliminar el usuario" })
  }
}

module.exports = { getUser, createUser, modifyUser, deleteUser }