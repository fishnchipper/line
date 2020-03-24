var jwt = require('jsonwebtoken');
var fs = require('fs')

/**
 * Check the inclusion of token from a client before accessing ale
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function on(req, res, next) {

  //console.log("  > req.headers: ", req.headers);
  var uuid = req.headers['comm-session-uuid']; // Express headers are auto converted to lowercase
  let token = req.headers['comm-session-token'] ;
   // req.headers['x-access-token'] || 

  if (token) {
    var cert = fs.readFileSync(__dirname + '/../environment/server.cert');  // get public key
    jwt.verify(token, cert, function(err, decoded) {
      //console.log("  > session_key decoded: ", decoded);
      if(typeof decoded != 'undefined' && decoded.client_uuid === uuid) {
        console.log("  > valid session token ");
        next();
      }else {
        res.status(401).json({code: 'session.error', message:'invalid session token'});
      }
    });
  } else {
    res.status(401).json({code: 'session.error', message:'session token is not found'});
  }
};

module.exports.on = on;
