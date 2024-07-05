"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const subCourseRoute_1 = __importDefault(require("./routes/subCourseRoute"));
const moduleRoute_1 = __importDefault(require("./routes/moduleRoute"));
const courseRoute_1 = __importDefault(require("./routes/courseRoute"));
const quizRoute_1 = __importDefault(require("./routes/quizRoute"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const app = (0, express_1.default)();
app.use(cors());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
dotenv_1.default.config();
mongoose_1.default
    .connect(process.env.MONGO_URL)
    .then(() => {
    console.log("connected to database");
})
    .catch((error) => {
    console.error("Error connecting to database", error);
});
app.use("/api/quiz", quizRoute_1.default);
app.use("/api/module", moduleRoute_1.default);
app.use("/api/course", courseRoute_1.default);
app.use("/api/subCourse", subCourseRoute_1.default);
app.use("/api/auth", authRoute_1.default);
app.use("/api/user", userRoute_1.default);
app.use((err, req, res, next) => {
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
function cors() {
    throw new Error("Function not implemented.");
}
