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
import { iBrandPost } from "types"
import BrandSocial from "./brandSocial"

@Table({ tableName: "brandPost", timestamps: false })
export default class BrandPost extends Model<iBrandPost> {
	@AutoIncrement
	@PrimaryKey
	@Column({ type: DataType.NUMBER, allowNull: false })
	id: number

	@ForeignKey(() => BrandSocial)
	@Column({ field: "fkBrandSocial" })
	fkBrandSocial: number

	@HasOne(() => BrandSocial, { foreignKey: "id", sourceKey: "fkBrandSocial" })
	brandSocial: BrandSocial

	@Column({ type: DataType.STRING, allowNull: false })
	dateTime: string

	@Column({ type: DataType.NUMBER, allowNull: false })
	publicReaction: number
}
