import { create } from "domain";
import express from "express";
import {
  createQuiz,
  deleteQuiz,
  getAllModuleQuizzes,
  getQuiz,
  // submitQuizAttempt,
  updateQuiz,
} from "../controllers/quiz";

const router = express.Router();

// Create Quiz (POST request):
router.post("/create", createQuiz);
// // Get All Quizzes based on a module (GET request):
router.get("/all/:module", getAllModuleQuizzes);
// Get Single Quiz by ID (GET request with ID parameter):
router.get("/:id", getQuiz);
// Update Quiz (PUT request with ID parameter):
router.put("/:id", updateQuiz);
// Delete Quiz (DELETE request with ID parameter):
router.delete("/:id", deleteQuiz);

// Submit Quiz Attempt (POST request with ID parameter):
// This route handles student submissions for a quiz.
// The request body might include the quiz ID, userId,student answers, and potentially a timestamp.
// router.post("/quiz-attempts", submitQuizAttempt);

// This route would likely interact with a model for storing student quiz attempts and their scores.
// Get Quiz Results (GET request with ID parameter):
// This route allows students to access their results for a specific quiz attempt.
// The response might include information like their score, chosen answers, and potentially correct answers (depending on the desired level of feedback).

export default router;
