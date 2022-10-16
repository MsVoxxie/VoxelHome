const helpers = require('../../funcs/helpers');
const List = require('../../models/list.js');
const router = require('express').Router();
const path = require('path');

router.get('/', helpers.checkAuthenticated, (req, res) => {
	const REGISTER = path.join(__dirname, '../../views/addlist.ejs');
	res.render(REGISTER);
});

router.post('/', helpers.checkAuthenticated, async (req, res) => {
	try {
		// Exists?
		let hasDoc = await List.countDocuments({ category: req.body.category, listItems: { $elemMatch: { title: req.body.title, url: req.body.url } } });
		if (hasDoc > 0) return res.send('Item already exists').status(400);
		// const ListCheck = await List.exists({ category: req.body.category, title: req.body.title, url: req.body.url });
		// if (ListCheck) return res.send('Item already exists').status(400);

		// Create
		await List.findOneAndUpdate({ category: req.body.category }, { $push: { listItems: { title: req.body.title, url: req.body.url } } }, { upsert: true });
		res.redirect('/addlist');
	} catch (error) {
		res.redirect('/addlist');
		console.log(error);
	}
});

module.exports = router;
