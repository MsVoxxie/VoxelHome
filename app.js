const init = require('./Storage/funcs/passport-config');
const { APILogin } = require('./Storage/funcs/util');
const helpers = require('./Storage/funcs/helpers');
const routes = require('./Storage/router/router');
const Auth = require('./Storage/models/auth');
const session = require('express-session');
const flash = require('express-flash');
const Store = require('connect-mongo');
const mongoose = require('mongoose');
const passport = require('passport');
const express = require('express');
const https = require('https');
const http = require('http');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Custom Requirements
const logger = require('./Storage/funcs/logger');

// Constants
const config = require('./config.json');
const PORT = config.port;
const app = express();

// Login to Mongo
mongoose.connect(process.env.MONGOURL).then(() => {
	logger.info('MongoDB Successfully connected.');
});

// Init passport
init(
	passport,
	async (username) => await Auth.findOne({ username: username }),
	async (id) => await Auth.findOne({ id: id })
);

// Setup Session
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
	session({
		secret: process.env.SECRET,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 90, // 3 Months
			httpOnly: true,
			secure: true,
		},
		resave: false,
		saveUninitialized: false,
		store: Store.create({ mongoUrl: process.env.MONGOURL }),
	})
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

// Setup express use cases
app.set('view engine', 'ejs');

// Use public folder for static files
const assetPath = path.join(__dirname, './Storage/');
app.use('/assets', express.static(assetPath));

//Register Page
// app.get('/register', helpers.checkNotAuthenticated, (req, res) => {
// 	res.render(Views.register);
// });

// app.post('/register', helpers.checkNotAuthenticated, async (req, res) => {
// 	try {
// 		const userCheck = await Auth.exists({ username: req.body.username });
// 		if (userCheck) return res.send('Username already exists').status(400);
// 		const hashedPassword = await bcrypt.hash(req.body.password, 10);
// 		await Auth.create({
// 			username: req.body.username,
// 			password: hashedPassword,
// 		});

// 		res.redirect('/login');
// 	} catch (error) {
// 		res.redirect('/register');
// 		console.log(error);
// 	}
// });

// Server
let server;
if (!config.ssl.useSSL) {
	server = http.createServer(app);
} else {
	server = https.createServer(
		{
			key: fs.readFileSync(config.ssl.privateKeyPath, 'utf8'),
			cert: fs.readFileSync(config.ssl.certificatePath, 'utf8'),
		},
		app
	);
}

server.listen(PORT);
logger.success(`Now listening on port: ${PORT}`);
