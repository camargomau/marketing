import { iContext } from "index";
import { iTier } from "types";

export const createTier = async (
	parent: any,
	args: {
		input: {
			name: string;
			price: number;
		};
	},
	{ db }: iContext,
	info: any
) => {
	const created: iTier = (await db.sequelize.models.Tier.create({
		name: args.input.name,
		price: args.input.price,
	})) as any;

	return created;
};
