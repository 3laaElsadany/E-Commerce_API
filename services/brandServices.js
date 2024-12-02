const Brand = require('../models/brandModel');
const slugify = require("slugify");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("./handlerFactory");

const asyncHandler = require('express-async-handler');

exports.getBrands = factory.getAll(Brand,"Brands");

exports.getBrand = factory.getOne(Brand);

exports.createBrand = factory.createOne(Brand);

exports.updateBrand = factory.updateOne(Brand);

exports.deleteBrand = factory.deleteOne(Brand);