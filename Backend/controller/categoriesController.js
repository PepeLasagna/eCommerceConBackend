const categoriesModel = require("../models/categoriesModel");

const getCategories = async (req, res) => {
  const categories = await categoriesModel.getCategories();
  if (categories) {
    res.json(categories);
  } else {
    res.status(404).json({ error: "No se encontraron categorias" });
  }
};

module.exports = { getCategories };
