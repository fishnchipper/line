

/**
 * Check the inclusion of token from a client before accessing ale
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function on(req, res, next) {

  //console.log(">>>> req: ", req.headers);
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

  if (token) {
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
      console.log(">>>> token: ", token);
    }else {
      res.status(401).json({code: 'session.error', message:'invalid session token'});
    }
    next();
  } else {
    res.status(401).json({code: 'session.error', message:'session token is not found'});
  }
};

module.exports.on = on;
