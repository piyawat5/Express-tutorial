const productServices = require("../services/product.service");
const multer = require("multer");
const multerConfig = require("../configs/multer");
const upload = multer(multerConfig.config).single(multerConfig.keyUpload);

/**
 * @swagger
 * /products:
 *  get:
 *    summary: Returns the list of all the products
 *    tags: [Products]
 *    responses:
 *      200:
 *        description: show all products
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/ProductResponse'
 *      401:
 *        description: Un Authenticated
 *    security: [{bearerAuth: []}]
 */

exports.getProducts = async (req, res) => {
  res.json(await productServices.allProducts());
};

/**
 * @swagger
 * /products/price?search={search}:
 *  get:
 *    summary: search product
 *    tags: [Products]
 *    parameters:
 *      - in: query
 *        name: search
 *        schema:
 *          type: string
 *        required: true
 *        description: search product
 *    responses:
 *      200:
 *        description: search product
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/ProductResponse'
 *      404:
 *        description: product not found
 *      401:
 *        description: Un Authenticated
 *    security: [{bearerAuth: []}]
 */
exports.getProductsBySearch = async (req, res) => {
  const { search } = req.query;
  if (!search) {
    res.json(await productServices.allProducts());
  } else {
    const result = await productServices.findByName(search);
    result.length > 0 ? res.json(result) : res.status(404).json(result);
  }
};

/**
 * @swagger
 * /products/price?min={min}&max={max}:
 *  get:
 *    summary: search product price
 *    tags: [Products]
 *    parameters:
 *      - in: query
 *        name: min
 *        schema:
 *          type: number
 *        required: true
 *        description: search min product price
 *      - in: query
 *        name: max
 *        schema:
 *          type: number
 *        required: true
 *        description: search max product price
 *    responses:
 *      200:
 *        description: search product price
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/ProductResponse'
 *      404:
 *        description: product not found
 *      401:
 *        description: Un Authenticated
 *    security: [{bearerAuth: []}]
 */

exports.getProductByPrice = async (req, res) => {
  const result = await productServices.findByPrice(req.query);
  result.length > 0 ? res.json(result) : res.status(404).json(result);
};

/**
 * @swagger
 * /products/{id}:
 *  get:
 *    summary: search product price
 *    tags: [Products]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        required: true
 *        description: search min product price
 *    responses:
 *      200:
 *        description: search product price
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/ProductResponse'
 *      404:
 *        description: product not found
 *      401:
 *        description: Un Authenticated
 *    security: [{bearerAuth: []}]
 */

exports.getProduct = async (req, res) => {
  const id = req.params.id;
  const result = await productServices.findById(id);
  result ? res.json(result) : res.status(404).json(null);
};

/**
 * @swagger
 * /products:
 *  post:
 *    summary: Returns the list of all the products
 *    tags: [Products]
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/PostProductRequest'
 *    responses:
 *      200:
 *        description: show all products
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProductResponse'
 *      500:
 *        description: something went wrong
 *      401:
 *        description: Un Authenticated
 *    security: [{bearerAuth: []}]
 */

exports.addProduct = (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      console.log(`error: ${JSON.stringify(error)}`);
      return res.status(500).json({ message: error.message });
    }
    return res.status(201).json(await productServices.add(req.body, req.file));
  });
};

/**
 * @swagger
 * /products/{id}:
 *  put:
 *    summary: Returns the list of all the products
 *    tags: [Products]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        required: true
 *        description: The product id
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/PostProductRequest'
 *    responses:
 *      200:
 *        description: show all products
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProductResponse'
 *      500:
 *        description: something went wrong
 *      404:
 *        description: product not found
 *      401:
 *        description: Un Authenticated
 *    security: [{bearerAuth: []}]
 */

exports.editProduct = (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      console.log(`error: ${JSON.stringify(error)}`);
      return res.status(500).json({ message: error.message });
    }
    const result = await productServices.edit(
      req.params.id,
      req.body,
      req.file
    );
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({});
    }
  });
};

/**
 * @swagger
 * /products/{id}:
 *  delete:
 *    summary: Returns the list of all the products
 *    tags: [Products]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        required: true
 *        description: The product id
 *    responses:
 *      200:
 *        description: show all products
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProductResponse'
 *      404:
 *        description: product not found
 *      401:
 *        description: Un Authenticated
 *    security: [{bearerAuth: []}]
 */
exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  const result = await productServices.delete(id);
  result ? res.json(result) : res.status(404).json(result);
};

/**
 * @swagger
 * tags:
 *    name: Products
 *    description: Products management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *    ProductResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of the account
 *        name:
 *          type: string
 *          description: The name product
 *        image:
 *          type: string
 *          description: The account username
 *        price:
 *          type: string
 *          description: The account password
 *        stock:
 *          type: string
 *          description: The account role
 *        created_at:
 *          type: string
 *          description: The account created
 *        updated_at:
 *          type: string
 *          description: The account updated
 *    PostProductRequest:
 *      type: object
 *      required:
 *        -name
 *        -price
 *        -stock
 *      properties:
 *        name:
 *          type: string
 *          description: The account username
 *        image:
 *          type: array
 *          items:
 *            type: string
 *            format: binary
 *          description: The account password
 *        price:
 *          type: string
 *          description: The account role
 *        stock:
 *          type: string
 *          description: The account role
 */
