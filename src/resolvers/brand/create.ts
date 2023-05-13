import { iContext } from "index";
import { iBrand } from "types";

export const createBrand = async (
	parent: any,
	args: {
		input: {
			name: string;
			email: string;
			passwordHash: string;
			phone: string;
			fkBrand: number;
			paymentDue: boolean;
		};
	},
	{ db }: iContext,
	info: any
) => {
	const created: iBrand = (await db.sequelize.models.Brand.create({
		name: args.input.name,
		email: args.input.email,
		passwordHash: args.input.passwordHash,
		phone: args.input.phone,
		fkBrand: args.input.fkBrand,
		paymentDue: args.input.paymentDue
	})) as any;

	return created;
};
