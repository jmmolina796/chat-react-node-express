import express from 'express';
import path from 'path';

const router = express.Router();

router.get("/",(req, res) => {
	const main = path.dirname(require.main.filename);
	res.sendFile(path.join(main,"/public/index.html"));
});

router.post("/",(req, res) => {
	res.send("OK");
});

export default router;