const relatedModel = require('../models/relatedModel.js')


const getRelatedByID = async (req, res) => {
    const id = req.params.id;
    const relateds = await relatedModel.getRelatedByID(id);
    if (relateds) {
      res.json(relateds);
    } else {
      res
        .status(404)
        .json({ message: "No se han encontrado productos relacionados con ese ID" });
    }
  };

  module.exports = {getRelatedByID}