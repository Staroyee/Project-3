const { Schema } = require('mongoose');

// Define Launch Schema for data coming from Launch Library 2 API
const launchSchema = new Schema({
    launchId: {
        type: String,
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

// Export Schema
module.exports = launchSchema;