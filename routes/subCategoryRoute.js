const express = require("express");
const router = express.Router({
  mergeParams: true
});
const {
  createSubCategoryValidator,
  getsubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator
} = require("../utils/validators/subCategoryValidator")
const {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
  createFilterObject
} = require("../services/subCategoryServices");


router.route("/")
  .get(createFilterObject,getSubCategories)
  .post(setCategoryIdToBody,createSubCategoryValidator, createSubCategory)

router.route("/:id")
  .get(getsubCategoryValidator, getSubCategory)
  .put(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory)


module.exports = router;