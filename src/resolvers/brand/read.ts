import { iContext } from "index";
import { getFields } from "../../utils/getFields";
import { iBrand } from "types";

export const readBrand = async (
	parent: any,
	args: { id: number },
	{ db }: iContext,
	info: any
): Promise<iBrand[]> => {
	const fields = getFields(info, "readBrand");

	const tierFields = fields.include.find(
		(tier) => tier.name === "tier"
	);

	const searchedId = (!args.id) ? undefined : { id: args.id }
	const read = (await db.sequelize.models.Brand.findAll({
		where: searchedId,
		attributes: fields.attributes,
		include: [
			{
				attributes: tierFields ? tierFields.attributes : [],
				model: db.sequelize.models.Tier,
				as: "tier",
			},
		]
	})) as any[];

	return read;
};
