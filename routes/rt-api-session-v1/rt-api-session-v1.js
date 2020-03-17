

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
 *   description: Session init for a new client
 */

router.route('/init/:uuid')
/**
 * @swagger
 * path:
 *  /session/v1/init/{uuid}:
 *    get:
 *      summary: Init a new session token assigned to {uuid}
 *      tags: [Session]
 *      parameters:
 *      - name: uuid
 *        in: path
 *        description: uuid of client
 *        schema:
 *          type: string
 *      responses:
 *        "200":
 *          description: A new session token
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Response'
 */
      .get(getInit.on);

// get remove session token 
router.route('/end/:uuid') 
/**
 * @swagger
 * path:
 *  /session/v1/end/{uuid}:
 *    get:
 *      summary: End session token assigned to {uuid}
 *      tags: [Session]
 *      parameters:
 *      - name: uuid
 *        in: path
 *        description: uuid of client
 *        schema:
 *          type: string
 *      responses:
 *        "200":
 *          description: End session token
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Response'
 */
      .get(getEnd.on);

// 404 
router.use(function(req, res) {
    res.status(404).json({code: '404', message:'404 Not Found'});
});
  
  
  
module.exports.router = router;