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

const AUTH = {
	privateKey: fs.readFileSync('/etc/letsencrypt/live/home.voxxie.me/privkey.pem', 'utf8'),
	certificate: fs.readFileSync('/etc/letsencrypt/live/home.voxxie.me/fullchain.pem', 'utf8'),
	ca: fs.readFileSync('/etc/letsencrypt/live/home.voxxie.me/chain.pem', 'utf8'),
};

https.createServer({ key: AUTH.privateKey, cert: AUTH.certificate, ca: AUTH.ca }, app).listen(PORT, () => console.log(`Server Started on port: ${PORT}`));