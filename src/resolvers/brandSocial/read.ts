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
	// Obtain the basic fields that are to be queried
	const fields = getFields(info, "readBrandSocial");

	// brandSocial contains a brand and a socialNetwork
	// Obtain the fields from those tables that are to be queried
	const brandFields = fields.include.find(
		(brand) => brand.name === "brand"
	);
	const socialNetworkFields = fields.include.find(
		(social) => social.name === "socialNetwork"
	);
	// also query their fk so that we can find the corresponding entries later
	if (brandFields) fields.attributes.push('fkBrand')
	if (socialNetworkFields) fields.attributes.push('fkSocialNetwork')
	
	// Query all the entries
	// (obtains just the basic fields)
	var read = (await db.sequelize.models.BrandSocial.findAll({
    	attributes: fields.attributes
	})) as any[];

	if (socialNetworkFields) {
		read = await Promise.all(
			read.map(async (entry) => {
				let corresp = await readSocialNetwork(
					this, { id: entry.fkSocialNetwork, nest: socialNetworkFields.attributes }, { db }, info
				);
				// read functions return an array, but we only need the object itself
				entry.socialNetwork = corresp[0]

				return entry
			}
		))
	}

	return read;
};
