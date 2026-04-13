const mongoose = require('mongoose');

const seriesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "enter title"],
    },
    description: {
        type: String,
        required: [true, "enter description"],
    },
    genre: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }],
    seasons: {
        type: Number,
        required: [true, "enter seasons"],
    },
    thumbnail: {
        type: String,
        required: [true, "enter thumbnail"],

    },
},{ timestamps: true });

module.exports = mongoose.model("Series", seriesSchema);
