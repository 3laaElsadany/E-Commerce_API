const express = require("express");
const router = express.Router();
const {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand
} = require("../services/brandServices")
const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator
} = require("../utils/validators/brandValidator")



router.route("/")
  .get(getBrands)
  .post(createBrandValidator, createBrand)

router.route("/:id")
  .get(getBrandValidator, getBrand)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand)

module.exports = router;