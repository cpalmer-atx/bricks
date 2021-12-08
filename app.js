const swaggerDocs = require('./apiDocs/swagger');
const swaggerUI = require('swagger-ui-express');
const express = require('express');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
}

// Routers
app.use('/sanityCheck', require('./routes/sanity'));
app.use('/api/users', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/bricks', require('./routes/rebrickable'));

module.exports = app;



// *** API DOCUMENTATION GENERATION BELOW THIS POINT ***

/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: Get all registered users
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: All registered users successfully retrieved
 * 
 * 
 */

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *    summary: Get a single user by id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: The user id
 *    responses:
 *      200:
 *        description: Specified user was found
 *      400:
 *        description: User not found in database
 */

/**
 * @swagger
 * /api/users:
 *  post:
 *    summary: NOT WORKING --> Will eventually create a new user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          parameters:
 *              - name: name
 *                description: user name
 *                in: formData
 *                required: true
 *                type: string
 *              - name: email
 *                description: user email
 *                in: formData
 *                required: true
 *                type: string
 *              - name: password
 *                description: user password
 *                in: formData
 *                required: true
 *                type: string
 *    responses:
 *      200:
 *        description: user successfully created
 *        
 */
