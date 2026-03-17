const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        required: [true, "enter user"],
    },
    subscription: {
        type: mongoose.Schema.Types.ObjectId, ref: "Subscription",
        required: [true, "enter subscription"],
    },
    amount: {
        type: Number,
        required: [true, "enter amount"],
    },
    method: {
        type: String, enum: ["upi", "card", "netbanking"],
        required: [true, "enter method"],
    },
    status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
    paymentDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment", paymentSchema);
