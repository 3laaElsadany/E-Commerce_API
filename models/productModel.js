const mongoose = require("mongoose");
const {
  Schema
} = mongoose;
const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, "Product title is too short"],
    maxlength: [100, "Product title is too long"]
  },
  slug: {
    type: String,
    required: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, "Description of product is required"],
    minlength: [20, "Description of product is too short"]
  },
  quantity: {
    type: Number,
    required: [true, "Quantity of product is required"]
  },
  sold: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, "Price of product is required"],
    trim: true,
    max: [200000, "Price of product is too long"]
  },
  priceAfterDiscount: {
    type: Number,
  },
  colors: {
    type: [String]
  },
  imageCover: {
    type: String,
    required: [true, "Image cover is required"]
  },
  images: {
    type: [String]
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Product must belong to category"]
  },
  subcategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "subCategory"
  }],
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand"
  },
  ratingAverage: {
    type: Number,
    min: [1, "Rating must be above or equal 1.0"],
    max: [5, "Rating must be below or equal 5.0"]
  },
  ratingQuantity: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'category',
    select: 'name -_id'
  })
  next()
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;