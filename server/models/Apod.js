const { Schema } = require('mongoose');

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

module.exports = apodSchema;
