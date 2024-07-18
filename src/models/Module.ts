import mongoose from "mongoose";

const ReadingMaterialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
});

const ModuleSchema = new mongoose.Schema(
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
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    subCourseId: {
      type: String,
      required: true,
    },
    listOfQuiz: {
      type: Array,
      default: [],
    },
    readingMaterials: [ReadingMaterialSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Module", ModuleSchema);
