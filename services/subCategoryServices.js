const SubCategory = require('../models/subCategoryModel');
const slugify = require("slugify");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("./handlerFactory")

const asyncHandler = require('express-async-handler');

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) {
    req.body.category = req.params.categoryId
  };
  next();
};

exports.createFilterObject = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) {
    filterObject = {
      category: req.params.categoryId
    }
  }
  req.filterObject = filterObject;
  next()
};

exports.getSubCategories = factory.getAll(SubCategory,"subCategory");

exports.createSubCategory = factory.createOne(SubCategory);

exports.getSubCategory = factory.getOne(SubCategory)


exports.updateSubCategory = factory.updateOne(SubCategory)

exports.deleteSubCategory = factory.deleteOne(SubCategory);