import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  ForeignKey,
} from "sequelize-typescript";

import Instructor from "../user/Instructor";

@Table({ tableName: "Courses", timestamps: true })

class Course extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  id!: string;

  @ForeignKey(() => Instructor)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  instructorId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  thumbnail!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.ENUM("beginner", "intermediate", "advanced"),
    allowNull: false,
  })
  level!: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  category!: string[];

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  rating!: number;
}

export default Course;
