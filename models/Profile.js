const mongoose = require('mongoose');

// Mixed arrays allow skills/experience/education/techs/projects to hold
// arbitrary nested objects without a rigid sub-schema.
const profileSchema = new mongoose.Schema(
  {
    personalInfo: {
      name: String,
      title: String,
      bio: String,
      email: String,
      phone: String,
      location: String,
      website: String,
      github: String,
      linkedin: String,
    },
    profileImage: { type: String, default: null },
    skills:     { type: [mongoose.Schema.Types.Mixed], default: [] },
    experience: { type: [mongoose.Schema.Types.Mixed], default: [] },
    education:  { type: [mongoose.Schema.Types.Mixed], default: [] },
    techs:      { type: [mongoose.Schema.Types.Mixed], default: [] },
    projects:   { type: [mongoose.Schema.Types.Mixed], default: [] },
    _dataVersion: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);
