const product = require("../models/product");


// Crea y guarda un producto
exports.create = (req, res) => {
  // Valida request
  if (!req.body.model) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Crear un producto
  const newProduct = new product({
    model: req.body.model,
    description: req.body.description,
    brand: req.body.brand,
    url: req.body.url,
    tag: req.body.tag,
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
exports.findAll = (req, res) => {
  const tag = req.query.tag;
  var condition = tag ? { tag: { $regex: new RegExp(tag), $options: "i" } } : {};

  product.find(condition)
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
exports.findOne = (req, res) => {
  const id = req.params.id;

  product.findById(id)
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
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "La informacion no puede estar vacia"
    });
  }

  const id = req.params.id;

  product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
exports.delete = (req, res) => {
  const id = req.params.id;

  product.findByIdAndRemove(id, { useFindAndModify: false })
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




