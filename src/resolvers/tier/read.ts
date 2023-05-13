import { iContext } from "../../index";

export const readTier = async (
	parent: any,
	args: any,
	{ db }: iContext,
	info: any
) => {
	return await db.sequelize.models.Tier.findAll();
};
