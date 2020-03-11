
/**
 * App
 */
let https = require('https'),
    fs = require('fs'),
    express = require('express'),
    bodyParser = require('body-parser'),
    helmet = require('helmet');

let checkToken = require('./middleware/check-token');

/**
 * when firebase access is required

// init firebase service access
let line = require('./line_modules/line');
// use firebase as back-end db
line.initDBService('firebase');
 */

/**
 * routes
 */
let routeMain = require('./routes/rt-main');
let routeAuth = require('./routes/rt-auth/rt-auth');
let routeApi = require('./routes/rt-api/rt-api');

let app = express();
const APPNAME = "line";
const PORT = 65001;
const VERSION = '0.1.0';

// for security purpose
app.use(helmet());

app.use(bodyParser.json());

// session
app.use('/session', routeAuth.router);

// add RESTFul APIs below
// allow access with valid session only
app.use('/api', checkToken.on, routeApi.router);

// end session for other request with erro message return
app.use(routeMain.noResource);


/**
 * run server
 */
https.createServer({
  key: fs.readFileSync(__dirname + '/environment/server.key'),
  cert: fs.readFileSync(__dirname + '/environment/server.cert')
}, app)
.listen(PORT, function () {
  console.log(`==> ${APPNAME} - (v${VERSION}) https://localhost:${PORT}`);
});