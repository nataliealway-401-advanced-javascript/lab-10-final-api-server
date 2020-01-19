'use strict';

const express = require('express');
const router = express.Router();

const Categories = require('../../models/categories/categories');
const categories = new Categories;
const Products = require('../../models/products/products');
const products = new Products;

router.get('/api/v1/:model', handleGetAll);
router.post('/api/v1/:model', handleCreate);
router.get('/api/v1/:model/:id', handleGetOne);
router.put('/api/v1/:model/:id', handleUpdate);
router.delete('/api/v1/:model/:id', handleDelete);

// ERROR HANDLERS
const errorHandler = require('../middleware/error');
const notFoundError = require('../middleware/404');



// ROUTE HANDLER FUNCTIONS

function handleGetAll(request,response,next) {
  // expects an array of object to be returned from the model
  request.model.get()
    .then( data => {
      const output = {
        count: data.length,
        results: data,
      };
      response.status(200).json(output);
    })
    .catch( next );
}


function handleGetOne(request,response,next) {
  // expects an array with the one matching record from the model
  request.model.get(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( next );
}


function handleCreate(request,response,next) {
  // expects the record that was just added to the database
  request.model.create(request.body)
    .then( result => {
      response.status(200).json(result);
    } )
    .catch( next );
}

function handleUpdate(request,response,next) {
  // expects the record that was just updated in the database
  request.model.update(request.params.id, request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}


function handleDelete(request,response,next) {
  // Expects no return value (resource was deleted)
  request.model.delete(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

module.exports = router;