import { iContext } from "index";

export const readTier = async (
	parent: any,
	args: { id: number },
	{ db }: iContext,
	info: any
) => {
	const read = !args.id ? await db.sequelize.models.Tier.findAll() : [await db.sequelize.models.Tier.findByPk(args.id)]
	return read
};
