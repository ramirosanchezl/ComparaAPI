module.exports = app => {
    const category = require("../controllers/category.js");
  
    var router = require("express").Router();
  
    // Ruta para nuevo categoria
    router.post("/", category.create);
  
    // Ruta para obtener todos las categorias
    router.get("/", category.findAll);
  
    // Ruta para una categoria especifica
    router.get("/:id", category.findOne);
  
    // Ruta para actualizar una categoria
    router.put("/:id", category.update);
  
    // Ruta para eliminar una categoria
    router.delete("/:id", category.delete);
  
    app.use("/api/categories", router);
  };