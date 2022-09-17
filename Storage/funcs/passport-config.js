const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function init(passport, getUserByUsername, getUserById) {
	const authenticateUser = async (username, password, done) => {
		const user = await getUserByUsername(username);
		if (user == null) {
			return done(null, false, { message: 'Incorrect Username' });
		}

		// Try to authenticate the user
		try {
			// Decrypt PW
			if (await bcrypt.compare(password, user.password)) {
				// Password is correct.
				return done(null, user);
			} else {
				// Password is incorrect.
				return done(null, false, { message: 'Incorrect Password' });
			}
		} catch (error) {
			return done(error);
		}
	};

	passport.use(new localStrategy({ usernameField: 'username' }, authenticateUser));
	passport.serializeUser((user, done) => done(null, user.username));
	passport.deserializeUser((id, done) => {
		return done(null, getUserById(id));
	});
}

module.exports = init;
