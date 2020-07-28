var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//Se crea schema para db
var schema = new Schema(
    {
      model: String,
      description: String,
      brand: String,
      url: String,
      category: String,
      price: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });


  module.exports = mongoose.model('product', schema);
