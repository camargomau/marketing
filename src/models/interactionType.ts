import {
	Column,
	DataType,
	PrimaryKey,
	AutoIncrement,
	Model,
	Table,
} from "sequelize-typescript"
import { iInteractionType } from "types"

@Table({ tableName: "interactionType", timestamps: false })
export default class InteractionType extends Model<iInteractionType> {
	@AutoIncrement
	@PrimaryKey
	@Column({ type: DataType.NUMBER, allowNull: false })
	id: number

	@Column({ type: DataType.STRING, allowNull: false })
	name: string
}
