import { iContext } from "index";

export const updateSocialNetwork = async (
	parent: any,
	args: {
		id: number;
		input: {
			name?: string;
		};
	},
	{ db }: iContext,
	info: any
) => {
	const toUpdate = await db.sequelize.models.SocialNetwork.findByPk(args.id);

	if (!toUpdate) {
		throw new Error(`No entry with the id ${args.id} could be found`);
	} else {
		return await toUpdate.update(args.input);
	}
};
