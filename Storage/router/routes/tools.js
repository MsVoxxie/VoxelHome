const router = require('express').Router();
const path = require('path');

router.get('/', async (req, res) => {
	const TOOLS = path.join(__dirname, '../../views/tools.ejs');
	res.render(TOOLS);
});

router.get('/:tool', async (req, res) => {
	switch (req.params.tool) {
		case 'timestamp':
			const TIMESTAMP = path.join(__dirname, '../../views/tools/timestamp/timestamp.ejs');
			res.render(TIMESTAMP);
			break;

		default:
			res.redirect('/tools');
			break;
	}
});

module.exports = router;
