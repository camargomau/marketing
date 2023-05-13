import { iContext } from "index";

export const updateBrand = async (
	parent: any,
	args: {
		id: number;
		input: {
			name?: string
			email?: string;
			passwordHash?: string;
			phone?: string;
			fkTier?: number;
			paymentDue?: boolean;
		};
	},
	{ db }: iContext,
	info: any
) => {
	const toUpdate = await db.sequelize.models.Brand.findByPk(args.id);

	if (!toUpdate) {
		throw new Error(`No entry with the id ${args.id} could be found`);
	} else {
		return await toUpdate.update(args.input);
	}
};
