

let express = require('express');
let router = express.Router();

let getInit = require('./get-init');
let getEnd = require('./get-end');


router.use(function (req, res, next) {
    req.requestTime = new Date().toISOString();
    console.log("--- /session - request time: ", req.requestTime);
    next();
});

// get session token 
router.get('/init', getInit.on);

// get remove session token 
router.get('/end', getEnd.on);

// 404 
router.use(function(req, res) {
    res.status(404).json({code: '404', message:'404 Not Found'});
});
  
  
  
module.exports.router = router;