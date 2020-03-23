
/**
 * App
 */
let https = require('https'),
    fs = require('fs'),
    express = require('express'),
    bodyParser = require('body-parser'),
    helmet = require('helmet');

/**
 * Routes
 */
let routeMain = require('./routes/rt-main'),
    routeSession = require('./routes/rt-api-session-v1/rt-api-session-v1');



/**
 * Middlewares
 */
let checkToken = require('./middleware/check-token');

/**
 * when firebase access is required

// init firebase service access
let line = require('./line_modules/line');
// use firebase as back-end db
line.initDBService('firebase');
 */

 /**
 * app init
 */
let app = express();
const APPNAME = process.env.npm_package_name;
const PORT = process.env.npm_package_config_port;
const VERSION = process.env.npm_package_version;

 /**
  * swagger setup
  */
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Line",
    version: VERSION,
    description:
      "Line is a NodeJS + Express App shell which can be used as a start point for developing an internal microservice with RESTful API interfaces. Line is not suitable for an edge microservice which services requests from only authenticated clients through secure communication sessions.",
    license: {
      name: "MIT",
      url: "https://github.com/fishnchipper/line/blob/master/LICENSE"
    },
    contact: {
      name: "GitHub",
      url: "https://github.com/fishnchipper/line"
    }
  },
  servers: [
    {
      url: "https://localhost:65001/api"
    }
  ]
};
const options = {
  swaggerDefinition,
  apis: ['./models/*.js', './routes/*/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);

// openapi 3.x docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {customCss: '.swagger-ui .topbar { display: none }'}));

// for security purpose
app.use(helmet());
// body json parser
app.use(bodyParser.json());

// session
app.use('/api/session/v1', routeSession.router);



/**
 *  Add your RESTFul APIs below
 * 
 *  How to add a new REST API
 * 
 *  1. create a folder at /routes/user-folder
 *  2. add route function under /routes/user-folder/route-function-file
 *  3. add the route-function-file to app.user with checkToken.on middleware
 *  4. define each REST API in route-function-file
 *     - Instead of implementing all API in the single route-function-file,
 *     - create a separate file for each REST API.
 *     - By doing this, each API is decoupled with each other.
 *     - For example, check /routes/rt-api-session-v1 folder.
 *  5. Add OpenAPI yaml definition to each REST API, then your API specification is automatically updated https://localhost:65001/docs
 *     - For example, check /routes/rt-api-session-v1/rt-api-session-v1.js
 * 
 *  Below is an example. 
 */
// add your RESTFul APIs here
//
let routeApiXXXV1 = require('./routes/rt-api-xxx-v1/rt-api-xxx-v1');
app.use('/api/xxx/v1', checkToken.on, routeApiXXXV1.router);


//
// end of your RESTFul APIs

// end session for other request with erro message return
app.use(routeMain.noResource);


/**
 * run server 
 * 
 * self-signed certification is used. replace it with yours.
 */
https.createServer({
  key: fs.readFileSync(__dirname + '/environment/server.key'),
  cert: fs.readFileSync(__dirname + '/environment/server.cert')
}, app)
.listen(PORT, function () {
  console.log(`==> ${APPNAME} - (v${VERSION}) https://localhost:${PORT}`);
});