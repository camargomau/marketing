import { iContext } from "index";
import { getFields } from "../../utils/getFields";
import { iBrandSocial } from "types";
import { readSocialNetwork } from "../socialNetwork/read"

export const readBrandSocial = async (
	parent: any,
	args: { id: number },
	{ db }: iContext,
	info: any
): Promise<iBrandSocial[]> => {
	const fields = getFields(info, "readBrandSocial");

	console.log("fields obj:");
	console.log(fields);

	const brandFields = fields.include.find(
		(brand) => brand.name === "brand"
	);
	const socialNetworkFields = fields.include.find(
		(social) => social.name === "socialNetwork"
	);

	console.log("brandFields obj:");
	console.log(brandFields);
	console.log("socialNetworkFields obj:");
	console.log(socialNetworkFields);
	
	var entries = (await db.sequelize.models.BrandSocial.findAll({
    	attributes: fields.attributes
	})) as any[];

	if (socialNetworkFields) {
		entries = entries.map(async (entry) => {
			let entryA = await readSocialNetwork(this, { id: entry.id, nest: socialNetworkFields }, { db }, info);
			entry.dataValues.socialNetwork = entryA[0]

			console.log("entry.socialNetwork contains:");
			console.log(entry.dataValues.socialNetwork);
		})
	}

	console.log("entries array:")
	console.log(entries);
	return entries;

	/**
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
	*/
};
