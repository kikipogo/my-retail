module.exports = (app) => {
    const products = require('../controllers/product.controller.js');

    // Create a new product
    app.post('/products', products.create);

    // Retrieve Products
    app.get('/products/:id', products.find);

    // Retrieve a single Product with productId
    app.get('/products/:productId', products.findOne);

    // Update a product with productId
    app.put('/products/:productId', products.update);

}
