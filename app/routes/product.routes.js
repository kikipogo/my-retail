module.exports = app => {
  const products = require('../controllers/product.controller.js');

  // Create a new product
  app.post('/products', products.create);

  // Retrieve Product by id
  app.get('/products/:id', products.find);

  //TODO: Update a product with id
  app.put('/products/:id', products.update);
};
