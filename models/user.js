import { Schema, model } from "mongoose";
import { handleSaveError, validateAtUpdate } from "./hooks.js";
import { emailRegexp } from "../constants/constants.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      minlenth: 6,
      required: [true, "Set password for user"],
    },
    avatarURL: {
      type: String,
      
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      // required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("findOneAndUpdate", validateAtUpdate);
userSchema.post("save", handleSaveError);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
