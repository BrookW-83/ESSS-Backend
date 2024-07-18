import { NextFunction, Request, Response } from "express";
import Quiz from "../models/Quiz";

interface CustomRequest extends Request {
  user?: {
    id: string;
  };
}

//create a quiz
export const createQuiz = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const newQuiz = new Quiz(req.body);
    const savedQuiz = await newQuiz.save();
    res.status(200).json(savedQuiz);
  } catch (err) {
    next(err);
  }
};

//get all module quizzes
export const getAllModuleQuizzes = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const quizzes = await Quiz.find({ module: req.params.module });
    res.status(200).json(quizzes);
  } catch (err) {
    next(err);
  }
};

//get a module quiz by id
export const getQuiz = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const quizes = await Quiz.findById(req.params.id);
    res.status(200).json(quizes);
  } catch (err) {
    next(err);
  }
};

//update a quiz
export const updateQuiz = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
  } catch (err) {
    next(err);
  }
};

// delete a quiz
export const deleteQuiz = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    await Quiz.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (err) {
    next(err);
  }
};

//quiz evaluation logic
// const evaluateQuiz = (
//   quiz: any,
//   userAnswers: any[]
// ): { score: number; feedback: string } => {
//   let score = 0;
//   let feedback = "";

//   quiz.questions.forEach((question: any, index: number) => {
//     const userAnswer = userAnswers.find(
//       (answer) => answer.questionId.toString() === question._id.toString()
//     );
//     if (userAnswer) {
//       const correctOption = question.options.find(
//         (option: any) => option.isCorrect
//       );
//       if (
//         correctOption &&
//         correctOption._id.toString() === userAnswer.selectedOption.toString()
//       ) {
//         score++;
//         feedback += `Question ${index + 1}: Correct\n`;
//       } else {
//         feedback += `Question ${index + 1}: Incorrect\n`;
//       }
//     }
//   });

//   return { score, feedback };
// };

// // Submit a quiz attempt
// export const submitQuizAttempt = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { userId, quizId, userAnswers } = req.body;

//   try {
//     const quiz = await Quiz.findById(quizId);
//     if (!quiz) {
//       return res.status(404).json({ error: "Quiz not found" });
//     }

//     const { score, feedback } = evaluateQuiz(quiz, userAnswers);

//     const newQuizAttempt = new QuizAttempt({
//       userId,
//       quizId,
//       userAnswers,
//       score,
//     });

//     await newQuizAttempt.save();

//     res.status(201).json({ score, feedback, attempt: newQuizAttempt });
//   } catch (err) {
//     next(err);
//   }
// };
