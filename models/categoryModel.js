const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required:[true,"Category required"],
    unique:[true, 'Category must be unique'],
    minlength:[3,'Too short category name'],
    maxlength:[32,'Too long category name']
  },
  slug:{
    type:String,
    lowercase:true
  },
  image:{
    type:String
  }
},{timestamps:true})

const categoryModel = mongoose.model("Category",categorySchema);

module.exports = categoryModel;