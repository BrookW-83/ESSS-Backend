import {
  Table,
  Model,
  PrimaryKey,
  ForeignKey,
  Column,
  DataType,
} from "sequelize-typescript";
import User from "./User";

@Table({
  tableName: "student",
  timestamps: true,
})
class Student extends Model{
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  id!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId!: string;

  @Column({
    type: DataType.ENUM("beginner", "intermediate", "advanced"),
    allowNull: false,
  })
  level!: string;
}

export default Student;
