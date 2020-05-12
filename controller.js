
const http = require('http');
const Url = require('url'); //url module helps in parsing urls

module.exports = http.createServer((req, res) => {

    let service = require('./service');
    let reqUrl = Url.parse(req.url, true); // gets the request url and parses it so that we can run some url functions on it.

    //  checks if the url being requested is / and also checks if the request type is GET
    if (reqUrl.pathname === "/" && req.method === "GET") {
        console.log(`method-type : ${req.method} and end-point : ${reqUrl.pathname} `);
        service.homePage(req, res);
    }

    //  checks if the url being requested is /user and also checks if the request type is GET
    else if (reqUrl.pathname === "/user" && req.method === "GET") {
        console.log(`method-type : ${req.method} and end-point : ${reqUrl.pathname} `);
        service.getUser(req, res);
    }

    else if (reqUrl.pathname === "/user/all" && req.method === "GET") {
        console.log(`method-type : ${req.method} and end-point : ${reqUrl.pathname} `);
        service.getAllUser(req, res);
    }

    //  checks if the url being requested is /user/registration and also checks if the request type is Post
    else if (reqUrl.pathname === "/user/registration" && req.method === "POST") {
        console.log(`method-type : ${req.method} and end-point : ${reqUrl.pathname} `);
        service.registerUser(req, res);
    }

    else if (reqUrl.pathname === "/user/update" && req.method === "PUT") {
        console.log(`method-type : ${req.method} and end-point : ${reqUrl.pathname} `);
        service.updateUser(req, res);
    }

    else if (reqUrl.pathname === "/user/delete" && req.method === "DELETE") {
        console.log(`method-type : ${req.method} and end-point : ${reqUrl.pathname} `);
        service.deleteUser(req, res);
    }

    // else condition for invalid routes. 
    else {
        console.log(`method-type : ${req.method} and end-point : ${reqUrl.pathname} `);
        service.invalidRequest(req, res);
    }

});