import Schema from './Schema';

export default {
	getPersons: getPersons
}

function getPersons() {
	
	const transaction = false;
	const queries = [
		{
			query: "SELECT * FROM people",
			save: "result"
		}
	];
	const success = (result) => ( {query: result.result} );
	const error = (err, index) => ( {message: `Error query ${index}`} );

	return Schema(transaction, queries, success, error);
}