import mongoose from "mongoose";
// import { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    require: true,
    unique: true,
  },
  displayName: {
    type: mongoose.Schema.Types.String,
    require: true,
  },
  password: {
    type: mongoose.Schema.Types.String,
    require: true,
  },
});

export const User = mongoose.model("User", userSchema);
