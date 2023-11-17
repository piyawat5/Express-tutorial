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
 *              item:
 *                $ref: '#/components/schemas/AllProductsResponse'
 *      401:
 *        description: Un Authenticated
 *    security: [{bearerAuth: []}]
 */

exports.getProducts = async (req, res) => {
  res.json(await productServices.allProducts());
};

/**
 * @swagger
 * /products/total:
 *  get:
 *    summary: Returns the count of all the products
 *    tags: [Products]
 *    responses:
 *      200:
 *        description: Returns the count of all the products
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProductCountResponse'
 *      401:
 *        description: Un Authenticated
 *    security: [{bearerAuth: []}]
 */

exports.getProductByTotal = async (req, res) => {
  const result = await productServices.allProductsPrice();
  res.json({ result });
};

/**
 * @swagger
 * /products/price:
 *  get:
 *    summary: search price
 *    tags: [Products]
 *    requestQuery:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ProductsPriceRequest'
 *    responses:
 *      200:
 *        description: search price
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProductsPriceResponse'
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
 * /products/:id:
 *  get:
 *    summary: search price
 *    tags: [Products]
 *    requestQuery:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ProductsPriceRequest'
 *    responses:
 *      200:
 *        description: search price
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProductsPriceResponse'
 *      401:
 *        description: Un Authenticated
 *    security: [{bearerAuth: []}]
 */

exports.getProductByPrice = async (req, res) => {
  const result = await productServices.findByPrice(req.query);
  result.length > 0 ? res.json(result) : res.status(404).json(result);
};

exports.getProduct = async (req, res) => {
  const id = req.params.id;
  const result = await productServices.findById(id);
  result ? res.json(result) : res.status(404).json(null);
};

exports.addProduct = (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      console.log(`error: ${JSON.stringify(error)}`);
      return res.status(500).json({ message: error.message });
    }
    return res.status(201).json(await productServices.add(req.body, req.file));
  });
};

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
 *    AllProductsResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of the account
 *        username:
 *          type: string
 *          description: The account username
 *        password:
 *          type: string
 *          description: The account password
 *        role:
 *          type: string
 *          description: The account role
 *        created_at:
 *          type: string
 *          description: The account created
 *        updated_at:
 *          type: string
 *          description: The account updated
 *
 */
