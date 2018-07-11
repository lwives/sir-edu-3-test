'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let SchoolSchema = new Schema({
  name: { type: String, required: true },
  mapLocation: { type: [Number], index: '2d' },
  zipcode: { type: Number },
  adress: { type: String },
  adress2: { type: String },
  district: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  phone: { tupe: String },
  email: { tupe: String },
  _dateCreate: { type: Date },
  _dateModifi: { type: Date },
  _createdBy: { type: String, ref: 'User' } //Link to teacher model
 });

// set up a mongoose model
const School = mongoose.model('School', SchoolSchema);

module.exports = School;
