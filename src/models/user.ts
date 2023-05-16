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
import { iUser } from "types"
import Country from "./country"

@Table({ tableName: "user", timestamps: false })
export default class User extends Model<iUser> {
	@AutoIncrement
	@PrimaryKey
	@Column({ type: DataType.NUMBER, allowNull: false })
	id: number

	@Column({ type: DataType.STRING, allowNull: false })
	name: string

	@ForeignKey(() => Country)
	@Column({ field: "fkCoutry" })
	fkCountry: number

	@HasOne(() => Country, { foreignKey: "id", sourceKey: "fkCountry" })
	country: Country
}
