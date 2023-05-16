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
import { iUserComment } from "types"
import BrandPost from "./brandPost"
import User from "./user"

@Table({ tableName: "userComment", timestamps: false })
export default class UserComment extends Model<iUserComment> {
	@AutoIncrement
	@PrimaryKey
	@Column({ type: DataType.NUMBER, allowNull: false })
	id: number

	@ForeignKey(() => BrandPost)
	@Column({ field: "fkBrandPost" })
	fkBrandPost: number

	@HasOne(() => BrandPost, { foreignKey: "id", sourceKey: "fkBrandPost" })
	brandPost: BrandPost

	@ForeignKey(() => User)
	@Column({ field: "fkUser" })
	fkUser: number

	@HasOne(() => User, { foreignKey: "id", sourceKey: "fkUser" })
	user: User

	@Column({ type: DataType.STRING, allowNull: false })
	dateTime: string

	@Column({ type: DataType.NUMBER, allowNull: false })
	sentiment: number
}
