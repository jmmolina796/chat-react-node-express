import express from 'express';
import query from '../middlewares/query';
import Person from '../schemas/Person';

const router = express.Router();

router.post("/", (req, res) => {
	
	const email = req.body.email;
	const password = req.body.password;
	const action = Person.singIn(email,password);

	query.execute(action, (result) => {
		res.json(result);
	});


});

export default router;