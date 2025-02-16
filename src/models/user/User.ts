import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
} from "sequelize-typescript";

@Table({
  tableName: "users",
  timestamps: true,
})
class User extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  firstName!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  lastName!: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password!: string;

  @Column({ type: DataType.BIGINT, allowNull: false })
  phoneNumber!: number;

  @Column({ type: DataType.STRING })
  profilePicture!: string;

  @Column({ type: DataType.ENUM("Male", "Female") })
  gender!: string;

  @Column({
    type: DataType.ENUM("admin", "instructor", "student"),
    allowNull: false,
  })
  role!: string;
}

export default User;
