//Config db
const dbConfig = require("./config/db.js");

//Se requiere mongoose para db
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.products = require("./models/product.js")(mongoose);
db.categories = require("./models/category.js")(mongoose);

module.exports = db;
