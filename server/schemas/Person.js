import Schema from './Schema';

export default {
	findPersonBy: findPersonBy,
	singIn: singIn
}

function singIn(email, password) {
	const transaction = false;
	const queries = [
		{
			query: "SELECT * FROM people WHERE e_mail = ? AND password = ?",
			data: [
				email,
				password
			],
			save: "singIn"
		}
	]
	const success = (result) => ( result.singIn );
	const error = (err, index) => ( {mesage: "There is an error with the server"} );
	
	return Schema(transaction, queries, success, error);
}

function findPersonBy(select, where, values) {
	
	const selects = select.join(", ");
	const wheres = where.join(" = ? AND ");

	let query = "SELECT "+selects+" FROM people WHERE "+wheres+" = ?"; 

	const transaction = false;
	const queries = [
		{
			query: query,
			data: values,
			save: "result"
		}
	];
	const success = (result) => ( result.result );
	const error = (err, index) => ( {message: `Error query ${index}`} );

	return Schema(transaction, queries, success, error);
}