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
import Video from "../course/Video";

@Table({ tableName: "student_video_progress", timestamps: true })

class StudentVideoProgress extends Model {
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

  @ForeignKey(() => Video)
  @Column({ type: DataType.UUID, allowNull: false })
  videoId!: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  complete!: boolean;

  @BelongsTo(() => Student)
  student!: Student;

  @BelongsTo(() => Video)
  video!: Video;
}

export default StudentVideoProgress;
