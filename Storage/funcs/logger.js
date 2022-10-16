// Console colors
const colors = require('colors');

// [INFO] console out
const info = function (message) {
	console.log(colors.cyan('[INFO]'), message);
};

// [ERROR] console out
const error = function (message) {
	console.log(colors.red('[ERROR]'), message);
};

// [SUCCESS] console out
const success = function (message) {
	console.log(colors.green('[SUCCESS]'), message);
};

// [UNKNWON] console out
const unknown = function (message) {
	console.log(colors.yellow('[UNKNOWN]'), message);
};

// Module exports
module.exports.info = info;
module.exports.error = error;
module.exports.success = success;
module.exports.unknown = unknown;
