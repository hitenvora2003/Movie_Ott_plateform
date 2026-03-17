const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    planName: {
        type: String,
        required: [true, "enter your planName"],
    },
    price: {
        type: Number,
        required: [true, "enter price"],
    },
    durationInDays: {
        type: Number,
        required: [true, "enter durationInDays"],
    },
    features: [String]
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
