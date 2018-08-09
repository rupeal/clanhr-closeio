const MyCloseIO = require('./lib/my_closeio');
const myCloseIO = new MyCloseIO();


myCloseIO.listCustomFields(function(response){
	console.log(response);
});