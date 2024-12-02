const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures")
const asyncHandler = require('express-async-handler');

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const {
      id
    } = req.params;
    const document = await Model.findByIdAndDelete(id);

    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404))
    }

    res.status(204).send()
  })

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const document = await Model.findByIdAndUpdate(
      id, req.body, {
        new: true
      })
    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404))
    }
    res.status(200).json({
      data: document
    })
  })

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {

    const model = await Model.create(req.body)
    res.status(201).json({
      data: model
    })

  })

exports.getOne = Model =>
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const document = await Model.find({
      _id: id
    }, {
      "__v": 0
    });
    if (!document) {
      return next(new ApiError("Document not found", 404))
    }
    res.json({
      data: document
    })
  })

exports.getAll = (Model, modelName = '') => 
  asyncHandler(async (req, res) => {

    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj
    }

    const documentsCount = await Model.countDocuments();

    const apiFeatures = new ApiFeatures(Model.find(filter), req.query);

    apiFeatures
      .paginate(documentsCount)
      .filter()
      .search(modelName)
      .limitFields()
      .sort()

    const {
      mongooseQuery,
      paginationResult
    } = apiFeatures;

    const documents = await mongooseQuery;

    res.json({
      result: documents.length,
      paginationResult,
      data: documents
    });
  })


// exports.getAll = (Model, modelName = '') =>
//   asyncHandler(async (req, res) => {
//     let filter = {};
//     if (req.filterObj) {
//       filter = req.filterObj;
//     }
//     // Build query
//     const documentsCounts = await Model.countDocuments();
//     const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
//       .paginate(documentsCounts)
//       .filter()
//       .search(modelName)
//       .limitFields()
//       .sort();

//     // Execute query
//     const { mongooseQuery, paginationResult } = apiFeatures;
//     const documents = await mongooseQuery;

//     res
//       .status(200)
//       .json({ results: documents.length, paginationResult, data: documents });
//   });