const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: { type: String, 
     required: [true,"enter generation"], 
    unique: [true,"its already exists. Please use a different one."] },
}, );

module.exports = mongoose.model("Genre", genreSchema);
