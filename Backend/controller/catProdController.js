const catProdModel = require("../models/catProdModel");

const getCatProds = async (req, res) => {
  const catProd = await catProdModel.getCatProds();
  if (catProd) {
    res.json(catProd);
  } else {
    res.status(404).json({ error: "No se encontraron productos" });
  }
};

module.exports = { getCatProds };
