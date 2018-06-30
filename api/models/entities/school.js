'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let SchoolSchema = new Schema({
  name: { type: String, required: true },
  mapLocation: { type: [Number], index: '2d' },
  cep: { type: Number },
  adress: { type: String },
  adressNum: { type: Number },
  district: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  phone: { tupe: String },
  email: { tupe: String },
  principal: { tupe: String, ref: 'User' }
 });

// set up a mongoose model
const School = mongoose.model('School', SchoolSchema);

module.exports = School;
