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
  tableName: "admin",
  timestamps: true,
})
class Admin extends Model {
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
}

export default Admin;
