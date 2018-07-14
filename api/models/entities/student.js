'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let StudentSchema = new Schema({
  //_studentId: { type: Number },
  name: { type: String },
  avatar: { path: String, mimeType: String },
  lastName: { type: String },
  birthDate: { type: Date },
  motherName: { type: String },
  motherPhone: { type: Number }, 
  motherEmail: { type: String }, 
  fatherName: { type: String },
  fatherPhone: { type: Number }, 
  fatherEmail: { type: String }, 
  responsible: { type: String },
  responsiblePhone: { type: Number }, 
  responsibleEmail: { type: String }, 
  relationship: { type: String },
  address: { type: String },
  address2: { type: String },
  address3: { type: String },
  district: { type: String },
  zipcode: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  
  school: { type: String },
  registration: { type: Number },
  classNumber: { type: String },
  series: { type: String },
  shift: { type: String }, // Turno
  
  anotherSpecialNeeds: { type: String },
  professorNEE: { type: String },
  orientation: { type: String },
  coordination: { type: String },
  routingDate: { type: String },
  routingReason: { type: String },
  
  specialNeeds: [{ type: String }],
  otherSpecialNeeds: { type: String },
  cid: { type: String },

  geralRegister: { type: Number }, 
  historical: { type: String },
  docParentsAproval: { path: String, mimeType: String },
  termOfUse: { type: Boolean },
  
  _dateCreate: { type: Date },
  _dateModifi: { type: Date },
  _createdBy: { type: String, ref: 'User' }, //Link to teacher model
  _schoolId: { type: String, ref: 'School' } //Link to school model
 });

// set up a mongoose model
const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
