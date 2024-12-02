const Category = require('../models/categoryModel');
const slugify = require("slugify");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures")
const factory = require("./handlerFactory")

const asyncHandler = require('express-async-handler');

exports.getCategories = factory.getAll(Category,"Category")


exports.getCategory = factory.getOne(Category)

exports.createCategory = factory.createOne(Category);

exports.updateCategory = factory.updateOne(Category)

exports.deleteCategory= factory.deleteOne(Category)