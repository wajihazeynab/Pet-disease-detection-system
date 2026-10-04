const { Schema, model } = require("mongoose");


const chatSchema = new Schema({
  channelId: {
    type: Schema.Types.ObjectId,
    ref: "Channel",
    required: true,
  },
  sender: {
    type: String,
  },
  message: {
    type: String,
  },
},
  {
    timestamps: true,
  }
);

module.exports = model("chats", chatSchema);
