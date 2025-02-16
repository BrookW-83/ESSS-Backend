import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Module from "./Module";

@Table({ tableName: "quiz", timestamps: true})

class Quiz extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  id!: string;

  @ForeignKey(() => Module)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  moduleId!: string;

  @BelongsTo(() => Module)
  module!: Module;
}

export default Quiz;
