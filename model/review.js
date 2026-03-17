const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        required: [true, "enter user"],
    },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
    series: { type: mongoose.Schema.Types.ObjectId, ref: "Series" },
    rating: {
        type: Number, min: 1, max: 5,
        required: [true, "enter rating"],
    },
    comment: String
},);

module.exports = mongoose.model("Review", reviewSchema);
