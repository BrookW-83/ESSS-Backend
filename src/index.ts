import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute";
import subCourseRoute from "./routes/subCourseRoute";
import corsMiddleware from "cors";
import moduleRoute from "./routes/moduleRoute";
import courseRoute from "./routes/courseRoute";
import quizRoute from "./routes/quizRoute";
import authRoute from "./routes/authRoute";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URL: string;
      SECRET_KEY: string;
    }
  }
}

const app = express();
app.use(corsMiddleware());
app.use(express.json());
app.use(cookieParser());
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => {
    console.error("Error connecting to database", error);
  });

app.use("/api/quiz", quizRoute);
app.use("/api/module", moduleRoute);
app.use("/api/course", courseRoute);
app.use("/api/subCourse", subCourseRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.use((err: any, req: any, res: any, next: any) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status: status,
    message: message,
  });
});
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
function cors(): any {
  throw new Error("Function not implemented.");
}
