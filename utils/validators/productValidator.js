const {
  check
} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const Category = require("../../models/categoryModel")
const SubCategory = require("../../models/subCategoryModel")
const { default: slugify } = require("slugify");

exports.createProductValidator = [
  check('title')
  .custom((val,{req})=>{
    req.body.slug = slugify(val)
    return true;
  })
  .isLength({
    min: 3
  })
  .withMessage('must be at least 3 chars')
  .notEmpty()
  .withMessage('Product required'),
  check('description')
  .notEmpty()
  .withMessage('Product description is required')
  .isLength({
    max: 2000
  })
  .withMessage('Too long description'),
  check('quantity')
  .notEmpty()
  .withMessage('Product quantity is required')
  .isNumeric()
  .withMessage('Product quantity must be a number'),
  check('sold')
  .optional()
  .isNumeric()
  .withMessage('Product quantity must be a number'),
  check('price')
  .notEmpty()
  .withMessage('Product price is required')
  .isNumeric()
  .withMessage('Product price must be a number')
  .isLength({
    max: 32
  })
  .withMessage('To long price'),
  check('priceAfterDiscount')
  .optional()
  .isNumeric()
  .withMessage('Product priceAfterDiscount must be a number')
  .toFloat()
  .custom((value, {
    req
  }) => {
    if (req.body.price <= value) {
      throw new Error('priceAfterDiscount must be lower than price');
    }
    return true;
  }),

  check('colors')
  .optional()
  .isArray()
  .withMessage('availableColors should be array of string'),
  check('imageCover').notEmpty().withMessage('Product imageCover is required'),
  check('images')
  .optional()
  .isArray()
  .withMessage('images should be array of string'),
  check('category')
  .notEmpty()
  .withMessage('Product must be belong to a category')
  .isMongoId()
  .withMessage('Invalid ID formate')
  .custom(async (val) => {
    await Category.findById(val).then((category) => {
      if (!category) {
        return Promise.reject(new Error(`No category for this id ${val}`))
      };
    })
  }),
  check('subcategories')
  .optional()
  .isMongoId()
  .withMessage('Invalid ID formate')
  .custom(async (val) => {
    await SubCategory.find({
      _id: {
        $exists: true,
        $in: val
      }
    }).then((result) => {
      if (result.length === 0 || result.length !== val.length) {
        return Promise.reject(new Error(`Invalid subcategories Ids`))
      }
    })
  })
  .custom(async (val, {
    req
  }) => await SubCategory.find({
    category: req.body.category
  }).then((subcategories) => {
    const subCategoriesIdsInDB = [];
    subcategories.forEach((subCategory) => {
      subCategoriesIdsInDB.push(subCategory._id.toString());
    })
    const checker = val.every(i => subCategoriesIdsInDB.includes(i));
    if(!checker){
      return Promise.reject(new Error(`subCategories not belong to categories`))
    }
  })),
  check('brand').optional().isMongoId().withMessage('Invalid ID formate'),
  check('ratingsAverage')
  .optional()
  .isNumeric()
  .withMessage('ratingsAverage must be a number')
  .isLength({
    min: 1
  })
  .withMessage('Rating must be above or equal 1.0')
  .isLength({
    max: 5
  })
  .withMessage('Rating must be below or equal 5.0'),
  check('ratingsQuantity')
  .optional()
  .isNumeric()
  .withMessage('ratingsQuantity must be a number'),

  validatorMiddleware,
];

exports.getProductValidator = [
  check('id').isMongoId().withMessage('Invalid ID formate'),
  validatorMiddleware,
];

exports.updateProductValidator = [
  check('id').isMongoId().withMessage('Invalid ID formate'),
  check("title").optional().custom((val,{req})=>{
    req.body.slug = slugify(val)
    return true;
  }),
  validatorMiddleware,
];

exports.deleteProductValidator = [
  check('id').isMongoId().withMessage('Invalid ID formate'),
  validatorMiddleware,
];