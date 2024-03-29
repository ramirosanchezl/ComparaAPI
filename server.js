//Se requiere Express y demas modulos
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//Se setea variables dir para CORS
app.use(cors());
app.options('*', cors());


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


//Conexion a db
const db = require("./app");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });



require("./app/routes/product")(app);

// Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
