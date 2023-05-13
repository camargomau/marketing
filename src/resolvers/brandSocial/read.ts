import { iContext } from "index";
import { getFields } from "../../utils/getFields";
import { iBrandSocial } from "types";

export const readBrandSocial = async (
	parent: any,
	args: { id: number },
	{ db }: iContext,
	info: any
): Promise<iBrandSocial[]> => {
	const fields = getFields(info, "readBrandSocial");

	const brandFields = fields.include.find(
		(brand) => brand.name === "brand"
	);
	const socialNetworkFields = fields.include.find(
		(social) => social.name === "socialNetwork"
	);

	const searchedId = (!args.id) ? undefined : { id: args.id }
	const read = (await db.sequelize.models.BrandSocial.findAll({
		where: searchedId,
		attributes: fields.attributes,
		include: [
			{
				attributes: brandFields ? brandFields.attributes : [],
				model: db.sequelize.models.Brand,
				as: "brand",
			},
			{
				attributes: socialNetworkFields ? socialNetworkFields.attributes : [],
				model: db.sequelize.models.SocialNetwork,
				as: "socialNetwork",
			},
		]
	})) as any[];

	return read;
};
