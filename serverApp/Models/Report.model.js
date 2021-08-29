const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  sourceIdentityId: {
    type: String,
    required: true
  },
  reference: {
    referenceId: { type: String },
    referenceType: { type: String },
  },
  state: {
    type: String,
    enum: ['OPEN', 'CLOSED'],
    default: 'OPEN'
  },
  payload: {
    source: { type: String },
    reportType: { type: String },
    message: { type: String },
    reportId: { type: String },
    referenceResourceId: { type: String },
    referenceResourceType: { type: String },
  },
  created: {
    type: Date,
    required: true
  }
});

const ResolvedSchema = new Schema({
  reportId: {
    type: String,
    required: true
  },
})

const Report = mongoose.model('report', ReportSchema);
const Resolved = mongoose.model('resolved', ResolvedSchema);
module.exports = { Report, Resolved };
