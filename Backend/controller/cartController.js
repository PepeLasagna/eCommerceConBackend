const cartModel = require("../models/cartModel.js");

const getCartByID = async (req, res) => {
  const id = req.params.id;
  const cart = await cartModel.getCartByID(id);
  if (cart) {
    res.json(cart);
  } else {
    res
      .status(404)
      .json({
        message: "No se han encontrado productos relacionados con ese ID",
      });
  }
};

const addItem = async (req, res) => {
  const id = req.params.id;
  const addItem = await cartModel.addItem(id, req.body);
  if (addItem) {
    res.json({
      message: "Se agregó el elemento al carrito correctamente",
      ...req.body,
    });
  } else {
    res.status(500).json({ message: "Hubo un error." });
  }
};
module.exports = { getCartByID, addItem };
