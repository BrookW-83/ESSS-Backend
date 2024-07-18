import mongoose, { Schema } from "mongoose";

const QuizAttemptSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    selectedOption: { type: String, required: true },
    score: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("QuizAttempt", QuizAttemptSchema);
