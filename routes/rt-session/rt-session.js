

let express = require('express');
let router = express.Router();

let getInit = require('./get-init');
let getEnd = require('./get-end');


router.use(function (req, res, next) {
    req.requestTime = new Date().toISOString();
    console.log("--- /session - request time: ", req.requestTime);
    next();
});

/**
 * @swagger
 * tags:
 *   name: Session
 *   description: Session init
 */

/**
 * @swagger
 * path:
 *  /session/init/:uuid:
 *    get:
 *      summary: Get a new session token
 *      tags: [Session]
 *      responses:
 *        "200":
 *          description: A new session token
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Response'
 */
router.route('/init/:uuid')
      .get(getInit.on);

// get remove session token 
router.route('/end/:uuid') 
      .get(getEnd.on);

// 404 
router.use(function(req, res) {
    res.status(404).json({code: '404', message:'404 Not Found'});
});
  
  
  
module.exports.router = router;