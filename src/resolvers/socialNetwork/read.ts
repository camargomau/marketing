import { iContext } from "index";
import { getFields } from "../../utils/getFields";

export const readSocialNetwork = async (
	parent: any,
	args: { id: number, nest: any },
	{ db }: iContext,
	info: any
) => {
	const searchedId = (args.id) ? { id: args.id } : undefined
	const desiredAttributes = (args.nest) ? args.nest : getFields(info, "readSocialNetwork")

	const found = await db.sequelize.models.SocialNetwork.findAll({
		where: searchedId,
		attributes: desiredAttributes
	})

	return found
};
