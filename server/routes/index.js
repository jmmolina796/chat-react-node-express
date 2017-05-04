import express from "express";
import path from 'path';

const router = express.Router();

router.get("/",(req, res) => {
	const main = path.dirname(require.main.filename);
	res.sendFile(path.join(main,"/public/index.html"));
});

export default router;