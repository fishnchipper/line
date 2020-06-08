
/**
 * App
 */
let https = require('https'),
    fs = require('fs'),
    express = require('express'),
    bodyParser = require('body-parser'),
    helmet = require('helmet');


/**
 * Firebase service setup

if (!fs.existsSync('./environment/firebase-serverkey.json')) {
  console.log("[line-fb:error]./environment/firebase-serverkey.json is not found.\n\n");
  process.exitCode = 1;
  process.exit();
}
const lineFirebase = require('./line_modules/line-firebase');
const lineFirebaseOptions = {
  // firebase database url
  databaseURL: "https://line-7e593.firebaseio.com",
  // firebase Admin SDK private key 
  keyFilename: './environment/firebase-serverkey.json'
};
lineFirebase.setup(lineFirebaseOptions);
// init for firebase Authentication access
lineFirebase.initAuthService();
// init for firebase Database access
lineFirebase.initDBService();
 */

 

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
      url: "https://localhost:" + PORT + "/api"
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