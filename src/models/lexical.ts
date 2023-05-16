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
import { iLexical } from "types"
import BrandSocial from "./brandSocial"
import WordTrend from "./wordTrend"

@Table({ tableName: "lexical", timestamps: false })
export default class Lexical extends Model<iLexical> {
	@AutoIncrement
	@PrimaryKey
	@Column({ type: DataType.NUMBER, allowNull: false })
	id: number

	@ForeignKey(() => BrandSocial)
	@Column({ field: "fkBrandSocial" })
	fkBrandSocial: number

	@HasOne(() => BrandSocial, { foreignKey: "id", sourceKey: "fkBrandSocial" })
	brandSocial: BrandSocial

	@ForeignKey(() => WordTrend)
	@Column({ field: "fkWordTrend" })
	fkWordTrend: number

	@HasOne(() => WordTrend, { foreignKey: "id", sourceKey: "fkWordTrend" })
	wordTrend: WordTrend

	@Column({ type: DataType.NUMBER, allowNull: false })
	frequency: number
}
