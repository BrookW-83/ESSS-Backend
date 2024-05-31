import exp from "constants";
import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    category: {
      type: Array,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    thumbnail: {
      type: String,
      default: "",
    },
    listOfStudents: {
      type: Array,
      default: [],
    },

    listOfSubCourses: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Course", CourseSchema);
