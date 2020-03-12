let express = require('express');
let router = express.Router();


router.use(function (req, res, next) {
    req.requestTime = new Date().toISOString();
    console.log("--- /api - request time: ", req.requestTime);
    next();
});

// 404 
router.use(function(req, res) {
    res.status(404).json({code: '404', message:'404 Not Found'});
});
  
  
  
module.exports.router = router;