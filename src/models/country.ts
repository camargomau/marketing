import {
	Column,
	DataType,
	PrimaryKey,
	AutoIncrement,
	Model,
	Table,
} from "sequelize-typescript"
import { iCountry } from "types"

@Table({ tableName: "country", timestamps: false })
export default class Country extends Model<iCountry> {
	@AutoIncrement
	@PrimaryKey
	@Column({ type: DataType.NUMBER, allowNull: false })
	id: number

	@Column({ type: DataType.STRING, allowNull: false })
	name: string
}
