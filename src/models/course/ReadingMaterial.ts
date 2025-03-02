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

@Table({ tableName: "reading_material", timestamps: true})

class ReadingMaterial extends Model {
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
  readingMaterialContent!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  readingMaterialLink!: string;
}

export default ReadingMaterial;
