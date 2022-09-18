const router = require('express').Router();
const path = require('path');

router.get('/', async (req, res) => {
	const HOME = path.join(__dirname, '../../views/home.ejs');
	res.render(HOME);
});

module.exports = router;
