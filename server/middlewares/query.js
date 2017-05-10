import db from "../connection/connection.js";
import async from "async";

const execute = function (schema, globalCallbak) {

	const App_squema = schema

	if (App_squema === undefined) {
		const preparatedResponse = preparateResponse({}, false);
		globalCallbak(preparatedResponse);
	}

	var result = {};
	var waterFunctions = [];

	const App_queries = App_squema.queries;
	const App_transaction = App_squema.transaction;

	const propertyNames = Object.getOwnPropertyNames(App_queries).length;

	const isEmpty = (propertyNames === 0);

	if( isEmpty ) {
		const preparatedResponse = preparateResponse({}, false);
		globalCallbak(preparatedResponse);
	}

	App_queries.map(function(value, i){
		if (i == 0) {
			let newFunction = function(callback) {

				let preparedData = "";

				if (value.data !== undefined) {
					preparedData = value.data;
				}

				db.query(value.query, preparedData, function(err, rows) {
					if (err) {

						if(App_transaction) {
							db.rollback(function() {
								callback(err, i);
							});
							return;
						}

						callback(err, i);
						return;
					}
					
					if (value.save !== undefined) {
						result[value.save] = rows;
					}

					callback(null, result);
				});
			}
			waterFunctions.push(newFunction);
		}

		if(i != 0) {

			let newFunction = function(args, callback) {

				if (value.data !== undefined) {

					let value2 = value.data;
					
					function findArray(value2) {
						for(let x = 0; x<value2.length;x++) {
							if (Object.prototype.toString.call(value2) === "[object Array]") {
								if (Object.prototype.toString.call(value2[x]) === "[object Object]") {
									let indexes = value2[x].value.split(".");
									let svdObj =  indexes[0];
									let svdInd =  indexes[1];
									let svdPro = indexes[2];
									value2[x] = result[svdObj][svdInd][svdPro];;
								}
								findArray(value2[x]);
							}
						}
					}
					findArray(value2);

				}

				let preparedData = value.data;

				db.query(value.query, preparedData, function(err, rows) {
					if (err) {

						if(App_transaction) {
							db.rollback(function() {
								callback(err, i);
							});
							return;
						}

						callback(err, i);
						return;
					}

					if (value.save !== undefined) {
						result[value.save] = rows;
					}

					callback(null, result)
				});
			}

			waterFunctions.push(newFunction);
		}
	});


	if(App_transaction) {
		db.beginTransaction(function(err) {
			
			async.waterfall(waterFunctions,function(err, lastResult){
				
				var response = {};
				var ocurredError = false;
				
				if (err) {
					
					ocurredError = true;
					
					if (App_squema.error !== undefined) {
						response = App_squema.error(err, lastResult);
					}

					const preparatedResponse = preparateResponse(response, ocurredError);

					globalCallbak(preparatedResponse);

				} else {
					
					if (App_squema.success !== undefined) {
						response = App_squema.success(lastResult);
					}
		
					db.commit(function(err) {
						if (err) {
							console.log(err);
							return db.rollback(function() {
								throw err;
							});
						}

						const preparatedResponse = preparateResponse(response, ocurredError);

						globalCallbak(preparatedResponse);

				     });
				}
			});

		});

	} else {
		async.waterfall(waterFunctions,function(err, lastResult){
			
			var response = {};
			var ocurredError = false;
			
			if (err) {
				
				ocurredError = true;

				if (App_squema.error !== undefined) {
					response = App_squema.error(err, lastResult);
				}
			} else {
				if (App_squema.success !== undefined) {
					response = App_squema.success(lastResult);
				}	
			}

			const preparatedResponse = preparateResponse(response, ocurredError);

			globalCallbak(preparatedResponse);

		});
	}
};

function preparateResponse(data, error) {
	
	let data_success = {};
	let data_error = {};

	data = ( (data === undefined) ? {} : data );

	if (error) {
		data_error = data;
	} else {
		data_success = data;
	}

	return {
		data: data_success,
		error: error,
		data_error: data_error
	};
}

const query = { execute: execute };

export default query;
