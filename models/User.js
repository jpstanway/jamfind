const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: String,
  messages: [
    {
      username: { type: String, required: true },
      message: { type: String, required: true },
      replies: [
        {
          username: { type: String, required: true },
          message: { type: String, required: true },
          date: { type: Date, default: Date.now }
        }
      ],
      date: { type: Date, default: Date.now }
    }
  ],
  admin: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

module.exports = User = mongoose.model("User", userSchema);
