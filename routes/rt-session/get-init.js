



function on(req, res, next) {
    res.json({code: 'session.init', message:{session_id:"uowjfljsdf", session_key:"jfslkdjflskdjflksjfl"}});
}

module.exports.on= on;