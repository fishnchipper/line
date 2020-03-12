/**
 * main routes
 */
function on(req, res) {

    res.status(404).json({code: '404', message:'404 Not Found'});
}

module.exports.noResource = on;