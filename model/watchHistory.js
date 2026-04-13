const mongoose = require('mongoose');

const watchHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        required: [true, "enter user"],
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId, ref: "Movie",
        required: [true, "enter movie"],
    },
    episode: {
        type: mongoose.Schema.Types.ObjectId, ref: "Episode",
        required: [true, "enter episode"],
    },
    lastWatchedAt: { type: Date, default: Date.now },
    progress: { type: Number, default: 0 } // percentage watched
},{ timestamps: true });

module.exports = mongoose.model("WatchHistory", watchHistorySchema);
