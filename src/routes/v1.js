'use strict';

const express = require('express');
const router = express.Router();

const categories = require('../../models/categories.js');
const products = require('../../models/products.js');


/**
 * sets model to the route that is inputted, or returns a invalid model
 * @function getModel
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns model
 */
function getModel(req, res, next){
  let model = req.params.model;
  switch(model){
  case 'categories':
    req.model = categories;
    next();
    return;
  case 'products':
    req.model = products;
    next();
    return;
  default:
    next('invalid model');
  }
}

router.param('model', getModel);

/**
 *  Routes
 */
router.get('/api/v1/:model', handleGetAll);
router.post('/api/v1/:model', handlePost);
router.get('/api/v1/:model/:id', handleGetOne);
router.put('/api/v1/:model/:id', handlePut);
router.delete('/api/v1/:model/:id', handleDelete);


//Home route
router.get('/', (req, res) => {
  res.send('Main page');
});


/**
 * handles all requests 
 * @function handleGetAll
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function handleGetAll(req, res, next) {
  req.model.get()
    .then(records => {
      const output = {
        count: records.length,
        results: records,
      };
      res.status(200).json(output);
    })
    .catch(next);
}


/**
 * handles and records one request
 * @function handleGetOne
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function handleGetOne(req, res, next) {
  let id = req.params.id;
  req.model.get(id)
    .then(record => res.json(record))
    .catch(next);
}


/**
 * handles route that creates a record
 * @function handlePost
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function handlePost(req, res, next) {
  req.model.post(req.body)
    .then(result => res.status(200).json(result))
    .catch(next);
}


/**
 * handles route for updating record
 * @function handlePut
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function handlePut(req, res ,next) {
  let id = req.params.id;
  req.model.put(id, req.body)
    .then(result => res.status(200).json(result))
    .catch(next);
}


/**
 * handles route that deletes a record
 * @function handleGetAll
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function handleDelete(req,res ,next) {
  let id = req.params.id;
  req.model.delete(id)
    .then(result => res.status(200).json(result))
    .catch(next);
}

module.exports = router;
