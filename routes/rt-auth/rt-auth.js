

let express = require('express');
let router = express.Router();

let getInit = require('./get-init');
let getEnd = require('./get-end');


/**
 *  views
 */
// get session token 
router.get('/init', getInit.on);

// get remove session token 
router.get('/end', getEnd.on);

// close session 
router.use(function(req, res) {
    res.status(404).redirect('/404');
});
  
  
  
module.exports.router = router;