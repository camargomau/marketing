import {
	Column,
	DataType,
	PrimaryKey,
	AutoIncrement,
	Model,
	Table,
	ForeignKey,
	HasOne
} from "sequelize-typescript"
import { iUserBrand } from "types";
import Brand from "./brand";
import User from "./user";

@Table({ tableName: "userBrand", timestamps: false })
export default class UserBrand extends Model<iUserBrand> {
	@AutoIncrement
	@PrimaryKey
	@Column({ type: DataType.NUMBER, allowNull: false })
	id: number

	@ForeignKey(() => User)
	@Column({ field: "fkUser" })
	fkUser: number

	@HasOne(() => User, { foreignKey: "id", sourceKey: "fkUser" })
	user: User

	@ForeignKey(() => Brand)
	@Column({ field: "fkBrand" })
	fkBrand: number

	@HasOne(() => Brand, { foreignKey: "id", sourceKey: "fkBrand" })
	brand: Brand

	@Column({ type: DataType.NUMBER, allowNull: false })
	sentiment: number
}
