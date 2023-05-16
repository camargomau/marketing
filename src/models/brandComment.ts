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
import { iBrandComment } from "types"
import UserPost from "./userPost"

@Table({ tableName: "brandComment", timestamps: false })
export default class BrandComment extends Model<iBrandComment> {
	@AutoIncrement
	@PrimaryKey
	@Column({ type: DataType.NUMBER, allowNull: false })
	id: number

	@ForeignKey(() => UserPost)
	@Column({ field: "fkUserPost" })
	fkUserPost: number

	@HasOne(() => UserPost, { foreignKey: "id", sourceKey: "fkUserPost" })
	userPost: UserPost

	@Column({ type: DataType.STRING, allowNull: false })
	dateTime: string

	@Column({ type: DataType.NUMBER, allowNull: false })
	publicReaction: number
}
