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
import { iInteraction } from "types"
import InteractionType from "./interactionType"
import BrandPost from "./brandPost"
import BrandComment from "./brandComment"
import UserPost from "./userPost"
import UserComment from "./userComment"

@Table({ tableName: "interaction", timestamps: false })
export default class Interaction extends Model<iInteraction> {
	@AutoIncrement
	@PrimaryKey
	@Column({ type: DataType.NUMBER, allowNull: false })
	id: number

	@Column({ type: DataType.NUMBER, allowNull: false })
	amount: number

	@ForeignKey(() => InteractionType)
	@Column({ field: "fkInteractionType" })
	fkInteractionType: number

	@HasOne(() => InteractionType, { foreignKey: "id", sourceKey: "fkInteractionType" })
	interactionType: InteractionType

	@ForeignKey(() => BrandPost)
	@Column({ field: "fkBrandPost" })
	fkBrandPost: number

	@HasOne(() => BrandPost, { foreignKey: "id", sourceKey: "fkBrandPost" })
	brandPost: BrandPost

	@ForeignKey(() => BrandComment)
	@Column({ field: "fkBrandComment" })
	fkBrandComment: number

	@HasOne(() => BrandComment, { foreignKey: "id", sourceKey: "fkBrandComment" })
	brandComment: BrandComment

	@ForeignKey(() => UserPost)
	@Column({ field: "fkUserPost" })
	fkUserPost: number

	@HasOne(() => UserPost, { foreignKey: "id", sourceKey: "fkUserPost" })
	userPost: UserPost

	@ForeignKey(() => UserComment)
	@Column({ field: "fkUserComment" })
	fkUserComment: number

	@HasOne(() => UserComment, { foreignKey: "id", sourceKey: "fkUserComment" })
	userComment: UserComment
}
