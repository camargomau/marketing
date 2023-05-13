import { iContext } from "index";
import { iSocialNetwork } from "types";

export const createSocialNetwork = async (
	parent: any,
	args: {
		input: {
			name: string;
		};
	},
	{ db }: iContext,
	info: any
) => {
	const created: iSocialNetwork = (await db.sequelize.models.SocialNetwork.create({
		name: args.input.name,
	})) as any;

	return created;
};
