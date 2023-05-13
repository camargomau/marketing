import { iContext } from "index";
import { iBrand, iTier } from "types";

export const createBrand = async (
	parent: any,
	args: {
		input: {
			name: string;
			email: string;
			passwordHash: string;
			phone: string;
			tierId: number;
			paymentDue: boolean;
		};
	},
	{ db }: iContext,
	info: any
) => {
	const assocTier = await db.sequelize.models.Tier.findByPk(args.input.tierId);

	const created: iBrand = (await db.sequelize.models.Brand.create({
		name: args.input.name,
		email: args.input.email,
		passwordHash: args.input.passwordHash,
		phone: args.input.phone,
		tierId: args.input.tierId,
		paymentDue: args.input.paymentDue
	})) as any;

	return created;
};
