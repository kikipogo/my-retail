# my-retail RESTful Service

The goal for this exercise is to create an end-to-end Proof-of-Concept for a products API, which will aggregate product data from multiple sources and return it as JSON to the caller. 

## GET /products/{id}

Response 200: JSON describing product. 
Example: 
```{"id":13860428,"name":"The Big Lebowski (Blu-ray) (Widescreen)","current_price":{"value": 10.50,"currency_code":"USD"}}```

Response 404: No information found for Product.id.

## POST /products

Response 200: JSON describing product.
Request Body: 
```{"id": "Number","current_price": {"value": "Number", "currency_code": "String"}}```

Response 400: Bad request