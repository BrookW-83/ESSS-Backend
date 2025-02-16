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
import Course from "../course/Course";

@Table({ tableName: "student_course_progress", timestamps: true })
class StudentCourseProgress extends Model {
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

  @ForeignKey(() => Course)
  @Column({ type: DataType.UUID, allowNull: false })
  courseId!: string;

  @Column({ type: DataType.FLOAT, defaultValue: 0, allowNull: false })
  progress!: number; 

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  completed!: boolean;

  @BelongsTo(() => Student)
  student!: Student;

  @BelongsTo(() => Course)
  course!: Course;
}

export default StudentCourseProgress;
