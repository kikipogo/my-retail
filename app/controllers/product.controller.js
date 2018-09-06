const Product = require('../models/product.model.js');
const ProductResponseModel = require('../models/product-response.model.js');
const https = require('https');

/**
 * Create and Save a new product
 **/
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id) {
    return res.status(404).send({
      message: JSON.stringify()
    });
  }
  // Construct new product
  const product = new Product({
    id: req.body.id,
    current_price: {
      value: req.body.current_price.value,
      currency_code: req.body.current_price.currency_code
    }
  });
  //Save product in the database
  product
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(500).send({
        message: error.message ||
          'Some error occurred while creating the product.'
      });
    });
};

/**
 * Retrieve and return product from the database.
 **/
exports.find = (req, res) => {
  const id = req.params.id;
  if (id) {
    Product.findOne({ id: id }, (error, model) => {
      const product = model;
      const url = `https://redsky.target.com/v2/pdp/tcin/${id}?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics`;
      https.get(url, response => {
        response.setEncoding('utf8');
        let rawData = '';
        response.on('data', chunk => {
          rawData += chunk;
        });
        response.on('end', () => {
          try {
            const data = JSON.parse(rawData);
            const productResponseModel = new ProductResponseModel(
              id,
              data.product.item.product_description.title,
              product.current_price
            );
            res.send(productResponseModel);
          } catch (error) {
            res.status(404).send(`No information found for Product_id: ${id}`);
          }
        });
      });
    });
  }
};

//TODO: Update a product identified by the product in the request
exports.update = (req, res) => {};
