'use stict';

const { server } = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);


//____________ CATEGORY ROUTES ______________

describe('Category route API testing', () => {

  it('can post() a new category', () => {
    let obj = { name: 'Electronics' };
    return mockRequest.post('/api/v1/categories')
      .send(obj)
      .then(data => {
        // let record = data.body;
        // Object.keys(obj).forEach(key => {
        // expect(record[key]).toEqual(obj[key]);
        expect(data.status).toBe(200);
      });
  });
  
  it('can get() a category', () => {
    let obj = { name:'Electronics' };
    return mockRequest.post('/api/v1/categories')
      .send(obj)
      .then(results => {
        return mockRequest.get('/api/v1/categories')
          .then(record => {
            Object.keys(obj).forEach(key => {
              expect(record.body.results[0][key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('should get() ONE category', () => {
    const obj = { name: 'Electronics' };
    return mockRequest.post('/api/v1/categories')
      .send(obj)
      .then(results => {
        return mockRequest.get(`/api/v1/categories/${results.body._id}`)
          .then(data => {
            Object.keys(obj).forEach(key => {
              expect(data.body[key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('can update() a category', () => {
    let obj = { name:'category'};
    let updateObj = {name:'NewCategory'};
    return mockRequest.post('/api/v1/categories')
      .send(obj)
      .then(results => {
        return mockRequest.put(`/api/v1/categories/${results.body._id}`)
          .send(updateObj)
          .then(data => {
            Object.keys(updateObj).forEach(key => {
              expect(data.body[key]).toEqual(updateObj[key]);
            });
          });
      });
  });
});
it('should delete a category', () => {
  const obj = { name: 'deleted' };
  return mockRequest.post('/api/v1/categories')
    .send(obj)
    .then (results => {
      return mockRequest.delete(`/api/v1/categories/${results.body._id}`)
        .then(data => {
          return mockRequest.get('/api/v1/categories')
            .then(data => {
              Object.keys(obj).forEach(key => {
                expect(data.body[key]).not.toEqual(obj[key]);
              });
            });
        });
    });
});


//____________ PRODUCTS ROUTES ______________

describe('Products route API testing', () => {
  it('can post() a new product', () => {
    let obj = { name: 'toothbrush', price: 3, category: 'hygiene' };
    return mockRequest.post('/api/v1/products')
      .send(obj)
      .then(results => {
        Object.keys(obj).forEach(key => {
          expect(results.body[key]).toEqual(obj[key]);
        });
      });
  });
});
      
it('can get() a product', () => {
  let obj = { name: 'toothbrush', price: 3, category: 'hygiene' };
  return mockRequest.post('/api/v1/products')
    .send(obj)
    .then(results => {
      return mockRequest.get(`/api/v1/products/${results.body._id}`)
        .then(data => {
          Object.keys(obj).forEach(key => {
            expect(data.body[key]).toEqual(obj[key]);
          });
        });
    });
});

it('can get() ONE product', () => {
  let obj = { name: 'Dishes', price: 40, category: 'Kitchen' };
  return mockRequest.post('/api/v1/products')
    .send(obj)
    .then(results => {
      return mockRequest.get(`/api/v1/products/${results.body._id}`)
        .then(data => {
          Object.keys(obj).forEach(key => {
            expect(data.body[key]).toEqual(obj[key]);
          });
        });
    });
});


it('can update() a product', () => {
  let obj = {name: 'Cheetos', price: 3, category: 'Snacks'};
  let updateObj = {name: 'Hot Cheetos', price: 3, category: 'Snacks'};
  return mockRequest.post('/api/v1/products')
    .send(obj)
    .then(results => {
      return mockRequest.put(`/api/v1/products/${results.body._id}`)
        .send(updateObj)
        .then(data => {
          Object.keys(updateObj).forEach(key => {
            expect(data.body[key]).toEqual(updateObj[key]);
          });
        });
    });
});

it('should delete a product', () => {
  const obj = { name: 'toothbrush', price: 3, category: 'hygiene' };
  return mockRequest.post('/api/v1/products')
    .send(obj)
    .then (results => {
      return mockRequest.delete(`/api/v1/products/${results.body._id}`)
        .then(data => {
          return mockRequest.get('/api/v1/products')
            .then(data => {
              Object.keys(obj).forEach(key => {
                expect(data.body[key]).not.toEqual(obj[key]);
              });
            });
        });
    });
});



