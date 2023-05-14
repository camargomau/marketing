import { iContext } from "index";

export const readSocialNetwork = async (
	parent: any,
	args: { id: number, nest: any },
	{ db }: iContext,
	info: any
) => {
	var read;

	if (!args.nest) {
		read = !args.id ? await db.sequelize.models.SocialNetwork.findAll() : [await db.sequelize.models.SocialNetwork.findByPk(args.id)]
	} else {
		if (!args.id) {
			read = await db.sequelize.models.SocialNetwork.findAll();
		} else {
			read = await db.sequelize.models.SocialNetwork.findAll( {
				where: { id: args.id },
				attributes: args.nest.attributes
			}
			)
		}
	}

	return read
};
