# Line

Line is a NodeJS + Express App shell which can be used as a start point for developing an `internal microservice` with RESTful API interfaces. Line is not suitable for an `edge microservice` which responses to only authenticated clients.
 requests from any clients through secure communication sessions.   


## REST Communication

- A REST communication is initiated by calling `/session/init` with an encrypted permanent JWT session token returned to a caller.
- The encrypted JWT session token created is used for the following REST API calls until the communication ends by calling `/session/end`.



## Where to start


1. Install dependent packages
```
$ npm install
```

2. Run the app
```
$ node index.js
==> line - (v0.1.0) https://localhost:65001
```

3. RESTFul APIs
- Go to https://localhost:65001/api/docs


## How to add RESTFul API

 1. create a folder at `/routes/user-folder`
 2. add route function under `/routes/user-folder/route-function-file`
 3. add the route-function-file to app.user with `checkToken.on` middleware
 4. define each REST API in `route-function-file`
    - Instead of implementing all API in the single `route-function-file`,
    - create a separate file for each REST API.
    - By doing this, each API is decoupled with each other.
    - For example, check `/routes/rt-api-session-v1` folder.
 5. Add OpenAPI yaml definition to each REST API, then your API specification is automatically updated `https://localhost:65001/docs`
    - For example, check `/routes/rt-api-session-v1/rt-api-session-v1.js`
 6. Add the route created in `index.js`
 
```
// add your RESTFul APIs here
//
let routeApiXXXV1 = require('./routes/rt-api-xxx-v1/rt-api-xxx-v1');
app.use('/api/xxx/v1', checkToken.on, routeApiXXXV1.router);


//
// end of your RESTFul APIs
```

## How to duplicate this repository for your microservice project
- see https://help.github.com/en/articles/duplicating-a-repository

