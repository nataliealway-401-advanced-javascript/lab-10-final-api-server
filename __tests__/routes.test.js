'use stict';

const { server } = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

describe('Route testing', () => {

    it('should respond properly on get to /categories', () => {
  
      return mockRequest
        .get('/api/v1/categories')
        .then(results => {
          expect(results.status).toBe(200);
  
        })
        .catch(console.error);
  
    });


});