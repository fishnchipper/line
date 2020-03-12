# Under development ...


# Line

Line is a NodeJS + Express App shell which can be used as a start point for developing an `internal microservice` with RESTful API interfaces. Line is not suitable for an `edge microservice` which services requests from authenticated clients through secure communication sessions.   


## REST Communication

- A REST communication is initiated by calling `/session/init` with an encrypted permanent JWT session token returned to a caller.
- The encrypted JWT session token created is used for the following REST API calls until the communication ends by `/session/end` called.



## Where to start


1. Install dependent packages
```
$ npm install
```

2. Run the app
```
$ node index.js
==> line - (v0.1.0) https://localhost:65000
```

3. RESTFul APIs
- `GET` `/session/init`
- `GET` `/session/end`



## How to duplicate this repository for your microservice project
- see https://help.github.com/en/articles/duplicating-a-repository

