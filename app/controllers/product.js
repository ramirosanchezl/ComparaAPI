const Product = require("../models/product");


// Crea y guarda un producto
exports.create = async (req, res) => {
  // Valida request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Crear un producto
  const newProduct = new Product({
    model: req.body.model,
    description: req.body.description,
    brand: req.body.brand,
    url: req.body.url,
    category: req.body.category,
    price: req.body.price
  });

  // Guarda el producto
  newProduct
    .save(newProduct)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "No se pudo crear el producto"
      });
    });
};

// Devuelve todos los productos con un cierto tag
exports.findAll = async (req, res) => {
  const category = req.query.category;
  var condition = category ? { category: { $regex: new RegExp(category), $options: "i" } } : {};

  await Product.find(condition)
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

  await Product.findById(id)
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

  await Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `No se pudo actualizar el producto!`
        });
      } else res.send({ message: "Producto actualizado." });
    })
    .catch(err => {
      res.status(500).send({
        message: "`No se pudo actualizar el producto: " + id
      });
    });
};

// Elimina un producto con un ID especifico
exports.delete = async (req, res) => {
  const id = req.params.id;

  await Product.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `No se pudo eliminar el producto`
        });
      } else {
        res.send({
          message: "Producto eliminado"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar el producto"
      });
    });
};





