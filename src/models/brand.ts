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
import { iBrand } from "types"
import Tier from "./tier"

@Table({ tableName: "brand", timestamps: false })
export default class Brand extends Model<iBrand> {
	@AutoIncrement
	@PrimaryKey
	@Column({ type: DataType.NUMBER, allowNull: false })
	id: number;

	@Column({ type: DataType.STRING, allowNull: false })
	name: string;

	@Column({ type: DataType.STRING, allowNull: false })
	email: string;

	@Column({ type: DataType.STRING, allowNull: false })
	passwordHash: string;

	@Column({ type: DataType.STRING, allowNull: false })
	phone: string;

	@ForeignKey(() => Tier)
	@Column({ field: "fkTier" })
	fkBrand: number;

	@HasOne(() => Tier, { foreignKey: 'id', sourceKey: 'fkBrand' })
	tier: Tier

	@Column({ type: DataType.BOOLEAN, allowNull: false })
	paymentDue: boolean;
}
