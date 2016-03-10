var mongoose = require("mongoose");

var contactSchema = mongoose.Schema({
	quote: { type: String, required: true },
	image: String,
	name: String
})

module.exports = mongoose.model('Contact', contactSchema);