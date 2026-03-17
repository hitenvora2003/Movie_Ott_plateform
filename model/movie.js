const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "enter title"],
    },
    description: {
        type: String,
        required: [true, "enter description"],
    },
    genre: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Genre",
        required: [true, "enter generation"],
    }],
    duration: {
        type: String,
        required: [true, "enter duration"],
    },
    releaseDate: {
        type: Date,
        required: [true, "enter releasedate"],
    },
    language: {
        type: String,
        required: [true, "enter language"],
    },
    rating: { type: Number, default: 0 },
    thumbnail: {
        type: String,
        required: [true, "enter thumbnail"],
    },
    videoUrl: {
        type: String,
        required: [true, "enter Url"],
    }
});

module.exports = mongoose.model("Movie", movieSchema);
