const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
	priority: {
		type: Number,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	listItems: {
		type: Array,
		title: String,
		url: String,
	},
});

module.exports = mongoose.model('list', listSchema);
