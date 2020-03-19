
var uuid = require('uuid-random');

function on(req, res, next) {
    
    console.log("  > req.headers: ", req.headers);
    console.log("  > req.params: ", req.params);

    // check the validity of client uuid
    let clientUUID = req.params.uuid;
    if(!uuid.test(clientUUID)) {
        res.status(400).json({code: 'session.error', message:'invalid uuid'});
    } else {
        // delete session linked to clientUUID
        var session = global.__SessionMap__.delete(clientUUID);
        if(!session) {
            // if session does not exist
            console.log("  > session deleted: ", session);
            res.status(400).json({code: 'session.error', message:'session does not exist'});
        }else {
            console.log("  > session deleted: ", session);
            res.json({code: 'session.end', message:'session cleared'});
        }   
    }
}

module.exports.on= on;