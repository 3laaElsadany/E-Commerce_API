const {
  check
} = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware")
const { default: slugify } = require("slugify");

exports.getsubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subCategory id format"),
  validatorMiddleware
];

exports.createSubCategoryValidator = [
  check("name")
  .custom((val,{req})=>{
    req.body.slug = slugify(val)
    return true;
  }).not().isEmpty().withMessage("subCategory name is required")
  .isLength({
    min: 3
  }).withMessage("subCategory name is too short")
  .isLength({
    max: 32
  }).withMessage("subCategory name is too long"),
  check("category").notEmpty().withMessage("subCategory must belong to category")
  .isMongoId().withMessage("Invalid subCategory id format"),
  validatorMiddleware
]

exports.updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subCategory id format"),
  check("name").custom((val,{req})=>{
    req.body.slug = slugify(val)
    return true;
  }),
  validatorMiddleware
]

exports.deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subCategory id format"),
  validatorMiddleware
]