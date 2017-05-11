import express from 'express';
import query from '../middlewares/query';
import Person from '../schemas/Person';

const router = express.Router();

router.post("/", (req, res) => {
	
	const schema = Person.getPersons();

	query.execute(schema, (result) => {
		res.json(result);
	});


});

export default router;