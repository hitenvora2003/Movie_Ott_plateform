const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
  series: { type: mongoose.Schema.Types.ObjectId, ref: "Series", 
    required: [true,"enter seriesname"]},
  seasonNumber: {
    type : Number,
    required: [true,"enter seasonnumber"]
  },
  episodeNumber: {
    type : Number,
    required: [true,"enter episode number"]
  },
  title: {
    type : String,
    required: [true,"enter titlename"]
  },
  duration: {
    type : String,
    required: [true,"enter duration"]
  },
  videoUrl: {
    type : String,
    required: [true,"enter Url"]
  },
  releaseDate: {
    type : Date,
    required: [true,"enter releasedate"]
  }
},{ timestamps: true });

module.exports = mongoose.model("Episode", episodeSchema);
