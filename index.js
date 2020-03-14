
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
    routeSession = require('./routes/rt-session/rt-session'),
    routeApi = require('./routes/rt-api/rt-api');

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
  * swagger setup
  */
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Line",
    version: "1.0.0",
    description:
      "Line is a NodeJS + Express App shell which can be used as a start point for developing an internal microservice with RESTful API interfaces. Line is not suitable for an edge microservice which services requests from authenticated clients through secure communication sessions.",
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
      url: "https://localhost:65001"
    },
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


/**
 * app init
 */
let app = express();
const APPNAME = "line";
const PORT = 65001;
const VERSION = '0.1.0';

// openapi 3.x
app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {customCss: '.swagger-ui .topbar { display: none }'}));

// for security purpose
app.use(helmet());
// body json parser
app.use(bodyParser.json());

// temp code to be removed later
app.use(function (req, res, next) {
  req.requestTime = new Date().toISOString();
  console.log("--- request time: ", req.requestTime);
  next();
});

// session
app.use('/session', routeSession.router);

// add RESTFul APIs
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