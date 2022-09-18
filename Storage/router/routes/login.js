const helpers = require('../../funcs/helpers');
const router = require('express').Router();
const passport = require('passport');
const path = require('path');

router.get('/', async (req, res) => {
	const LOGIN = path.join(__dirname, '../../views/login.ejs');
	res.render(LOGIN);
});

router.post(
	'/',
	helpers.checkNotAuthenticated,
	passport.authenticate('local', {
		successRedirect: '/eservers',
		failureRedirect: '/login',
		failureFlash: true,
	})
);

module.exports = router;
