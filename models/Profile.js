const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Profile Schema
const profileSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  name: String,
  instruments: { type: [String], required: true },
  skill: { type: String, required: true },
  training: String,
  location: { type: String, required: true },
  website: String,
  soundcloudusername: String,
  bio: String,
  social: {
    youtube: String,
    facebook: String,
    instagram: String,
    twitter: String
  },
  experience: [
    {
      typeofexperience: { type: String, required: true },
      role: { type: String, required: true },
      projectname: String,
      location: String,
      from: { type: Date, required: true },
      to: Date,
      current: { type: Boolean, default: false },
      description: String
    }
  ],
  education: [
    {
      school: { type: String, required: true },
      degree: { type: String, required: true },
      program: { type: String, required: true },
      from: { type: Date, required: true },
      to: Date,
      current: { type: Boolean, default: false },
      description: String
    }
  ],
  date: { type: Date, default: Date.now }
});

module.exports = Profile = mongoose.model("Profile", profileSchema);
