import { iContext } from "index";
import { iBrandSocial } from "types";

export const createBrandSocial = async (
	parent: any,
	args: {
		input: {
			fkBrand: number;
			fkSocialNetwork: number;
			username: string;
			creationDate: string;
		};
	},
	{ db }: iContext,
	info: any
) => {
	const created: iBrandSocial = (await db.sequelize.models.BrandSocial.create({
		fkBrand: args.input.fkBrand,
		fkSocialNetwork: args.input.fkSocialNetwork,
		username: args.input.username,
		creationdate: args.input.creationDate
	})) as any;

	return created;
};
