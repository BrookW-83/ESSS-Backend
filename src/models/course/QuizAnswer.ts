import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import QuizQuestion from "./QuizQuestion";

@Table({ tableName: "quiz_answers", timestamps: true})

class QuizAnswer extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  id!: string;

  @ForeignKey(() => QuizQuestion)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  questionId!: string;

  @BelongsTo(() => QuizQuestion)
  question!: QuizQuestion;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  quizAnswer!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isCorrect!: boolean;
}

export default QuizAnswer;
