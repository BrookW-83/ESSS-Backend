import {
  Table,
  Model,
  PrimaryKey,
  ForeignKey,
  Column,
  DataType,
  BelongsTo,
} from "sequelize-typescript";
import Student from "../user/Student";
import Quiz from "../course/Quiz";

@Table({ tableName: "student_quiz_progress", timestamps: true })

class StudentQuizProgress extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  id!: string;

  @ForeignKey(() => Student)
  @Column({ type: DataType.UUID, allowNull: false })
  studentId!: string;

  @ForeignKey(() => Quiz)
  @Column({ type: DataType.UUID, allowNull: false })
  quizId!: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0, allowNull: false })
  score!: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  completed!: boolean;

  @BelongsTo(() => Student)
  student!: Student;

  @BelongsTo(() => Quiz)
  quiz!: Quiz;
}

export default StudentQuizProgress;
