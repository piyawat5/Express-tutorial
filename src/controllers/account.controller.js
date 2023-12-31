const accountServices = require("../services/account.service");

/**
 * @swagger
 * /account/register:
 *  post:
 *    summary: Create new accout
 *    tags: [Account]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/RegisterRequest'
 *    responses:
 *      201:
 *        description: The account was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RegisterResponse'
 */

exports.register = async (req, res) => {
  res.status(201).json(await accountServices.register(req.body));
};

/**
 * @swagger
 * /account/login:
 *  post:
 *    summary: Login and response jwt token
 *    tags: [Account]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/LoginRequest'
 *    responses:
 *      200:
 *        description: The Token was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginResponse'
 *      401:
 *        description: Un Authenticated
 */

exports.login = async (req, res) => {
  const token = await accountServices.login(req.body);
  if (!token) {
    res.status(401).json();
    return;
  }
  res.json({ token });
};

/**
 * @swagger
 * /account/info:
 *  get:
 *    summary: verify jwt token
 *    tags: [Account]
 *    responses:
 *      200:
 *        description: The Token was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/InfoResponse'
 *      401:
 *        description: Un Authenticated
 *    security: [{bearerAuth: []}]
 */

//stageless
exports.info = (req, res) => res.json({ username: req.sub, role: req.role });

/**
 * @swagger
 * tags:
 *    name: Account
 *    description: Account management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *    RegisterRequest:
 *      type: object
 *      required:
 *        -username
 *        -password
 *        -role
 *      properties:
 *        username:
 *          type: string
 *          description: The account username
 *        password:
 *          type: string
 *          description: The account password
 *        role:
 *          type: string
 *          description: The account role
 *    RegisterResponse:
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

/**
 * @swagger
 * components:
 *   schemas:
 *    LoginRequest:
 *      type: object
 *      required:
 *        -username
 *        -password
 *      properties:
 *        username:
 *          type: string
 *          description: The account username
 *        password:
 *          type: string
 *          description: The account password
 *    LoginResponse:
 *      type: object
 *      properties:
 *        token:
 *          type: string
 *          description: Then JWT token
 *    InfoResponse:
 *      Type: object
 *      properties:
 *        username:
 *          type: string
 *          description: The account username
 *        role:
 *          type: string
 *          description: The account role
 */
