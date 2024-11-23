const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bio: String,
    age: Number,
    gender: String,
    interestedIn: { type: [String], enum: ['Male', 'Female', 'Both'] },
    socialLinks: {
      instagram: String,
      facebook: String,
    },
    profileImage: String, // URL of the image
  }, { timestamps: true , versionKey:false});
  
  module.exports = mongoose.model('Profile', ProfileSchema);
  