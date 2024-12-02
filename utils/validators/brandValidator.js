const {
  check
} = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const { default: slugify } = require("slugify");

exports.getBrandValidator = [
  check("id").isMongoId().withMessage("Invalid brand id format"),
  validatorMiddleware
];

exports.createBrandValidator = [
  check("name").not().isEmpty().withMessage("Brand name is required")
  .isLength({min:3}).withMessage("Brand name is too short")
  .isLength({max:32}).withMessage("Brand name is too long")
  .custom((val,{req})=>{
    req.body.slug = slugify(val)
    return true;
  }),
  validatorMiddleware
]

exports.updateBrandValidator = [
  check("id").isMongoId().withMessage("Invalid brand id format"),
  check("name").custom((val,{req})=>{
    req.body.slug = slugify(val)
    return true;
  }),
  validatorMiddleware
]

exports.deleteBrandValidator = [
  check("id").isMongoId().withMessage("Invalid brand id format"),
  validatorMiddleware
]