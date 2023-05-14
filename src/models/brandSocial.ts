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
import { iBrandSocial } from "types"
import Brand from "./brand"
import SocialNetwork from "./socialNetwork"

@Table({ tableName: "brandSocial", timestamps: false })
export default class BrandSocial extends Model<iBrandSocial> {
	@AutoIncrement
	@PrimaryKey
	@Column({ type: DataType.NUMBER, allowNull: false })
	id: number

	@Column({ type: DataType.STRING, allowNull: false })
	@ForeignKey(() => Brand)
	@Column({ field: "fkBrand" })
	fkBrand: number

	@HasOne(() => Brand, { foreignKey: "id", sourceKey: "fkBrand" })
	brand: Brand

	@Column({ type: DataType.STRING, allowNull: false })
	@ForeignKey(() => SocialNetwork)
	@Column({ field: "fkSocialNetwork" })
	fkSocialNetwork: number

	@HasOne(() => SocialNetwork, {
		foreignKey: "id",
		sourceKey: "fkSocialNetwork"
	})
	socialNetwork: SocialNetwork

	@Column({ type: DataType.STRING, allowNull: false })
	username: string

	@Column({ type: DataType.STRING, allowNull: false })
	creationDate: string
}
