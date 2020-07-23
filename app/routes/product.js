module.exports = app => {
  const product = require("../controllers/product.js");

  var router = require("express").Router();

  // Ruta para nuevo producto
  router.post("/", product.create);

  // Ruta para obtener todos los productos
  router.get("/", product.findAll);

  // Ruta para un producto especifico
  router.get("/:id", product.findOne);

  // Ruta para actualizar un producto
  router.put("/:id", product.update);

  // Ruta para eliminar un producto
  router.delete("/:id", product.delete);

  app.use("/api/products", router);
};
