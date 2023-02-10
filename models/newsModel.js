const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
    ID: {
		type: String,
		required: true,
	},
	body: {
		type: String,
		required: true,
	},
	newsName: {
		type: String,
		required: true,
	},
	images: {
		type: Array,
		required: true,
	},
    newsDescription: {
		type: String,
		required: true,
	},
},
{
    timestamps: true,
}
);

module.exports = News = mongoose.model("news", NewsSchema);