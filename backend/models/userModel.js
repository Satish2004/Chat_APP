import mongoose from "mongoose";

// ye model tab kaam ayega jab koi ek user ka meta data fill krna ho dekhna ho
const userModel = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      default: " ",
    },
    gender: {
      type: String,
      enum: ["male", "female"], // when we use multiple choose isse jada ni jo likh hai bs wahi
      required: true,
    },
  },
  { timestamps: true }
);
export const User = mongoose.model("User", userModel);
