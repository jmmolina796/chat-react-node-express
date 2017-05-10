import express from 'express';
import query from '../middlewares/query';

const router = express.Router();

router.post("/", (req, res) => {
	console.log("HEY");
	res.send("HEY");
});

export default router;