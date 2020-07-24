var mongoose = require('mongoose');
const category = require('./category');
var Schema = mongoose.Schema;

//Se crea schema para db
var schema = new Schema(
    {
      model: String,
      description: String,
      brand: String,
      url: String,
      category: {type: mongoose.Schema.Types.ObjectId, ref: 'category'},
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
