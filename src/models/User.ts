import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "user",
    },
    country: {
      type: String,
      default: "",
    },
    age: {
      type: Number,
      default: 0,
    },
    listOfCourses: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
