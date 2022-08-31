const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
    },
    password:{
      type:String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChatUser", UserSchema);