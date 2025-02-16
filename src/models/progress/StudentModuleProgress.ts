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
import Module from "../course/Module";

@Table({ tableName: "student_module_progress", timestamps: true })
class StudentModuleProgress extends Model {
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

  @ForeignKey(() => Module)
  @Column({ type: DataType.UUID, allowNull: false })
  moduleId!: string;

  @Column({ type: DataType.FLOAT, defaultValue: 0, allowNull: false })
  progress!: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  completed!: boolean;

  @BelongsTo(() => Student)
  student!: Student;

  @BelongsTo(() => Module)
  module!: Module;
}

export default StudentModuleProgress;
