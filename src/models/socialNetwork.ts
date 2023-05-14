import {
	Column,
	AutoIncrement,
	PrimaryKey,
	Model,
	Table,
	DataType
} from "sequelize-typescript"
import { iSocialNetwork } from "types"

@Table({ tableName: "socialNetwork", timestamps: false })
export default class SocialNetwork extends Model<iSocialNetwork> {
	@AutoIncrement
	@PrimaryKey
	@Column({ type: DataType.NUMBER, allowNull: false })
	id: number

	@Column({ type: DataType.STRING, allowNull: false })
	name: string
}
