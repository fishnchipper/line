



function on(req, res, next) {
    
    res.json({code: 'session.end', message:'session cleared'});
}

module.exports.on= on;