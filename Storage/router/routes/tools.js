const { ConvertRGBtoHex, HexToRgb } = require('../../funcs/tools/randomcolor/colorFunctions');
const router = require('express').Router();
const axios = require('axios');
const path = require('path');

const VIEWS = {
	TOOLS: path.join(__dirname, '../../views/tools.ejs'),
	TIMESTAMP: path.join(__dirname, '../../views/tools/timestamp/timestamp.ejs'),
	RANDCOL: path.join(__dirname, '../../views/tools/randomcolor/randcol.ejs'),
};

router.get('/', async (req, res) => {
	res.render(VIEWS.TOOLS);
});

router.get('/:tool', async (req, res) => {
	switch (req.params.tool) {
		case 'timestamp':
			res.render(VIEWS.TIMESTAMP);
			break;

		case 'colorlovers':
			response = await axios.post(`http://www.colourlovers.com/api/palettes/random?format=json`);
			data = response.data[0];
			colors = data.colors.map((c) => `#${c}`);
			res.render(VIEWS.RANDCOL, { colors, endpoint: 'colorlovers' });
			break;

		case 'colormind':
			response = await axios.post('http://colormind.io/api/', { model: 'default' });
			data = response.data.result;
			colors = [];

			for (let i = 0; i < data.length; i++) {
				let Hex = ConvertRGBtoHex(data[i][0], data[i][1], data[i][2]);
				colors.push(Hex.toUpperCase());
			}
			res.render(VIEWS.RANDCOL, { colors, endpoint: 'colormind' });
			break;

		default:
			res.redirect('/tools');
			break;
	}
});

module.exports = router;
