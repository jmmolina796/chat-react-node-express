export default function schema(transaction, queries, success, error) {
	return {
		transaction: transaction,
		queries: queries,
		success: success,
		error: error
	};
}