'use strict';

const { server } = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

describe('Error Handlers', () => {

  it.skip('Should respond with an error 404', () => {
    return mockRequest
      .get('/bad')
      .then(result => {
        expect(result.status).toBe(404);
      })
      .catch(console.error);
  });

  it.skip('should respond with a 500 error', () => {
    const badObj = {name: 'badObject'};
    return mockRequest.post('/api/v1/products')
      .send(badObj)
      .then(results => {
        expect(results.status).toBe(500);
      })
      .catch(console.error);
  });
});

