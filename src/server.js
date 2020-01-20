'use strict';

require('dotenv').config('../.env');
// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


// Esoteric Resources
const errorHandler = require( './middleware/error');
const notFound = require( './middleware/404' );

// Routes 
const routes = require('./routes/v1.js');


// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(routes);




module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log('listening on port ', PORT));
  },
};