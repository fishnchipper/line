# line


![version](https://badgen.net/badge/version/v0.1.3/orange) [![Build status](https://ci.appveyor.com/api/projects/status/0qetrigk7n8w2m40?svg=true)](https://ci.appveyor.com/project/gam4it/line)




`line` is a NodeJS + Express App shell which can be used as a start point for developing an `internal microservice` with RESTful API interfaces. `line` is not suitable for an `edge microservice` as it does not generate `access token` required to access resources which are accessible for only authenticated clients.   


## Session for REST Communication

- A REST communication is initiated by calling `/session/init` with an encrypted permanent JWT `session token` returned to a caller.
- The encrypted JWT `session token` created is required until the communication sesion ends by calling `/session/end`.



## Where to start


1. Install dependent packages
```
$ npm install
```

2. Run the app
```
$ npm start
```

3. RESTFul APIs
- Go to https://localhost:65001/api/docs


## How to add your RESTFul APIs

 1. create a route folder (ex `rt-api-xxx-v1`) under `/routes`
    - ex) `/routes/rt-api-xxx-v1`
 2. add a main route function file under the folder you created at step 1.
    - ex) `/routes/rt-api-xxx-v1/rt-api-xxx-v1.js`
 3. add the main route function to `app.use` with `checkToken.on` middleware in `index.js`
    - ex) 
        ```
        // add your RESTFul APIs here
        //
        let routeApiXXXV1 = require('./routes/rt-api-xxx-v1/rt-api-xxx-v1');
        app.use('/api/xxx/v1', checkToken.on, routeApiXXXV1.router);


        //
        // end of your RESTFul APIs
        ```
 4. define each REST API in the main route function file (ex. `rt-api-xxx-v1.js`) created above. 
    - Instead of implementing all API paths in the single main route function file,
    - create a separate file for each REST API path and import that file into the main route function file.
    - By doing this, each API is fully decoupled with each other.
    - For example, check `/routes/rt-api-xxx-v1/rt-api-xxx-v1.js` file.
        ```
        let getABC = require('./get-abc');
        let postABC = require('./post-abc');
        let putABC = require('./put-abc');
        let deleteABC = require('./delete-abc');
        router.route('/abc')
            .get(getABC.on)
            .post(postABC.on)
            .put(putABC.on)
            .delete(deleteABC.on);
        ```
 5. Add OpenAPI yaml definition to each REST API, then your API specification is automatically updated at `https://localhost:65001/docs`
    - For example, check `/routes/rt-api-session-v1/rt-api-session-v1.js`
    ```
    /**
    * @swagger
    * tags:
    *   name: Session
    *   description: Session init for a new client
    */

    router.route('/init/:uuid')
    /**
    * @swagger
    * path:
    *  /session/v1/init/{uuid}:
    *    get:
    *      summary: Init a new session token assigned to {uuid}
    *      tags: [Session]
    *      parameters:
    *      - name: uuid
    *        in: path
    *        description: uuid of client
    *        schema:
    *          type: string
    *      responses:
    *        "200":
    *          description: Session is successfully created
    *          content:
    *            application/json:
    *              schema:
    *                $ref: '#/components/schemas/Response'
    *              example:
    *                code: session.init
    *                message: session is successfully created
    *                payload: {"session_id":"7f3b171b-335c-4739-a123-4ca810db963c","session_token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uX2lkIjoiN2YzYjE3MWItMzM1Yy00NzM5LWExMjMtNGNhODEwZGI5NjNjIiwiY2xpZW50X3V1aWQiOiJiOTZhYjVlNi1mMWU4LTQ2NTMtYWIwOC00ZGQ4MmVhNjU3NzEiLCJpYXQiOjE1ODQxNDg2MzR9.L0SbNuIRb75bnmoxj-eVXOfEjBncUvj2orAQSpq2gfWH6YxdDx_YAxgzPsz3h7vh6fYvx56ZYD7ABpFNIQqytNW_woR614fvgSEhRgBdVwsJYKD1JEeQg-xgfvn5mIuhHux7yVPZVi9XBXUheANlCrmUNE5dCf-UIFFCZK3v5j8PseGyDtBzYQur3PDYFa9mPTyCJFf3kFkL5wa9Mg_fJD1oQoza7Mgg688_q7k3JJWJ0U51NUn0WO9E0wzeJcne2wia2UZeza0D-JGDg_AngjcCL1kAUWZjKEnUDcpHC4rAeicf6kkelmXkRzIOn6ZFb3GWxUtey_uNCl_H7wt40g"}
    *        "400":
    *          description: Invalid request
    *          content:
    *            application/json:
    *              schema:
    *                $ref: '#/components/schemas/Response'
    *              example:
    *                code: session.error
    *                message: invalid uuid
    */
        .get(getInit.on);

    
    router.route('/end/:uuid') 
    /**
    * @swagger
    * path:
    *  /session/v1/end/{uuid}:
    *    get:
    *      summary: End session token assigned to {uuid}
    *      tags: [Session]
    *      parameters:
    *      - name: uuid
    *        in: path
    *        description: uuid of client
    *        schema:
    *          type: string
    *      responses:
    *        "200":
    *          description: Session cleared
    *          content:
    *            application/json:
    *              schema:
    *                $ref: '#/components/schemas/Response'
    *              example:
    *                code: session.end
    *                message: session cleared
    *        "400":
    *          description: Invalid request
    *          content:
    *            application/json:
    *              schema:
    *                $ref: '#/components/schemas/Response'
    *              examples:
    *                invalid uuid:
    *                   code: session.error
    *                   message: invalid uuid
    *                no session linked:
    *                   code: session.error
    *                   message: session does not exist
    */
      .get(getEnd.on);
    ```


6. Add your common components under /models if any. For example, see `/models/response.js`



## Access to resources 

Request HTTP header must contain the following custom-defined parameters ([RFC6648](https://tools.ietf.org/html/rfc6648)) with valid values.

- `Comm-Session-UUID` : uuid ([RFC4122](https://tools.ietf.org/html/rfc4122)) of requester
- `Comm-Session-Token` : `session token` created through `/session/init/{uuid}`
  - example

    ```
    curl https://localhost:65001/api/xxx/v1 -k -i -H "Comm-Session-UUID:b96ab5e6-f1e8-4653-ab08-4dd82ea65778" -H "Comm-Session-Token:eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uX2lkIjoiNjI4YTNkODgtODYxYS00ODNmLWFkZjMtZWMzZTMwZWJjZjIzIiwiY2xpZW50X3V1aWQiOiJiOTZhYjVlNi1mMWU4LTQ2NTMtYWIwOC00ZGQ4MmVhNjU3NzgiLCJpYXQiOjE1ODQwNzY5OTZ9.N34OokCsx0Y-cuiyJP_3_IGUjknJ4tqXktHMqTrAiZGk7tdj1jjTNQXNulNQoHV6SqQSiGmFdvMCcODoOiI48vf1P4FfqiHxYAbe3L1z8bc-bmfN_eMMtVUukkmd5SLnq5t1vaASqv7FV4BYqd5Is9YL8jdiveOcd005eT26EfJfm1rs_g4eR4oDMq9nUWM5XMFkuLzDLMLVr-4Txh6aWPb3iEhzAHRwUldBSlDiq8SV6ppoXHFHfbksrEP36dJGfJ6MUfe0xZyRs8LGY7r1yiVkGxoF_Vl6iGzNAgBTmJqKQ2H3YunM2wObAStyE0IP7iCsNNr2EDEe8b9jMB6rqw"
    ```