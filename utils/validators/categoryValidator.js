const {
  check
} = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware")
const { default: slugify } = require("slugify");

exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware
];

exports.createCategoryValidator = [
  check("name").not().isEmpty().withMessage("Category name is required")
  .isLength({min:3}).withMessage("Category name is too short")
  .isLength({max:32}).withMessage("Category name is too long")
  .custom((val,{req})=>{
    req.body.slug = slugify(val)
    return true;
  }),
  validatorMiddleware
]

exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  check("name").custom((val,{req})=>{
    req.body.slug = slugify(val)
    return true;
  }),
  validatorMiddleware
]

exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware
]