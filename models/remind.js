const mongoose = require("mongoose");

const reminderSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: [5, "Title should be atleast 5 characters..!!"]
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    sendTime: {
        type: Date
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    modifiedOn: {
        type: Date
    },
    status: {
        type: String
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model("Reminder", reminderSchema);