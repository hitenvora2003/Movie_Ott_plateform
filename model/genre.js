const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: { type: String, 
     required: [true,"enter generation"], 
     },
},{ timestamps: true } );

module.exports = mongoose.model("Genre", genreSchema);
