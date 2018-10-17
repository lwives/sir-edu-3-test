'use strict';

let mongoose = require('mongoose'),
 Schema = mongoose.Schema;

let DocumentSchema = new Schema({
  _createdBy: { type: String, ref: 'User' },
  _studentId: { type: String, ref: 'Student' },
  title: { type: String },
  date: { type: Date },
  text: { type: String },
  type: { type: String }
 });

// set up a mongoose model
const Document = mongoose.model('Document', DocumentSchema);

module.exports = Document;
