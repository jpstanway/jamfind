const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create Post schema
const postSchema = new Schema({
  userid: { type: Schema.Types.ObjectId, ref: "User" },
  username: { type: String, required: true },
  avatar: String,
  text: { type: String, required: true },
  likes: [
    {
      userid: { type: Schema.Types.ObjectId, ref: "User" }
    }
  ],
  dislikes: [
    {
      userid: { type: Schema.Types.ObjectId, ref: "User" }
    }
  ],
  comments: [
    {
      userid: { type: Schema.Types.ObjectId, ref: "User" },
      username: { type: String, required: true },
      avatar: String,
      text: { type: String, required: true },
      date: { type: Date, default: Date.now }
    }
  ],
  date: { type: Date, default: Date.now }
});

module.exports = Post = mongoose.model("Post", postSchema);
