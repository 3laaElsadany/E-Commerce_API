class ApiFeatures {

  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  filter() {
    const queryStringObj = {
      ...this.queryString
    };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((field) => delete queryStringObj[field]);
    let queryStr = JSON.stringify(queryStringObj);
    queryStr = queryStr.replace(/\b(lte|lt|gte|gt)\b/g, m => `$${m}`)

    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr), {})

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ")
      this.mongooseQuery = this.mongooseQuery.sort(sortBy)
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt")
    }
    return this;
  }
  
  limitFields() {
    if (this.queryString.fields) {
      let fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v")
    }
    return this;
  }

  search(modelName) {
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 10;
    const skip = (page - 1) * limit;

    if (this.queryString.keyword) {
      let query = {
        name: {
          $regex: this.queryString.keyword,
          $options: 'i'
        }
      };
      if (modelName === "Products") {
        const Product = require("../models/productModel")
        query = {
          $or: [{
              title: {
                $regex: this.queryString.keyword,
                $options: 'i'
              }
            },
            {
              description: {
                $regex: this.queryString.keyword,
                $options: 'i'
              }
            }
          ]
        }

        this.mongooseQuery = Product.find(query)
          .skip(skip).limit(limit)
          .populate({
            path: "category",
            select: "name -_id"
          })
      } else if (modelName === "Brands") {
        const Brand = require("../models/brandModel")
        this.mongooseQuery = Brand.find(query)
          .skip(skip).limit(limit)

      } else if (modelName === "Category") {
        const Category = require("../models/categoryModel")
        this.mongooseQuery = Category.find(query)
          .skip(skip).limit(limit)
      } else if (modelName === "subCategory") {
        const SubCategory = require("../models/subCategoryModel")
        this.mongooseQuery = SubCategory.find(query)
          .skip(skip).limit(limit)
      }
    }
    return this;
  }

  paginate(countDocuments) {
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 10;
    const skip = (page - 1) * limit;
    const endIndex = page * limit;
    const pagination = {};
    pagination.currentPage = page;
    pagination.limit = limit;
    pagination.numberOfPages = Math.ceil(countDocuments / limit);
    if (endIndex < countDocuments) {
      pagination.next = page + 1;
    }
    if (skip > 0) {
      pagination.prev = page - 1;
    }

    this.paginationResult = pagination;

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit)
    // .populate({
    //   path: "category",
    //   select: "name -_id"
    // })
    return this;
  }

}

module.exports = ApiFeatures;