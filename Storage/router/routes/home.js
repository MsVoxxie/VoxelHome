const router = require('express').Router();
const List = require('../../models/list');
const path = require('path');

router.get('/', async (req, res) => {
	const HOME = path.join(__dirname, '../../views/home.ejs');

	// Get List
	const Items = await List.find().sort({ priority: 1 });

	res.render(HOME, {
		Items,
	});
});

module.exports = router;
