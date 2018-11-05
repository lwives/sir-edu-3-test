'use strict';

let mongoose = require('mongoose'),
 Schema = mongoose.Schema;

let DocumentSchema = new Schema({
  _createdBy: { type: String, ref: 'User' },
  _studentId: { type: String, ref: 'Student' },
  date: { type: Date },
  // Sight, Attendance
  title: { type: String },
  text: { type: String },
  // Adaptition 
  grade: { type: String },
  class: { type: String },
  period: { type: String },
  matters: { type: String },
  teacher: { type: String },
  adappitationHistoric: { type: String },
  adaptationNeed: { type: String },
  programGolas: { type: String },
  suggetionGols: { type: String },
  programConceptual: { type: String },
  suggetionConceptual: { type: String },
  programContents: { type: String },
  suggestionContents: { type: String },
  programEvaluation: { type: String },
  suggestionEvaluation: { type: String },
  type: { type: String },
  // Plan
  days: { type: String },
  shift: { type: String },
  extraClassActivity: { type: String },
  AEE: { type: String },
  otherInformation: { type: String },
  forwardingCode: { type: String },
  forwardingDate: { type: String },
  forwardingReason: { type: String },
  familyDinamics: { type: String },
  historical: { type: String },
  attendance: { type: String },
  NEES: { type: String },
  caracter00: { type: String },
  caracter01: { type: String },
  caracter02: { type: String },
  caracter03: { type: String },
  caracter04: { type: String },
  caracter05: { type: String },
  caracter10: { type: String },
  caracter11: { type: String },
  caracter12: { type: String },
  caracter13: { type: String },
  caracter14: { type: String },
  caracter15: { type: String },
  caracter20: { type: String },
  caracter21: { type: String },
  caracter22: { type: String },
  caracter23: { type: String },
  caracter24: { type: String },
  caracter25: { type: String },
  actionExiting: { type: String },
  actionFuture: { type: String }
 });

// set up a mongoose model
const Document = mongoose.model('Document', DocumentSchema);

module.exports = Document;
