import express from 'express';
import query from '../middlewares/query';
import Person from '../schemas/Person';
import formidable from 'formidable';
import path from 'path';
import uuidV4 from 'uuid/v4';
import fs from 'fs';

const router = express.Router();

router.get("/:id_person",(req, res) => {
	
	const id_person = req.params.id_person;
	const action = Person.getChats(id_person);

	query.execute(action, (result) => {
		res.json(result);
	});

});

router.post("/", (req, res) => {
	
	const email = req.body.email;
	const password = req.body.password;
	const action = Person.singIn(email,password);

	query.execute(action, (result) => {
		res.json(result);
	});
});

router.post("/upload-image",(req, res) => {
	
	let form = new formidable.IncomingForm();
	
	form.parse(req);

	form.on("fileBegin", (name, file) => {
		
		const main = path.dirname(require.main.filename);

		const fileName = file.name;
		const ext = path.extname(fileName);
		const identifier = uuidV4();
		const newName = identifier+ext;

		file.name = newName;
		file.path = path.join(main,"public/assets/uploads",file.name);
	});

	form.on("file", (name, file) => {
		const urlFile = path.join("./static/assets/uploads",file.name);
		res.json({name: urlFile});
		console.log("Uploaded " + file.name);
	});
});

router.post("/delete-image/:id_image",(req, res) => {
	
	const id_image = req.params.id_image;
	const main = path.dirname(require.main.filename);
	const file = path.join(main,"public/assets/uploads",id_image);

	fs.unlink(file, (err) => {
		if(err) {
			console.log("An error has occurred");
		} else {
			console.log("File deleted successfully");
		}
		res.end("OK");
	});

});

export default router;