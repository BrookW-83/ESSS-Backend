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
import SubCourse from "../course/SubCourse";

@Table({ tableName: "student_subcourse_progress", timestamps: true })
class StudentSubCourseProgress extends Model {
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

  @ForeignKey(() => SubCourse)
  @Column({ type: DataType.UUID, allowNull: false })
  subCourseId!: string;

  @Column({ type: DataType.FLOAT, defaultValue: 0, allowNull: false })
  progress!: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  completed!: boolean;

  @BelongsTo(() => Student)
  student!: Student;

  @BelongsTo(() => SubCourse)
  subCourse!: SubCourse;
}

export default StudentSubCourseProgress;
