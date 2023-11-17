const productsModel = require("../models/productsModel");

const getProducts = async (req, res) => {
  const products = await productsModel.getProducts();
  if (products) {
    res.json(products);
  } else {
    res.status(404).json({ error: "No se encontraron productos" });
  }
};



const getProductByID = async (req, res) => {
    const id = req.params.id;
    const product = await productsModel.getProductByID(id);
    if (product) {
      res.json(product);
    } else {
      res
        .status(404)
        .json({ message: "No se ha encontrado un producto con ese ID" });
    }
  };

module.exports = { getProducts, getProductByID };
