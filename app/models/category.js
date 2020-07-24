var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Se crea schema para db
var schema = new Schema(
    {
      category: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });


  module.exports = mongoose.model('category', schema);
