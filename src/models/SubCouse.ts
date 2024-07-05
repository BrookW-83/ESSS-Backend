import mongoose from "mongoose";

const SubCourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    part: {
      type: Number,
      required: true,
    },
    courseID: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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
    listOfModules: {
      type: Array,
      default: [],
    },
  },

  { timestamps: true }
);

export default mongoose.model("SubCourse", SubCourseSchema);
