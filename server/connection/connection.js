import mysql from 'mysql';

//Example of connection
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "qwertyui",
	database: "chat_react"
});
//Example of connection

db.connect( (error) => {
	if(error) {
		console.log("There is an error in database connection")
	} else {
		console.log("Success");
	}
});

export default db;