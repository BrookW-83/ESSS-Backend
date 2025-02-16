import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import SubCourse from "./SubCourse";

@Table({ tableName: "modules", timestamps: true })
class Module extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  id!: string;

  @ForeignKey(() => SubCourse)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  subCourseId!: string;

  @BelongsTo(() => SubCourse)
  subCourse!: SubCourse;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;
}

export default Module;
