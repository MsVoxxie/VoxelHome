const { APILogin } = require('./Storage/funcs/util');
const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const PORT = process.env.PORT || 3006;
const app = express();
// Views
const Views = {
	home: path.join(`${__dirname}/Storage/views/home.ejs`),
	servers: path.join(`${__dirname}/Storage/views/servers.ejs`),
};

// Use ejs for templating
app.set('view engine', 'ejs');

// Use public folder for static files
const assetPath = path.join(__dirname, './Storage/');
app.use('/assets', express.static(assetPath));

// Homepage for selecting character
app.get('/', async (req, res) => {
	//Send
	res.render(Views.home);
});

app.get('/servers', async (req, res) => {
	// API Calls
	const Servers = [];
	const API = await APILogin();
	const allInstances = await API.ADSModule.GetInstancesAsync();
	allInstances[0].AvailableInstances.map((inst) => {
		Servers.push({
			FriendlyName: inst.FriendlyName,
			Running: inst.Running,
			Metrics: {
				CPUPer: inst?.Metrics?.['CPU Usage'].Percent ? inst.Metrics['CPU Usage'].Percent : 0,
				CPUUsed: inst?.Metrics?.['CPU Usage'].MaxValue ? `${inst.Metrics['CPU Usage'].RawValue} / ${inst.Metrics['CPU Usage'].MaxValue}` : '0',

				MemPer: inst?.Metrics?.['Memory Usage'].Percent ? inst.Metrics['Memory Usage'].Percent : 0,
				MemUsed: inst?.Metrics?.['Memory Usage'].MaxValue ? `${inst.Metrics['Memory Usage'].RawValue} / ${inst.Metrics['Memory Usage'].MaxValue}` : '0',

				UsersPer: inst?.Metrics?.['Active Users'].Percent ? inst.Metrics['Active Users'].Percent : 0,
				UsersTotal: inst?.Metrics?.['Active Users'].MaxValue ? `${inst.Metrics['Active Users'].RawValue} / ${inst.Metrics['Active Users'].MaxValue}` : '0 / 0',
			},
		});
	});
	Servers.sort((a, b) => b.Running - a.Running);
	res.render(Views.servers, { Instances: Servers });
});

const AUTH = {
	privateKey: fs.readFileSync('/etc/letsencrypt/live/home.voxxie.me/privkey.pem', 'utf8'),
	certificate: fs.readFileSync('/etc/letsencrypt/live/home.voxxie.me/fullchain.pem', 'utf8'),
	ca: fs.readFileSync('/etc/letsencrypt/live/home.voxxie.me/chain.pem', 'utf8'),
};

https.createServer({ key: AUTH.privateKey, cert: AUTH.certificate, ca: AUTH.ca }, app).listen(PORT, () => console.log(`Server Started on port: ${PORT}`));
