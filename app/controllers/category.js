const Category = require("../models/category");


// Crea y guarda una categoria
exports.create = async (req, res) => {
  // Valida request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Crear un producto
  const newCategory = new Category({
    category: req.body.category
  });

  // Guarda el producto
  newCategory
    .save(newCategory)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "No se pudo crear la categoria"
      });
    });
};

// Devuelve busqueda de categorias
exports.findAll = async (req, res) => {
  const category = req.query.category;
  var condition = category ? { category: { $regex: new RegExp(category), $options: "i" } } : {};

  await Category.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Hubo un error buscando los productos"
      });
    });
};

// Encuentra un producto con un cierto id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  await Category.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "No se encontro el producto:" + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "No se encontro el producto:" + id });
    });
};

// Actualiza un producto con un cierto ID
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "La informacion no puede estar vacia"
    });
  }

  const id = req.params.id;

  await Category.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `No se pudo actualizar la categoria!`
        });
      } else res.send({ message: "Categoria actualizado." });
    })
    .catch(err => {
      res.status(500).send({
        message: "`No se pudo actualizar la categoria: " + id
      });
    });
};

// Elimina un producto con un ID especifico
exports.delete = async (req, res) => {
  const id = req.params.id;

  await Category.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `No se pudo eliminar la categoria`
        });
      } else {
        res.send({
          message: "Categoria eliminado"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar la categoria"
      });
    });
};