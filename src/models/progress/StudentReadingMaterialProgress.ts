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
import ReadingMaterial from "../course/ReadingMaterial";

@Table({ tableName: "student_reading_material_progress", timestamps: true })

class StudentReadingMaterialProgress extends Model {
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

  @ForeignKey(() => ReadingMaterial)
  @Column({ type: DataType.UUID, allowNull: false })
  readingMaterialId!: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  completed!: boolean;

  @BelongsTo(() => Student)
  student!: Student;

  @BelongsTo(() => ReadingMaterial)
  readingMaterial!: ReadingMaterial;
}

export default StudentReadingMaterialProgress;
