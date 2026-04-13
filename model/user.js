const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "enter name"]
  },
mobile : { 
  type: Number,
  required: [true,"Please Enter your mobile no"]
 },
  email: {
    type: String,
    required: [true, "enter email"],
    unique: [true, "Email already exists. Please use a different one."]
  },
  password: {
    type: String,
    required: [true, "enter password"]
  },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  subscription: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },
},{ timestamps: true });



module.exports = mongoose.model("User", userSchema);

