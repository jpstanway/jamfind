const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create Inbox schema
const inboxSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  username: { type: String, required: true },
  conversations: [
    {
      users: { type: [String], required: true },
      messages: [
        {
          username: { type: String, required: true },
          message: { type: String, required: true },
          date: { type: Date, default: Date.now }
        }
      ],
      date: { type: Date, default: Date.now }
    }
  ],
  date: { type: Date, default: Date.now }
});

module.exports = Inbox = mongoose.model("Inbox", inboxSchema);
