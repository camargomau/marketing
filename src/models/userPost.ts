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
import { iUserPost } from "types"
import UserBrand from "./userBrand"
import SocialNetwork from "./socialNetwork"

@Table({ tableName: "userPost", timestamps: false })
export default class UserPost extends Model<iUserPost> {
	@AutoIncrement
	@PrimaryKey
	@Column({ type: DataType.NUMBER, allowNull: false })
	id: number

	@ForeignKey(() => UserPost)
	@Column({ field: "fkUserPost" })
	fkUserPost: number

	@HasOne(() => UserPost, { foreignKey: "id", sourceKey: "fkUserPost" })
	userPost: UserPost

	@ForeignKey(() => SocialNetwork)
	@Column({ field: "fkSocialNetwork" })
	fkSocialNetwork: number

	@HasOne(() => SocialNetwork, { foreignKey: "id", sourceKey: "fkSocialNetwork" })
	socialNetwork: SocialNetwork

	@Column({ type: DataType.STRING, allowNull: false })
	dateTime: string

	@Column({ type: DataType.NUMBER, allowNull: false })
	sentiment: number
}
