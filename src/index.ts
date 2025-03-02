import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import corsMiddleware from "cors";
import authRoute from "./routes/authRoute";
import sequelize from "./sequlize"
import adminRoute from "./routes/adminRoute";
import instructorRoute from "./routes/instructorRoute";



const app = express();
app.use(corsMiddleware());
app.use(express.json());
app.use(cookieParser());
dotenv.config();


app.use("/api/auth", authRoute);
app.use("/api/instructor", instructorRoute);
app.use("/api/admin", adminRoute);


const PORT = process.env.PORT || 5000;

sequelize.sync({ force: false }).then(() => {
  console.log("Database synchronized successfully.");
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
function cors(): any {
  throw new Error("Function not implemented.");
}

export default app;
