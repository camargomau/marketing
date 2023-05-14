import { iContext } from "index";
import { iFieldSelection } from "../../utils/getFields";
import { getFields } from "../../utils/getFields";

import { iBrand } from "types";
import { readTier } from "../tier/read";

export const readBrand = async (
	parent: any,
	args: { id: number, nest: iFieldSelection },
	{ db }: iContext,
	info: any
): Promise<iBrand[]> => {
	const fields = (args.nest) ? args.nest : getFields(info, "readBrand");

	const tierFields = fields.include.find(
		(tier) => tier.name === "tier"
	);
	if (tierFields) fields.attributes.push('fkTier');

	const searchedId = (args.id) ? { id: args.id } : undefined
	var found = (await db.sequelize.models.Brand.findAll({
		where: searchedId,
    	attributes: fields.attributes
	})) as any[];

	if (tierFields) {
		found = await Promise.all(
			found.map(async (entry) => {
				let related = await readTier(
					this, { id: entry.fkTier, nest: tierFields }, { db }, info
				);
				entry.tier = related[0]

				return entry
			}
		))
	}

	return found;
};
