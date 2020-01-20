'use strict';

const express = require('express');
const router = express.Router();


require('../../models/categories.js');
require('../../models/products.js');


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
 * Routes
 */
router.get('/api/v1/:model', handleGetAll);
router.post('/api/v1/:model', handlePost);
router.get('/api/v1/:model/:id', handleGetOne);
router.put('/api/v1/:model/:id', handlePut);
router.delete('/api/v1/:model/:id', handleDelete);

router.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
})


/**
 * handles all requests 
 * @function handleGetAll
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function handleGetAll(req, res, next) {
  req.model.get()
    .then(record => res.json(record))
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
    .then(result => res.json(result))
    .catch(next);
}


/**
 * handles route for updating record
 * @function handlePut
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function handlePut(request,response,next) {
  request.model.update(request.params.id, request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}


/**
 * handles route that deletes a record
 * @function handleGetAll
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function handleDelete(request,response,next) {
  request.model.delete(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( next );
}
/**
 * @model router
 */
module.exports = router;
