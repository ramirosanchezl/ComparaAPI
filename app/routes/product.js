module.exports = app => {
  const product = require("../controllers/product.js");
  var router = require("express").Router();
  const { v4: uuidv4 } = require('uuid');
  uuidv4();
  var fs = require('fs'); 
  var path = require('path');
  var express = require('express');
  var multer = require('multer');


  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      /*
        Files will be saved in the 'uploads' directory. Make
        sure this directory already exists!
      */
      cb(null, './img');
    },
    filename: (req, file, cb) => {
      const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
      cb(null, newFilename);
      
    },
  });
  // create the multer instance that will be used to upload/save the file
  const upload = multer({ storage });


  // Ruta para nuevo producto
  router.post("/", upload.single('img'),product.create);

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
