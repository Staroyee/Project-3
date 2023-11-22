const mongoose = require('mongoose');

// Connect database using the process.env mongodb_uri so that Heroku is able to provide the config var.
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/skyward');

// Export the connection to server.js
module.exports = mongoose.connection;
