const express = require("express");
const router = express.Router();
const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory
} = require("../services/categoryServices")
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator
} = require("../utils/validators/categoryValidator")

const subCategoriesRoute= require("./subCategoryRoute")

router.use("/:categoryId/subCategories",subCategoriesRoute)


router.route("/")
  .get(getCategories)
  .post(createCategoryValidator, createCategory)

router.route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory)

module.exports = router;