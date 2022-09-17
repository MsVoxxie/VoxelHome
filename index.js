const init = require('./Storage/funcs/passport-config');
const { APILogin } = require('./Storage/funcs/util');
const helpers = require('./Storage/funcs/helpers');
const { default: mongoose } = require('mongoose');
const Auth = require('./Storage/models/auth');
const session = require('express-session');
const flash = require('express-flash');
const Store = require('connect-mongo');
const PORT = process.env.PORT || 3006;
const passport = require('passport');
const express = require('express');
const bcrypt = require('bcrypt');
const https = require('https');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const app = express();

// Login to Mongo
mongoose.connect(process.env.MONGOURL);

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

// Views
const Views = {
	home: path.join(`${__dirname}/Storage/views/home.ejs`),
	login: path.join(`${__dirname}/Storage/views/login.ejs`),
	register: path.join(`${__dirname}/Storage/views/register.ejs`),
	servers: path.join(`${__dirname}/Storage/views/servers.ejs`),
	eservers: path.join(`${__dirname}/Storage/views/eservers.ejs`),
};

// Setup express use cases
app.set('view engine', 'ejs');

// Use public folder for static files
const assetPath = path.join(__dirname, './Storage/');
app.use('/assets', express.static(assetPath));

// Homepage for selecting character
app.get('/', async (req, res) => {
	//Send
	res.render(Views.home);
});

// Server View
app.get('/servers', async (req, res) => {
	// API Calls
	const Servers = [];
	const API = await APILogin();
	const allInstances = await API.ADSModule.GetInstancesAsync();
	allInstances[0].AvailableInstances.map((inst) => {
		Servers.push({
			FriendlyName: inst.FriendlyName,
			InternalName: inst.InstanceName,
			Module: inst.Module == 'GenericModule' ? 'Custom' : inst.Module == 'srcds' ? 'Source' : inst.Module,
			Running: inst.Running,
			Metrics: {
				CPUPer: inst?.Metrics?.['CPU Usage']?.Percent ? inst.Metrics['CPU Usage'].Percent : 0,
				CPUUsed: inst?.Metrics?.['CPU Usage']?.MaxValue ? `${inst.Metrics['CPU Usage'].RawValue} / ${inst.Metrics['CPU Usage'].MaxValue}` : '0',

				MemPer: inst?.Metrics?.['Memory Usage']?.Percent ? inst.Metrics['Memory Usage'].Percent : 0,
				MemUsed: inst?.Metrics?.['Memory Usage']?.MaxValue ? `${inst.Metrics['Memory Usage'].RawValue} / ${inst.Metrics['Memory Usage'].MaxValue}` : '0',

				UsersPer: inst?.Metrics?.['Active Users']?.Percent ? inst.Metrics['Active Users'].Percent : 0,
				UsersTotal: inst?.Metrics?.['Active Users']?.MaxValue ? `${inst.Metrics['Active Users'].RawValue} / ${inst.Metrics['Active Users'].MaxValue}` : '0 / 0',
			},
		});
	});
	Servers.sort((a, b) => b.Running - a.Running);
	res.render(Views.servers, { Instances: Servers });
});

// Elevated Server View
app.get('/eservers', helpers.checkAuthenticated, async (req, res) => {
	// API Calls
	const Servers = [];
	const API = await APILogin();

	// Get Instance Data
	const allInstances = await API.ADSModule.GetInstancesAsync();
	allInstances[0].AvailableInstances.map((inst) => {
		Servers.push({
			FriendlyName: inst.FriendlyName,
			InternalName: inst.InstanceName,
			Module: inst.Module == 'GenericModule' ? 'Custom' : inst.Module == 'srcds' ? 'Source' : inst.Module,
			Running: inst.Running,
			Metrics: {
				CPUPer: inst?.Metrics?.['CPU Usage']?.Percent ? inst.Metrics['CPU Usage'].Percent : 0,
				CPUUsed: inst?.Metrics?.['CPU Usage']?.MaxValue ? `${inst.Metrics['CPU Usage'].RawValue} / ${inst.Metrics['CPU Usage'].MaxValue}` : '0',

				MemPer: inst?.Metrics?.['Memory Usage']?.Percent ? inst.Metrics['Memory Usage'].Percent : 0,
				MemUsed: inst?.Metrics?.['Memory Usage']?.MaxValue ? `${inst.Metrics['Memory Usage'].RawValue} / ${inst.Metrics['Memory Usage'].MaxValue}` : '0',

				UsersPer: inst?.Metrics?.['Active Users']?.Percent ? inst.Metrics['Active Users'].Percent : 0,
				UsersTotal: inst?.Metrics?.['Active Users']?.MaxValue ? `${inst.Metrics['Active Users'].RawValue} / ${inst.Metrics['Active Users'].MaxValue}` : '0 / 0',
			},
		});
	});

	//Start, Stop, Restart Functions
	async function stopServer(id) {
		const API = await APILogin();
		await API.ADSModule.StopInstanceAsync(id);
	}

	async function startServer(id) {
		const API = await APILogin();
		await API.ADSModule.StartInstanceAsync(id);
	}

	async function restartServer(id) {
		const API = await APILogin();
		await API.ADSModule.RestartInstanceAsync(id);
	}

	Servers.sort((a, b) => b.Running - a.Running);
	res.render(Views.eservers, { Instances: Servers });
});

// Login Page
app.get('/login', helpers.checkNotAuthenticated, (req, res) => {
	res.render(Views.login);
});

app.post(
	'/login',
	helpers.checkNotAuthenticated,
	passport.authenticate('local', {
		successRedirect: '/eservers',
		failureRedirect: '/login',
		failureFlash: true,
	})
);

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

const AUTH = {
	privateKey: fs.readFileSync('/etc/letsencrypt/live/home.voxxie.me/privkey.pem', 'utf8'),
	certificate: fs.readFileSync('/etc/letsencrypt/live/home.voxxie.me/fullchain.pem', 'utf8'),
	ca: fs.readFileSync('/etc/letsencrypt/live/home.voxxie.me/chain.pem', 'utf8'),
};

https.createServer({ key: AUTH.privateKey, cert: AUTH.certificate, ca: AUTH.ca }, app).listen(PORT, () => console.log(`Server Started on port: ${PORT}`));
