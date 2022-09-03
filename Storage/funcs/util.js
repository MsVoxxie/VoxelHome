async function APILogin() {
	const ampapi = require('@cubecoders/ampapi');
	const API = new ampapi.AMPAPI(process.env.AMPURI);
	try {
		// Run init stage one
		let APIInit = await API.initAsync();
		if (!APIInit) return console.log('Failed to Initialize API');

		// Login
		let loginResult = await API.Core.LoginAsync(process.env.AMPUSER, process.env.AMPPASS, '', false);
		if (!loginResult.success) return console.log('Failed to login');

		// Add session token.
		API.sessionId = loginResult.sessionID;

		// Run init stage two
		APIInit = await API.initAsync();
		if (!APIInit) return console.log('Failed Stage Two API Initialization');

		return API;
	} catch (error) {
		console.error(error);
	}
}

module.exports = {
    APILogin
}