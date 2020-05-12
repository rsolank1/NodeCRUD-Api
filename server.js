
const hostname = "localhost";
const port = 3000;

//server creation is done inside controller.js
var server = require('./controller.js');

server.listen(port, hostname, () => {
	console.log(` listening on port : ${port} and hostname : ${hostname}...`);
});


/*
----------------------------------------------------
1) home-page:

Method : GET
http://localhost:3000/

----------------------------------------------------

2) get-all-user :-

Method : GET
http://localhost:3000/user/all

----------------------------------------------------

3) get-user-details :-

Method : GET
http://localhost:3000/user?uid=102

Params :	key :	value
		    uid	:	102

----------------------------------------------------

4) register-user:

Method : POST
http://localhost:3000/user/registration

Request :
{
	"name" : "rahul",
	"phone" : 123456789,
	"email" : "rahul@sme.com",
	"pass" : "rahul@123"
}

----------------------------------------------------

5) update-user:

Method : put
http://localhost:3000/user/update

Request :
{
	"uid":"102",
	"name" : "rahul",
	"phone" : 123456789,
	"email" : "solanki@sme.com",
	"pass" : "something@123"
}

----------------------------------------------------

2) delete-user:

Method : delete
http://localhost:3000/user/update/100

Params :	key :	value
		    uid	:	102

----------------------------------------------------



*/