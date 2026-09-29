const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    role: {
      type: String,
      enum: ["user", "host", "admin"],
      default: "user",
    },

    avatar: {
      url: String,
      filename: String,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
