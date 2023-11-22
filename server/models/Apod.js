const { Schema } = require('mongoose');

// Define Schema for data coming from NASA Open API for astronomy picture of the day
const apodSchema = new Schema({
  copyright: {
    type: String,
    trim: true,
  },
  date: {
    type: String,
    trim: true,
  },
  explanation: {
    type: String,
  },
  hdurl: {
    type: String,
    trim: true,
  },
  media_type: {
    type: String,
    trim: true,
  },
  service_version: {
    type: String,
    trim: true,
  },
  title: {
    type: String,
    trim: true,
  },
  url: {
    type: String,
    trim: true,
  },
});

// Export Schema
module.exports = apodSchema;
