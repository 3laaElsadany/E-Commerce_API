const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brandSchema = new Schema({
  name: {
    type: String,
    required:[true,"Brand required"],
    unique:[true, 'Brand must be unique'],
    minlength:[3,'Too short brand name'],
    maxlength:[32,'Too long brand name']
  },
  slug:{
    type:String,
    lowercase:true
  },
  image:{
    type:String
  }
},{timestamps:true})

const brandModel = mongoose.model("Brand",brandSchema);

module.exports = brandModel;