import {
	Column,
	AutoIncrement,
	PrimaryKey,
	Model,
	Table,
	DataType,
} from "sequelize-typescript";
import { iTier } from "types";

@Table({ tableName: "tier", timestamps: false })
export default class Tier extends Model<iTier> {
	@AutoIncrement
	@PrimaryKey
	@Column({ type: DataType.NUMBER, allowNull: false })
	id: number;

	@Column({ type: DataType.STRING, allowNull: false })
	name: string;

	@Column({ type: DataType.NUMBER, allowNull: false })
	price: number;
}
