import {
	Column,
	DataType,
	PrimaryKey,
	AutoIncrement,
	Model,
	Table,
} from "sequelize-typescript"
import { iWordTrend } from "types"

@Table({ tableName: "wordTrend", timestamps: false })
export default class WordTrend extends Model<iWordTrend> {
	@AutoIncrement
	@PrimaryKey
	@Column({ type: DataType.NUMBER, allowNull: false })
	id: number

	@Column({ type: DataType.STRING, allowNull: false })
	word: string

	@Column({ type: DataType.NUMBER, allowNull: false })
	scoreWeek: number

	@Column({ type: DataType.NUMBER, allowNull: false })
	scoreMonth: number

	@Column({ type: DataType.NUMBER, allowNull: false })
	scoreYear: number
}
