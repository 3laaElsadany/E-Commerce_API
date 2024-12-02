const Product = require('../models/productModel');
const slugify = require("slugify");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures")
const factory = require("./handlerFactory");

const asyncHandler = require('express-async-handler');

exports.getProducts = factory.getAll(Product,"Products");

exports.getProduct = factory.getOne(Product)

exports.createProduct = factory.createOne(Product);

exports.updateProduct = factory.updateOne(Product)

exports.deleteProduct = factory.deleteOne(Product);