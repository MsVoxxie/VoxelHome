const helpers = require('../../funcs/helpers');
const router = require('express').Router();
const path = require('path');

router.get('/', helpers.checkNotAuthenticated, (req, res) => {
	const REGISTER = path.join(__dirname, '../../views/register.ejs');
	res.render(REGISTER);
});

router.post('/', helpers.checkNotAuthenticated, async (req, res) => {
	try {
		const userCheck = await Auth.exists({ username: req.body.username });
		if (userCheck) return res.send('Username already exists').status(400);
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		await Auth.create({
			username: req.body.username,
			password: hashedPassword,
		});

		res.redirect('/login');
	} catch (error) {
		res.redirect('/register');
		console.log(error);
	}
});

module.exports = router;
