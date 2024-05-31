import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    correctAnswer: {
      type: String,
      required: true,
    },
    moduleId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Quiz", QuizSchema);
