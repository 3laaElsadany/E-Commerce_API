const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const subCategorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    unique: [true, "SubCategory is inique"],
    minLength: [2, "SubCategory is too short"],
    maxLength: [32, "SubCategory is too long"]
  },
  slug: {
    type: String,
    lowercase: true
  },
  category: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "SubCategory is required"]
  }
}, {
  timestamps: true
})

const subCategory = mongoose.model("subCategory", subCategorySchema);

module.exports =  subCategory;

