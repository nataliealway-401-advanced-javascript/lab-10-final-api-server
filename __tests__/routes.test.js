'use stict';

const { server } = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

describe('route API testing', () => {
  it.skip('can post() a new product', () => {
    let obj = { name: 'TV', price: 100, category: 'Electronics' };
    return mockRequest.post('/api/v1/products')
      .send(obj)
      .then(data => {
        let record = data.body;
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      });
    });

    it.skip('can get() a product', () => {
      let obj = { name:'phone', price:80, category:'Electronics' };
      return mockRequest.post('/api/v1/products')
        .send(obj)
        .then(data => {
          return mockRequest.get(`/api/v1/products`)
            .then(record => {
              Object.keys(obj).forEach(key => {
                expect(record.body[1][key]).toEqual(obj[key]);
              });
            });
        });
    });
    it('should delete a product', () => {
      const obj = { name: 'deleted', price: 10, category: 'test' };
      return mockRequest.post('/api/v1/products')
        .send(obj)
        .then(results => {
          return mockRequest.delete(`/api/v1/products`)
            .then(data => {
              Object.keys(obj).forEach(key => {
                expect(data.body[key]).not.toEqual(obj[key]);
              });
            });
        });
    });
  });

