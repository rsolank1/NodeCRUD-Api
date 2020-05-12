
const Url = require('url');

module.exports.homePage = (req, res) => {

    let response = {
        "get all users": "/user/all",
        "registration ": " /user/registration",
        "user-details ": "/user",
        "update-user": "/user/update",
        "delete-user": "/user/delete"
    };
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response)); // JSON.stringify on it to convert it to string before sending back the http response

}


module.exports.getAllUser = (req, res) => {

    let db = require('./db');
    db.executeSql("select * from user", [], (result, err) => {
        if (err) {
            response = { " message ": "error occured, something went wrong" }
            setResponce(401, response);
        } else {
            console.log(result);
            response = { " message ": "update completed ....." }
            setResponce(200, result);
        }
    });

    function setResponce(code, response) {
        res.statusCode = code;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));

    }

}


module.exports.getUser = (req, res) => {

    let reqUrl = Url.parse(req.url, true);
    let userId = reqUrl.query.uid;
    let response;
    if (userId) {

        let db = require('./db');
        db.executeSql("SELECT * from user where uid = ? ", userId, (result, err) => {
            if (err) {
                response = { " message ": "error occured, something went wrong" }
                setResponce(401, response);
            } else {
                console.log(result);
                setResponce(200, result);
            }
        });

    }
    else { // if request don't User-id
        console.log(`UserID not found `);
        response = { "required-field not found": " userid (uid)" };
        setResponce(401, response);
    }

    function setResponce(code, response) {
        res.statusCode = code;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));

    }

}


module.exports.registerUser = (req, res) => {

    let body = '';
    /* 
     need to get the POST-body from the request.
    Taking chunk of data and keeps appending it to body.
    */
    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', () => { //executed only after the streaming is complete and the full post body is received.
        if (body) {
            let response;
            postBody = JSON.parse(body); // converts the input post body into JSON format so that we can use the values in it.

            //checks if postbody have the required values or not..
            if (postBody.name && postBody.email && postBody.phone && postBody.pass) {

                var userobj = {
                    "uname": postBody.name,
                    "uphone": postBody.phone,
                    "uemail": postBody.email,
                    "upass": postBody.pass,
                }
                let db = require('./db');
                db.executeSql("INSERT INTO user SET ? ", userobj, (result, err) => {
                    if (err) {
                        response = { " message ": "error occured, something went wrong" }
                        setResponce(401, response);
                    } else {
                        console.log(result);
                        response = { " message ": "registration completed ....." }
                        setResponce(200, response);
                    }
                });

            } else { // if postbody don't have all the required values
                console.log(`all required details not found `);
                response = { "text": "all required details not found ", "required-fields": " name, phone, email, pass" };
                setResponce(401, response);
            }
        } else { // if request don't have any body
            console.log(`Body not found `);
            response = { "text": "post request body not found ", "required-fields": " name, phone, email, pass" };
            setResponce(401, response);
        }


        function setResponce(code, response) {
            res.statusCode = code;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response));

        }
    });

}


module.exports.updateUser = (req, res) => {

    let body = '';
    /* 
    we will need to get the POST-body from the request.
    Taking chunk of data and keeps appending it to body.
    */
    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', () => { //executed only after the streaming is complete and the full post body is received.
        if (body) {
            let response;
            postBody = JSON.parse(body); // converts the input post body into JSON format so that we can use the values in it.

            //checks if postbody have the required values or not..
            if (postBody.uid && postBody.name && postBody.email && postBody.phone && postBody.pass) {

                var userobj = {
                    "uname": postBody.name,
                    "uphone": postBody.phone,
                    "uemail": postBody.email,
                    "upass": postBody.pass,
                }
                let db = require('./db');
                db.executeSql("update user SET ? where uid = ?", [userobj, postBody.uid], (result, err) => {
                    if (err) {
                        response = { " message ": "error occured, something went wrong" }
                        setResponce(401, response);
                    } else {
                        console.log(result);
                        response = { " message ": "update completed ....." }
                        setResponce(200, response);
                    }
                });

            } else { // if postbody don't have all the required values
                console.log(`all required details not found `);
                response = { "text": "all required details not found ", "required-fields": "uid, name, phone, email, pass" };
                setResponce(401, response);
            }
        } else { // if request don't have any body
            console.log(`Body not found `);
            response = { "text": "post request body not found ", "required-fields": "uid, name, phone, email, pass" };
            setResponce(401, response);
        }


        function setResponce(code, response) {
            res.statusCode = code;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response));

        }
    });

}


module.exports.deleteUser = (req, res) => {

    let reqUrl = Url.parse(req.url, true);
    let userId = reqUrl.query.uid;
    let response;
    if (userId) {

        let db = require('./db');
        db.executeSql("delete  from user where uid = ? ", userId, (result, err) => {
            if (err) {
                response = { " message ": "error occured, something went wrong" }
                setResponce(401, response);
            } else {
                console.log(result);
                response = { " message ": "delete completed ....." }
                setResponce(200, response);
            }
        });

    }
    else { // if request don't User-id
        console.log(`UserID not found `);
        response = { "required-field not found": " userid (uid)" };
        setResponce(401, response);
    }

    function setResponce(code, response) {
        res.statusCode = code;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));

    }

}


module.exports.invalidRequest = (req, res) => {

    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end("Invalid Request");

}