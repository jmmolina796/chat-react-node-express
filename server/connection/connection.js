import mysql from 'mysql';

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "qwertyui",
	database: "agenda"
});

export default db.connect( (error) => {
	if(error) {
		console.log("There is an error in database connection")
	} else {
		console.log("Success");
	}
});