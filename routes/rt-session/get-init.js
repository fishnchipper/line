var jwt = require('jsonwebtoken');
var fs = require('fs');
var uuid = require('uuid-random');


function on(req, res, next) {

    console.log("  > req.headers: ", req.headers);
    console.log("  > req.params: ", req.params);

    // check the validity of client uuid
    let clientUUID = req.params.uuid;
    if(!uuid.test(clientUUID)) {
        res.status(400).json({code: 'session.error', message:'invalid uuid'});
    } else {
        // generate session token
        let session = { session_id: uuid() };
        let token = jwt.sign(
                { session_id: session.session_id, client_uuid: clientUUID }, 
                fs.readFileSync(__dirname + "/../../environment/server.key"), 
                { algorithm: 'RS256' }
            );
        session.session_token = token;
        console.log("  > session: ", session);
        res.json({code: 'session.init', message:"session is successfully created", payload:session});
    }
}

module.exports.on= on;