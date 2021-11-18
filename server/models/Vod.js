const { Schema, model } = require("mongoose");

const vodSchema = new Schema({
  vodUrl: {
    type: String,
    required: "You need to link a vod!",
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  vodAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  vodTitle: {
    type: String,
    required: true,
    trim: true,
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      timeStamp: {
        type: String,
        
      },
      voteCount: {
        type: Number,
      }
    },
  ],
});

const Vod = model("Vod", vodSchema);

module.exports = Vod;
