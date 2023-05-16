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
import { iUserSocial } from "types"
import SocialNetwork from "./socialNetwork"
import User from "./user"

@Table({ tableName: "userSocial", timestamps: false })
export default class UserSocial extends Model<iUserSocial> {
	@AutoIncrement
	@PrimaryKey
	@Column({ type: DataType.NUMBER, allowNull: false })
	id: number

	@ForeignKey(() => User)
	@Column({ field: "fkUser" })
	fkUser: number

	@HasOne(() => User, { foreignKey: "id", sourceKey: "fkUser" })
	user: User

	@ForeignKey(() => SocialNetwork)
	@Column({ field: "fkSocialNetwork" })
	fkSocialNetwork: number

	@HasOne(() => SocialNetwork, { foreignKey: "id", sourceKey: "fkSocialNetwork" })
	socialNetwork: SocialNetwork

	@Column({ type: DataType.STRING, allowNull: false })
	username: string

	@Column({ type: DataType.STRING, allowNull: false })
	creationDate: string
}
