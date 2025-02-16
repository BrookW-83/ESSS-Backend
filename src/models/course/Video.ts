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

@Table({ tableName: "videos", timestamps: true })

class Video extends Model {
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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  videoLink!: string;
}

export default Video;
