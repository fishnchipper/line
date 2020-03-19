

let express = require('express');
let router = express.Router();

let getInit = require('./get-init');
let getEnd = require('./get-end');

global.__SessionMap__ = new Map();


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
 *          description: Session is successfully created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Response'
 *              example:
 *                code: session.init
 *                message: session is successfully created
 *                payload: {"session_id":"7f3b171b-335c-4739-a123-4ca810db963c","session_token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uX2lkIjoiN2YzYjE3MWItMzM1Yy00NzM5LWExMjMtNGNhODEwZGI5NjNjIiwiY2xpZW50X3V1aWQiOiJiOTZhYjVlNi1mMWU4LTQ2NTMtYWIwOC00ZGQ4MmVhNjU3NzEiLCJpYXQiOjE1ODQxNDg2MzR9.L0SbNuIRb75bnmoxj-eVXOfEjBncUvj2orAQSpq2gfWH6YxdDx_YAxgzPsz3h7vh6fYvx56ZYD7ABpFNIQqytNW_woR614fvgSEhRgBdVwsJYKD1JEeQg-xgfvn5mIuhHux7yVPZVi9XBXUheANlCrmUNE5dCf-UIFFCZK3v5j8PseGyDtBzYQur3PDYFa9mPTyCJFf3kFkL5wa9Mg_fJD1oQoza7Mgg688_q7k3JJWJ0U51NUn0WO9E0wzeJcne2wia2UZeza0D-JGDg_AngjcCL1kAUWZjKEnUDcpHC4rAeicf6kkelmXkRzIOn6ZFb3GWxUtey_uNCl_H7wt40g"}
 *        "400":
 *          description: Invalid request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Response'
 *              example:
 *                code: session.error
 *                message: invalid uuid
 */
      .get(getInit.on);

 
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
 *          description: Session cleared
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Response'
 *              example:
 *                code: session.end
 *                message: session cleared
 *        "400":
 *          description: Invalid request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Response'
 *              examples:
 *                invalid uuid:
 *                   code: session.error
 *                   message: invalid uuid
 *                no session linked:
 *                   code: session.error
 *                   message: session does not exist
 */
      .get(getEnd.on);


// 404 
router.use(function(req, res) {
    res.status(404).json({code: '404', message:'404 Not Found'});
});
  
  
  
module.exports.router = router;