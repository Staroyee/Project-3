const { Schema } = require('mongoose');

const launchSchema = new Schema({
    launchId: {
        type: String, // ID saved from Launch Library 2 API
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
    },
    provider: {
        type: String,
    },
    location: {
        type: String,
    },
    date: {
        type: String,
    },
    image: {
        type: String,
    },
    webcastLive: {
        type: String,
    },
});

module.exports = launchSchema;