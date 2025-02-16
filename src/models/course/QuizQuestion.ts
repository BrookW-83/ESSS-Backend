import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Quiz from "./Quiz";

@Table({ tableName: "quiz_questions", timestamps: true})

class QuizQuestion extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  id!: string;

  @ForeignKey(() => Quiz)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  quizId!: string;

  @BelongsTo(() => Quiz)
  quiz!: Quiz;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  questions!: string;
}

export default QuizQuestion;
