const Product = require('../models/product.model.js');
const ProductResponseModel = require('../models/product-response.model.js');
const http = require("http");
const https = require("https");

// Create and Save a new product
exports.create = (req, res) => {
    // Validate request
    if(!req.body.id) {
        return res.status(400).send({
            message: JSON.stringify()
        });
    }
    // Create a product
    const product = new Product({
        id: req.body.id,
      current_price: {
        value: req.body.current_price.value,
        currency_code: req.body.current_price.currency_code
      }
    });

    // Save product in the database
    product.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the product."
        });
    });
};

// Retrieve and return product from the database.
exports.find = (req, res) => {
    const id = req.params.id;
    if(id) {
        Product.findOne({'id': id}, (error, model) => {
            const product = model;
            const url = `https://redsky.target.com/v2/pdp/tcin/${id}?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics`
            https.get(url, (response) => { 
                response.setEncoding('utf8');
                let rawData = '';
                response.on('data', (chunk) => { rawData += chunk; });
                response.on('end', () => {
                    try {
                        const data =  JSON.parse(rawData);
                        //TODO: handle when item is empty
                        const productResponseModel = new ProductResponseModel(id, data.product.item.product_description.title, product.current_price);
                        res.send(productResponseModel);
                    } catch (error) {
                        console.error(error.message);
                    }
                });      
            });
        });
    }
};

// // Find a single product with a product Id
// exports.findOne = (req, res) => {
//     product.findById(req.params.id)
//     .then(product => {
//         if(!product) {
//             return res.status(404).send({
//                 message: "product not found with id " + req.params.id
//             });
//         }
//         res.send(product);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "product not found with id " + req.params.id
//             });
//         }
//         return res.status(500).send({
//             message: "Error retrieving product with id " + req.params.id
//         });
//     });
// };

// Update a product identified by the product in the request
exports.update = (req, res) => {

};
