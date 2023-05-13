import { iContext } from "index";

export const readSocialNetwork = async (
	parent: any,
	args: { id: number },
	{ db }: iContext,
	info: any
) => {
	const read = !args.id ? await db.sequelize.models.SocialNetwork.findAll() : [await db.sequelize.models.SocialNetwork.findByPk(args.id)]
	return read
};
